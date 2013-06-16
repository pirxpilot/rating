var html = require('./template');
var domify = require('domify');

module.exports = rating;

function rating(el, r) {
	var self = {},
		node = domify(html);

	el.appendChild(node);
	if (typeof r === 'number') {
		set(r);
	}

	function set(r) {
		var style = 'width:' + r + '%;';
		node.querySelector('.stars').setAttribute('style', style);
		return self;
	}

	self.set = set;

	return self;
}