/* Deterministic student-facing math tokenizer. */
(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function matching(text, start, open, close) {
    var depth = 0;
    for (var i = start; i < text.length; i += 1) {
      if (text[i] === open) depth += 1;
      if (text[i] === close && --depth === 0) return i;
    }
    return -1;
  }

  function grouped(text, index) {
    if (text[index] !== '{') return null;
    var end = matching(text, index, '{', '}');
    return end < 0 ? null : { value: text.slice(index + 1, end), next: end + 1 };
  }

  function atom(text, index) {
    if (index >= text.length) return null;
    if (text[index] === '{') return grouped(text, index);
    if (text[index] === '(') {
      var parenthesisEnd = matching(text, index, '(', ')');
      return parenthesisEnd < 0 ? null : { value: text.slice(index + 1, parenthesisEnd), next: parenthesisEnd + 1 };
    }
    if (/[0-9]/.test(text[index])) {
      var end = index + 1;
      while (end < text.length && /[0-9]/.test(text[end])) end += 1;
      return { value: text.slice(index, end), next: end };
    }
    return /[A-Za-z]/.test(text[index]) ? { value: text[index], next: index + 1 } : null;
  }

  function existingTag(text, index) {
    var open = text.slice(index).match(/^<(sub|sup)>/);
    if (!open) return null;
    var tag = open[1];
    var contentStart = index + open[0].length;
    var closeText = '</' + tag + '>';
    var close = text.indexOf(closeText, contentStart);
    return close < 0 ? null : {
      html: '<' + tag + '>' + format(text.slice(contentStart, close)) + closeText,
      next: close + closeText.length
    };
  }

  function frac(text, index) {
    var command = text.slice(index).match(/^\\frac/);
    if (!command) return null;
    var numerator = grouped(text, index + command[0].length);
    if (!numerator) return null;
    var denominator = grouped(text, numerator.next);
    return denominator ? { numerator: numerator.value, denominator: denominator.value, next: denominator.next } : null;
  }

  function root(text, index) {
    var command = text.slice(index).match(/^\\sqrt/);
    if (command) {
      var groupedRoot = grouped(text, index + command[0].length);
      return groupedRoot ? { value: groupedRoot.value, next: groupedRoot.next } : null;
    }
    if (text.slice(index, index + 5) !== 'sqrt(') return null;
    var end = matching(text, index + 4, '(', ')');
    return end < 0 ? null : { value: text.slice(index + 5, end), next: end + 1 };
  }

  function format(value) {
    var text = String(value == null ? '' : value);
    var output = '';
    for (var i = 0; i < text.length;) {
      var preserved = existingTag(text, i);
      if (preserved) { output += preserved.html; i = preserved.next; continue; }

      var fraction = frac(text, i);
      if (fraction) {
        output += '<span class="math-frac"><span>' + format(fraction.numerator) + '</span><span>' + format(fraction.denominator) + '</span></span>';
        i = fraction.next;
        continue;
      }
      var squareRoot = root(text, i);
      if (squareRoot) {
        output += '<span class="math-root">' + format(squareRoot.value) + '</span>';
        i = squareRoot.next;
        continue;
      }

      if (text[i] === '_' || text[i] === '^') {
        var token = atom(text, i + 1);
        if (token) {
          output += text[i] === '_' ? '<sub>' + format(token.value) + '</sub>' : '<sup>' + format(token.value) + '</sup>';
          i = token.next;
          continue;
        }
      }
      output += escapeHtml(text[i]);
      i += 1;
    }
    return output;
  }

  window.renderMathText = format;
})();
