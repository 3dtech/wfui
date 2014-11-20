/** 
  Override MenuItem to provide different items for Menu. By default MenuItem is <div>{label}</div> and
  calls a callback method with assinged data.
*/
var StaticMenuItem = MenuItem.extend({
	init: function(element, label) {
		this._super(label);
		this.element = element;
		this.createElement();
	},
	
	createElement: function(){
		this.element.bind("touchmove", function(event) { event.preventDefault(); });
	},
	
	update: function(){
	
	}
});