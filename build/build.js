var rating = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // index.js
  var index_exports = {};
  __export(index_exports, {
    default: () => rating
  });
  function rating(el, options = {}) {
    const self = {
      set
    };
    if (typeof options === "number") {
      options = {
        value: options
      };
    }
    options.star ??= "&#9733;";
    options.value ??= 0;
    const node = create(options.star);
    el.appendChild(node);
    if (options.value) {
      set(options.value);
    }
    return self;
    function set(r) {
      node.childNodes[1].setAttribute("style", `width:${r}%;`);
      return self;
    }
  }
  function create(star) {
    const c = star.repeat(5);
    const node = div("rating");
    node.appendChild(div("shadow", c));
    node.appendChild(div("stars", c));
    return node;
  }
  function div(className, content) {
    const node = document.createElement("div");
    node.className = className;
    if (content) {
      node.innerHTML = content;
    }
    return node;
  }
  return __toCommonJS(index_exports);
})();
