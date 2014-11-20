/**
  Override MenuItem to provide different items for Menu. By default MenuItem is <div>{label}</div> and
  calls a callback method.
*/
var MultiValueMenuItem = MenuItem.extend({
	init: function() {
		this.values=[];
		this.elements = [];
		for(var i in arguments){
			if(typeof arguments[i] === "string"){
				this.values.push(arguments[i]);
			}
		}

		var defaultValue = "";
		if(this.values[0])
			defaultValue = this.values[0];

		this._super(defaultValue);
	},

	createElement: function(){
		var me = document.createElement('div');
		me.className = 'item multivalueitem';
		this.element = $(me);
		var e = null;

		for(var i in this.values){
			e = document.createElement('div');
			e.className = 'val-'+i;
			e.innerHTML = this.values[i];
			this.element.append($(e));
			this.elements.push(e);
		}

		//this.element.append(this.elements);
		this.element.bind("touchmove", function(event) { event.preventDefault(); });
	},

	getElement: function(index){
		return this.nameElement;
	}
});
