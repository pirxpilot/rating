/**
 * Creates rating component
 * @param el {Node} - DOM node to which we will append rating
 * @param options {Object} - optional {star, value} object when
 *     `star` is the character displayed in rating and `value` is the initial rating
 */
export default function rating(el, options = {}) {
  const self = {
    set
  };

  if (typeof options === 'number') {
    options = {
      value: options
    };
  }
  options.star ??= '&#9733;';
  options.value ??= 0;

  const node = create(options.star);
  el.appendChild(node);
  if (options.value) {
    set(options.value);
  }

  return self;

  function set(r) {
    node.childNodes[1].setAttribute('style', `width:${r}%;`);
    return self;
  }
}

/**
 * creates rating HTML that looks like this:
 *		div.rating
 *			div.shadow= ★★★★★
 *			div.stars=  ★★★★★
 */
function create(star) {
  const c = star.repeat(5);
  const node = div('rating');
  node.appendChild(div('shadow', c));
  node.appendChild(div('stars', c));

  return node;
}

function div(className, content) {
  const node = document.createElement('div');
  node.className = className;
  if (content) {
    node.innerHTML = content;
  }
  return node;
}
