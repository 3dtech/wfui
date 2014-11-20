/** Tabs class is used to keep track hidden and shown tab elements. */
var Tabs = Menu.extend({
	/** Initializes tabs class */
	init: function(element) {
		this._super(element);
		this.tabs=[];
		this.activeTab=false;
	},
	
	/** Adds a new tab to tabs list. Calls onAdd method of added tab */
	add: function(name, tab, button) {
		this.tabs[name] = new Tab(name, tab, button);
		
		if(button)
			this._super(button);
			
		return this.tabs[name];
	},
	
	/** Removes given tab, if it exists in tabs list and calls onRemove method of removed tab. */
	removeTab: function(tab) {
		for(var i in this.tabs) {
			if(this.tabs[i]==tab) {
				this.tabs.splice(i, 1);
				this.tabs[i].remove(this);
				return;
			}
		}
	},
	
	getTab: function(name){
		return this.tabs[name];
	},
	
	/** Sets tab as active. Calls onDeactivate method on previous tab that was active and onActivate method
		of newly activated tab. A tab can't be activated more than once in a row. */
	activate: function(tab) {
		if(tab instanceof UIComponent){
			for(var i in this.tabs){
				if(this.tabs[i] == tab){
					this.activateTab(i);
				}
			}
		}
	},
	
	activateTab: function(name){
		var tab = this.getTab(name);
		if(tab){
			if(this.activeTab && this.activeTab !== tab){
				this.activeTab.hide(this);
				this.activeTab.deactivate();
			}
			
			this.activeTab=tab;
			this.activeTab.show(this);
			this.activeTab.activate();
			this.onActivate(this.activeTab, name);
		}
	},
	
	restoreTab: function(name){
		var tab = this.getTab(name);
		if(tab){
			if(this.activeTab && this.activeTab !== tab){
				this.activeTab.hide(this);
				this.activeTab.deactivate();
			}
			
			this.activeTab=tab;
			this.activeTab.show(this);
			this.activeTab.activate();
		}
	},
	
	resize: function(){
		this._super();
		for(var i in this.tabs) {
			this.tabs[i].resize();
		}
	},
	
	update: function(){
		for(var i in this.tabs) {
			this.tabs[i].update();
		}
	}
});
