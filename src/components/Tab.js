/** Tab class is used to hold tab information such as the button and content element. */
var Tab = Class.extend({
	/** Initializes tabs class */
	init: function(name, panel, button) {
		this.name = name;
		//set the element if it is a UIComponent
		if(panel && panel instanceof UIComponent){
			this.panel = panel;
		}
			
		if(button && button instanceof UIComponent)
			this.button = button;
			
	},
	
	update: function(){
		this.panel.update();
		if(this.button)
			this.button.update();
	},
	
	getPanel: function(){
		return this.panel;
	},
	
	getButton: function(){
		return this.button;
	},
	
	/** Removes given tab, if it exists in tabs list and calls onRemove method of removed tab. */
	remove: function() {
		
	},
	
	show: function(){
		this.panel.show();
		if(this.button){
			this.button.activate();
		}
	},
	
	hide: function(){
		this.panel.hide();
		if(this.button){
			this.button.deactivate();
		}
	},
	
	/** Sets tab as active. */
	activate: function() {
		if(this.panel){
			this.panel.activate();
		}
		
		if(this.button){
			this.button.activate();
		}
	},
	
	/** Deactivate tab */
	deactivate: function() {
		if(this.panel){
			this.panel.deactivate();
		}
		
		if(this.button){
			this.button.deactivate();
		}
	},
	
	restore: function(){
		if(this.panel){			
			this.panel.show(this);
		}
	},
	
	resize: function(){
		if(this.panel){
			this.panel.resize();
		}
		
		if(this.button){
			this.button.resize();
		}
	}
});
