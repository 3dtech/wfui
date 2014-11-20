/** UIComponent class is used as a baseclass for any User Interface (UI) component.
	@param element JQuery element that is used as a slide of this tab */

var UIComponent = Class.extend({
	init: function(element) {
		this.element=element;
		this.parent=null;
	},

	/** Hide component */
	hide: function(time) {
		if(time){
			this.element.hide(time);
		}
		else {
			this.element.hide();
		}

		this.onHide();
	},

	/** Called when Component is hidden */
	onHide: function(){},

	/** Show component */
	show: function(time) {
		if(time){
			this.element.show(time);
		}
		else {
			this.element.show();
		}

		this.onShow();
	},

	/** Called when Component is showed */
	onShow: function() {},

	/** Resized Component */
	resize: function() {},

	/** Activates element */
	activate: function() {
		this.element.addClass('active');
		this.onActivate(this);
	},

	/** Called when Component is activated*/
	onActivate: function(component){},

	/** Deactivate Component */
	deactivate: function() {
		this.element.removeClass('active');
		this.onDeactivate();
	},

	/** Called when Component is deactivated */
	onDeactivate: function(){},

	/** Called when component is removed. By default clears children of element assigned to this component and destroys its DOM element. */
	remove: function() {
		this.hide();
		this.element.empty();
		this.element.remove();
	},

	update: function(){},

	addClass: function(name){
		this.element.addClass(name);
	},

	addAttribute: function(key, value){
		this.element.attr(key, value);
	}
});
