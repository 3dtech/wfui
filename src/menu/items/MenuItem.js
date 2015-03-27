/**
  Override MenuItem to provide different items for Menu. By default MenuItem is <div>{label}</div> and
  calls a callback method with assinged data.
*/
var MenuItem = UIComponent.extend({
	init: function(label) {
		this._super(false);
		this.label=label;
		this.callback = false;
		this.dataObject = false;
		this.createElement();
	},

	//Set custom callback for this item
	setCallback: function(callback){
		if(callback && typeof callback === "function"){
			this.callback = callback;
		}
	},

	getCallback: function(){
		return this.callback;
	},

	getDataObject: function(){
		return this.dataObject;
	},

	//Set a Object that is passed on to callbacks eg POI
	setDataObject: function(dataObject){
		this.dataObject = dataObject;
	},

	createElement: function(){
		var e = document.createElement('div');
		e.className = 'item';
		e.innerHTML = this.label;
		this.element=$(e);
		this.element.on("touchmove", function(event) { event.preventDefault(); });
		this.element.on('selectstart', false);
	},

	/** Gets label of this menuitem */
	getLabel: function() {
		return this.label;
	},

	/** Called when component was clicked, but not when it has been activated through this.activate(item) */
	onClick: function(item) {
	},

	/** Called by Menu when item is added to menu
		@param menu Instance of Menu */
	onAdd: function(menu) {	},

	/** Default less function compares labels */
	less: function(menuItem) {
		return this.element.text()<menuItem.element.text();
	}
});
