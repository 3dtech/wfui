/** 
  TextInputItem is primarely used for search input but can also used for other text input.
*/
var TextInputItem = MenuItem.extend({
	init: function(label, valueChangeCallback) {
		this.input = false;
		this.valueChangeCallback = valueChangeCallback;
		this.lastKeyPress = -1;
		this.isDefaultValue = true;
		this.timeout = null; // Timer for key press
		this.wait = 500;
		this._super(label);
		this.setValue(label);
	},
	
	createElement: function(){
		this.element=$wfuij("<div class='item searchitem'></div>");
		this.input=$wfuij("<input type='text' data-label='"+this.label+"'/>");
		this.element.append(this.input);
	},
	
	onAdd: function(menu){
		this.input.keyup(ClassCallback(this, this.onChange));
		//this.input.change(ClassCallback(this, this.onChange));
		//this.input.blur(ClassCallback(this, this.onDeactivate));
	},
	
	onClick: function(){
		if(this.input.val() == this.input.attr("data-label")){
			this.input.val("");
		}
			
		this.lastKeyPress = -1;
	},
	
	getValue: function(){
		return this.input.val();
	},
	
	setValue: function(value){
		this.input.val(value);
	},
	
	checkLastKeyPress: function(){
		var time = (new Date()).getTime();
		this.isDefaultValue = false;
		if(this.lastKeyPress && this.lastKeyPress - time > -this.wait){
			clearTimeout(this.timeout);
			this.timeout = setTimeout(ClassCallback(this, this.checkLastKeyPress), this.wait);
		}
		else if(this.lastKeyPress > 0) {
			this.lastKeyPress = -1;
			clearTimeout(this.timeout);
			this.callValueChange();
		}
	},
	
	onChange: function(){
		var time = (new Date()).getTime();
		//Start checking if last key press was too long ago
		clearTimeout(this.timeout);
		this.timeout = setTimeout(ClassCallback(this, this.checkLastKeyPress), this.wait);
		
		this.lastKeyPress = time;
	},
	
	callValueChange: function(){
		if(this.valueChangeCallback && typeof this.valueChangeCallback === "function" && this.getValue() != this.input.attr("data-label")){
			this.valueChangeCallback(this.getValue());
		}
	},
	
	onDeactivate: function(){
		if(this.input.val() === ""){
			this.reset();
		}
	},

	update: function(){
		if(this.input.val() === ""){
			this.input.val(this.input.attr("data-label"));
		}
	},

	reset: function(){
		this.input.val(this.input.attr("data-label"));
		this.isDefaultValue = true;
		this.input.blur();
	}
});
