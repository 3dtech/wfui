var UserMessage = Class.extend({
	/** 
		Message displayes messages for users 
		@param key responds to guiTranslations
		@param type message, warning, error from CSS
		@param wayfinder is Wayfinder.js
		@param callback is called when users clicks on message OPTIONAL
	*/
	init: function(key, type, wayfinder, callback) {
		this.wayfinder = wayfinder;
		this.type = type;
		this.key = key;
		this.callback = callback;
		this.timeout = 15000;
		this.draw();
	},
	
	draw: function(){
		this.element = $wfuij("<div class='message "+this.type+"'></div>");
		var cur_lang = this.wayfinder.translator.getLanguage();
		//lets add a translation if possible
		this.wayfinder.translator.translateElement(this.element, this.key);
			
		this.element.hammer().on("tap", ClassCallback(this, this.onClick));
		setTimeout(ClassCallback(this, this.close), this.timeout);
		this.wayfinder.options.messages.append(this.element);
	},
	
	close: function(){
		var element = this.element;
		if(element){
			this.element.hide(200, function(){
				element.remove();
			});
			delete this.element;
		}
	},
	
	onClick: function(){
		this.close();
		if(this.callback && typeof this.callback){
			this.callback(this);
		}
	}
});
