/**
  Override MenuItem to provide different items for Menu. By default MenuItem is <div>{label}</div> and
  calls a callback method.
*/
var ValueMenuItem = MenuItem.extend({
	init: function(label, value) {
		this.value=value;
		this.valueElement = null;
		this.nameElement = null;
		this._super(label);
	},

	createElement: function(){
		var e = document.createElement('div');
		e.className = 'item '+this.label;
		this.element=$(e);

		var ne = document.createElement('div');
		ne.setAttribute("name", 'name');
		ne.innerHTML = this.label;

		this.nameElement = $(ne);

		var ve = document.createElement('div');
		ve.setAttribute("name", 'value');
		ve.innerHTML = this.value;

		this.valueElement = $(ve);

		this.element.append([this.nameElement, this.valueElement]);
		this.element.bind("touchmove", function(event) { event.preventDefault(); });
	},

	getNameElement: function(){
		return this.nameElement;
	},

	getValueElement: function(){
		return this.valueElement;
	}
});
