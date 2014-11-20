/** 
  Override MenuItem to provide different items for Menu. By default MenuItem is <div>{label}</div> and
  calls a callback method.
*/
var ImageMenuItem = MenuItem.extend({
	init: function(label) {
		this.imageId = false;
		this.iconElement = false;
		this.textElement = false;
		this._super(label);
	},
	
	getInnerElement: function(){
		return this.innerElement;
	},
	
	loadImage: function(imageId){
		this.imageId = imageId;
		if(this.imageId > 0){
			Logistics.getImage(WayfinderAPI.getURL("images", "thumbnail", [this.imageId]), ClassCallback(this, function(data){
				this.iconElement.css("background-image", "url('"+data.src+"')");
				this.element.addClass("hasIcon");
			}));
		}
	},
	
	createElement: function(){
		this.element = $("<div class='item'></div>");
		this.iconElement = $("<div class='icon'></div>");
		this.textElement = $("<div class='label'>"+this.label+"</div>");
		this.element.append(this.iconElement);
		this.element.append(this.textElement);
		this.element.bind("touchmove", function(event) { event.preventDefault(); });
	},
});