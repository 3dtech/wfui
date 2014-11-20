/** Creates a menu under parent element given as JQuery element

	@param element JQuery element
	@param language Current language (needed only, if menuitem labels are of Translations type) */
var Menu = UIComponent.extend({
	init: function(element) {
		this.element=element;
		this.element.addClass("no-select");
		this.items=[];
		this.cache = [];
		this.active=false;				///< Currently active item, if any
	},

	/** Adds new menu item */
	add: function(item) {
		this.items.push(item);
		item.onAdd(this);
		this.addItemElement(item);
		this.addCallback(item);
		return item;
	},

	/** Prepend new menu item */
	prepend: function(item) {
		this.items.push(item);
		item.onAdd(this);
		this.prependItemElement(item);
		this.addCallback(item);
		return item;
	},

	/** Appends an element of item to the element of menu */
	addItemElement: function(item) {
		this.cache.push(item.element);
	},

	prependItemElement: function(item) {
		this.cache.unshift(item.element);
	},

	publish: function(){
		this.element.empty().append(this.cache);
		this.cache = [];
	},

	addCallback: function(item){
		var me=this;
		if(item.element && item.element.hammer){
				item.element.hammer().on("tap", function(event) {
				event.gesture.stopPropagation();
				event.gesture.preventDefault();
				me.activateItem(item);
				//Trigger custom callback or the default click function
				if(item.callback && typeof item.callback === "function"){
					item.callback(item);
				}

				me.onItemClick(item, event);

				item.onClick();
			});

			item.element.hammer().on("touchstart", function(){
				item.element.addClass("tapped");
			});

			item.element.hammer().on("touchend", function(){
				item.element.removeClass("tapped");
			});
		}
	},

	/** Activates given menuitem (make sure that it is a menuitem belonging to this menu, not some random dude) */
	activateItem: function(item) {
		this.deactivateAll(item);
		this.active=item;
		if(this.active) {
			this.active.activate(this);
		}
	},

	/** Deactivates item, if there is an active item */
	deactivateAll: function(item) {
		if(this.active && this.active !== item){
			this.active.deactivate(this);
			this.active = false;
		}
	},

	activateItemWithObject: function(obj){
		for(var i in this.items){
			if(this.items[i].dataObject == obj){
				this.activateItem(this.items[i]);
				return;
			}
		}
	},

	triggerItemWithObject: function(obj){
		for(var i in this.items){
			if(this.items[i].dataObject == obj){
				this.activateItem(this.items[i]);
				this.onItemClick(this.items[i]);
				return;
			}
		}
	},

	/*
		triggered when item is clicked
	*/
	onItemClick: function(item){},

	/** Clears menu */
	clear: function() {
		this.active = false;

		for(var item in this.items) {
			this.items[item].remove(this);
		}
		this.items.length=0;
		this.element.empty();
	},

	/** Called when new language is set */
	onSetLanguage: function(language) {
		this.resize();
	},

	/** Called when menu must be sorted */
	sort: function(language) {
		this.items.sort(function(a, b) {
				if(a.less(b, language)) return -1;
				if(b.less(a, language)) return 1;
				return 0;
			});

		// Clear the child elements of this jQuery menu element
		this.element.empty();

		// Add child elements again
		for(var i in this.items) {
			this.addItemElement(this.items[i]);
			this.addCallback(this.items[i]);
		}
	}
});
