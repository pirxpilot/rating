
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("rating/index.js", Function("exports, require, module",
"module.exports = rating;\n\
\n\
\n\
function content(star) {\n\
\tvar i, c = [];\n\
\tfor(i = 0; i < 5; i++) {\n\
\t\tc[i] = star;\n\
\t}\n\
\treturn c.join('');\n\
}\n\
\n\
function div(className, content) {\n\
\tvar node = document.createElement('div');\n\
\tnode.className = className;\n\
\tif (content) {\n\
\t\tnode.innerHTML = content;\n\
\t}\n\
\treturn node;\n\
}\n\
\n\
/**\n\
 * creates rating HTML that looks like this:\n\
 *\t\tdiv.rating\n\
 *\t\t\tdiv.shadow= ★★★★★\n\
 *\t\t\tdiv.stars=  ★★★★★\n\
 */\n\
function create(star) {\n\
\tvar c, node;\n\
\n\
\tc = content(star);\n\
\tnode = div('rating');\n\
\tnode.appendChild(div('shadow', c));\n\
\tnode.appendChild(div('stars', c ));\n\
\n\
\treturn node;\n\
}\n\
\n\
/**\n\
 * Creates rating component\n\
 * @param el {Node} - DOM node to which we will append rating\n\
 * @param options {Object} - optional {star, value} object when\n\
 *     `star` is the character displayed in rating and `value` is the initial rating\n\
 */\n\
function rating(el, options) {\n\
\tvar self = {}, node;\n\
\n\
\tif (typeof options === 'number') {\n\
\t\toptions = {\n\
\t\t\tvalue: options\n\
\t\t};\n\
\t} else {\n\
\t\toptions = options || {};\n\
\t}\n\
\toptions.star = options.star || '&#9733;';\n\
\toptions.value = options.value || 0;\n\
\n\
\tnode = create(options.star);\n\
\tel.appendChild(node);\n\
\tif (options.value) {\n\
\t\tset(options.value);\n\
\t}\n\
\n\
\tfunction set(r) {\n\
\t\tvar style = 'width:' + r + '%;';\n\
\t\tnode.childNodes[1].setAttribute('style', style);\n\
\t\treturn self;\n\
\t}\n\
\n\
\tself.set = set;\n\
\n\
\treturn self;\n\
}//@ sourceURL=rating/index.js"
));