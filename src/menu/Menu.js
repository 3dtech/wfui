/** Creates a menu under parent element given as JQuery element

	@param element JQuery element
	@param language Current language (needed only, if menuitem labels are of Translations type) */
var Menu = UIComponent.extend({
	init: function(element) {
		this._super(element);

		if(this.element){
			this.element.addClass("no-select");
		}
		else {
			console.error("Menu: No element given!");
		}

		this.items = [];
		this.cache = [];
		this._active = false; ///< Currently active item, if any
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
		var hammertime = new Hammer(item.element[0], {domEvents: true});

		if(item.element && hammertime){
			hammertime.on("tap", function(event) {
				if(event.target == item.element[0] || event.target.parentNode == item.element[0]){
					event.preventDefault();

					function activate(){
						if(item.callback && typeof item.callback === "function"){
							item.callback(item);
						}

						me.onItemClick(item, event);

						me.activateItem(item);
						item.onClick();
					}

					if(item !== me._active){
						activate();
					}
					else {
						//the item is already active wait until we can paint again.
						cancelAnimationFrame(this.activateFrame);
						this.activateFrame = requestAnimFrame(activate);
					}
				}
			});

			hammertime.on("touchstart", function(){
				item.element.addClass("tapped");
			});

			hammertime.on("touchend", function(){
				item.element.removeClass("tapped");
			});
		}
	},

	/** Activates given menuitem (make sure that it is a menuitem belonging to this menu, not some random dude) */
	activateItem: function(item) {
		this.deactivateAll(item);
		this._active=item;
		if(this._active) {
			this._active.activate(this);
		}
	},

	/** Deactivates item, if there is an active item */
	deactivateAll: function(item) {
		if(this._active && this._active !== item){
			this._active.deactivate(this);
			this._active = false;
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
		this._active = false;

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
