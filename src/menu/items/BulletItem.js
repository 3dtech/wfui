/**
  Override MenuItem to provide different items for Menu. By default MenuItem is <div>{label}</div> and
  calls a callback method with assinged data.
*/
var BulletItem = MenuItem.extend({
	init: function(label) {
		this._super(label);
	},

	createElement: function(){
		this.element=$wfuij("<div class='item bullet "+this.label+"'>"+this.label+"</div>");
		this.bullet = $wfuij("<div class='bullet'></div>");
		this.element.prepend(this.bullet);
		this.element.bind("touchmove", function(event) { event.preventDefault(); });
	},

	setBulletColor: function(color){
		if(this.bullet){
			this.bullet.css("background-color", color.toString());
		}
	},
});
