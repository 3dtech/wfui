var Button = UIComponent.extend({
	init: function(element, title, callback) {
		this._super(element);
		this.title = title;
		this.callback = callback;
		this.setTitle(title);
		this.element.hammer().on("tap", ClassCallback(this, this.onClick));
	},

	setTitle: function(title){
		this.title = title;
		this.element.text(title);
	},

	onClick: function(event){
		if(this.callback && typeof this.callback === "function"){
			event.gesture.stopPropagation();
			this.callback(event);
		}
	}
});