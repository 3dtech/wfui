/**
  A menu item with a integrated submenu
*/
var SubMenuItem = MenuItem.extend({
	init: function(label, menu) {
		this.menu = menu;
		this.menuElement = false;
		this.nameElement = false;
		this._super(label);
	},

	addMenu: function(menu){
		this.menu = menu;
		if(this.menu){
			this.menu.hide();
		}
	},

	createElement: function(){
		var e = document.createElement('div');
		e.className = 'submenuitem item';
		this.element=$(e);

		var ne = document.createElement('div');
		ne.className = "label";
		ne.innerHTML = this.label;

		this.nameElement = $(ne);

		var me = document.createElement('div');
		me.className = "submenu menu";

		this.menuElement = $(me);

		this.element.append([this.nameElement, this.menuElement]);
		this.element.bind("touchmove", function(event) { event.preventDefault(); });
	},

	onActivate: function(){
		console.log("onActivate", this.label, this.menu.isActive(), this.menu);
		if(this.menu && !this.menu.isActive()){
			this.menu.show();
			this.menu.activate();
		}
		else {
			this.menu.hide();
			this.menu.deactivate();
		}
	},

	onDeactivate: function(){
		if(this.menu){
			this.menu.hide();
			this.menu.deactivate();
		}
	}
});