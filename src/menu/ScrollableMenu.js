/** Creates menu where items are scrollable
	@param element JQuery element
	@param language Currently used language */
var ScrollableMenu=Menu.extend({
	init: function(element) {
		this.viewElement = element;
		this.viewElement.addClass("scrollable-view");
		this.scrollbar = false;

		this.contentElement=this.viewElement.find(".scrollable-content");
		if(!this.contentElement[0]){
			this.contentElement=$("<div class='scrollable-content'></div>");
			this.viewElement.append(this.contentElement);
		}
		this._super(this.contentElement);
		// Attach scrolling capability to parent element
		this.dragScroll=new DragScroll(this.viewElement, this.contentElement);
	},

	addScrollbar: function(){
		this.scrollbar = new Scrollbar(this.viewElement, "right");
		this.scrollbar.setup(parseInt(this.viewElement.height()), parseInt(this.contentElement.height()));
		this.viewElement.addClass("hasScrollbar");
		this.dragScroll.setUpdateCallback(ClassCallback(this, this.updateScrollbar));
		this.scrollbar.onScroll = ClassCallback(this, this.updateScrollContainer);
	},

	updateScrollbar: function(dragScroll){
		this.scrollbar.setContentPosition(dragScroll.view.getContentPosition());
	},

	updateScrollContainer: function(percentage){
		this.dragScroll.setScroll(vec2.scale(vec2.create(), this.dragScroll.view.viewSize, percentage));
	},

	show: function() {
		this.viewElement.show();
		this.onShow();
	},

	hide: function() {
		this.viewElement.hide();
		this.onHide();
	},

	resize: function() {
		this.dragScroll.resize();
		if(this.scrollbar){
			this.scrollbar.setup(parseInt(this.viewElement.height()), parseInt(this.contentElement.height()));
			this.scrollbar.resize();
			if(parseInt(this.viewElement.height()) < parseInt(this.contentElement.height())){
				this.viewElement.addClass("hasScrollbar");
				this.scrollbar.show();
			}
			else {
				this.viewElement.removeClass("hasScrollbar");
				this.scrollbar.hide();
			}
		}
	},

	reset: function() {
		this.dragScroll.resize();
		this.dragScroll.reset();
	},

	activate: function(){
		this._super();
		this.resize();
	},

	update: function(){
		this.resize();
	},

	publish: function(){
		this._super();
		//this.contentElement.append("<div class='clear'></div>");
		this.reset();
	}
});
