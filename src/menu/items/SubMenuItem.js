/**
  A menu item with a integrated submenu
*/
var SubMenuItem = MenuItem.extend({
	init: function(label, menu) {
		this._super(label);
		this.menu = menu;
		this.menuElement = false;
		this.nameElement = false;
	},

	addMenu: function(menu){
		this.menu = menu;
	},

	createElement: function(){
		var e = document.createElement('div');
		e.className = 'item submenuitem '+this.label;
		this.element=$(e);

		var ne = document.createElement('div');
		ne.className = "label";
		ne.innerHTML = this.label;

		this.nameElement = $(ne);

		var me = document.createElement('div');
		me.className = "menu submenu";

		this.menuElement = $(me);

		this.element.append([this.nameElement, this.menuElement]);
		this.element.bind("touchmove", function(event) { event.preventDefault(); });
	}
});