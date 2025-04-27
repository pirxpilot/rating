module.exports = rating;

function content(star) {
  let i;
  const c = [];
  for (i = 0; i < 5; i++) {
    c[i] = star;
  }
  return c.join('');
}

function div(className, content) {
  const node = document.createElement('div');
  node.className = className;
  if (content) {
    node.innerHTML = content;
  }
  return node;
}

/**
 * creates rating HTML that looks like this:
 *		div.rating
 *			div.shadow= ★★★★★
 *			div.stars=  ★★★★★
 */
function create(star) {
  const c = content(star);
  const node = div('rating');
  node.appendChild(div('shadow', c));
  node.appendChild(div('stars', c));

  return node;
}

/**
 * Creates rating component
 * @param el {Node} - DOM node to which we will append rating
 * @param options {Object} - optional {star, value} object when
 *     `star` is the character displayed in rating and `value` is the initial rating
 */
function rating(el, options) {
  const self = {};

  if (typeof options === 'number') {
    options = {
      value: options
    };
  } else {
    options = options || {};
  }
  options.star = options.star || '&#9733;';
  options.value = options.value || 0;

  const node = create(options.star);
  el.appendChild(node);
  if (options.value) {
    set(options.value);
  }

  function set(r) {
    const style = 'width:' + r + '%;';
    node.childNodes[1].setAttribute('style', style);
    return self;
  }

  self.set = set;

  return self;
}
