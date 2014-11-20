/** 
  Override MenuItem to provide different items for Menu. By default MenuItem is <div>{label}</div> and
  calls a callback method.
*/
var DealsMenuItem = MenuItem.extend({
	init: function(ad, ui) {
		this.ui = ui;
		this.ad = ad;
		this.wayfinder = ui.wayfinder;
		this._super(ad.id);
		this.setup(ad);
	},
	
	createElement: function(){
		this.element=$("<div class='deal'></div>");
		this.image=$("<div class='image' name='image'></div>");
		this.slogan=$("<div class='slogan' name='slogan'></div>");
		this.poi=$("<div class='poi' name='poi'></div>");
		this.element.append(this.image).append(this.slogan).append(this.poi);
	},
	
	setup: function(ad){
		var language = this.wayfinder.getLanguage();
		var apiLocation = this.wayfinder.options.apiLocation;

		if(ad.image_id > 0)
			Logistics.getImage(apiLocation+"?class=PublicImages&method=getImage&parameters=["+ad.image_id+"]&echo_out=true", ClassCallback(this, this.setImage));
		else
			this.image.hide();
			
		this.slogan.html(ad.text1[language]);
		this.poi.html(ad.poi.getName(language));
	},
	
	setImage: function(image){
		this.image.css("background-image", "url("+image.src+")");
	}
	
});
