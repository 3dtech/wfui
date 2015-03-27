var Button = UIComponent.extend({
	init: function(element, title, callback) {
		this._super(element);
		this.title = title;
		this.callback = callback;
		this.setTitle(title);
		var hammertime = new Hammer(this.element[0]);
		if(hammertime){
			hammertime.on("tap", ClassCallback(this, this.onClick));
		}
	},

	setTitle: function(title){
		this.title = title;
		this.element.text(title);
	},

	onClick: function(event){
		if(this.callback && typeof this.callback === "function"){
			this.callback(event);
		}
	}
});