/**
 * Scrollbar component
 */
var Scrollbar = UIComponent.extend({
	/** Constructor
		@param parentElement JQuery element that will hold the scrollbar
		@param position basically a class name which defines how to position the scrollbar eg left, right, top, bottom
		@param horizontal a boolean which defines if the scrollbar should be vertical or horizontal
	 */
	init: function(parentElement, position, horizontal) {
		this.vertical = typeof horizontal !== 'undefined' ? !horizontal : true;
		this.position = 0;
		this.containerSize = 1;
		this.contentSize = 1;

		this.onScroll = false;

		//Create the actual scrollbar
		this.parentElement = parentElement;
		this.element=$("<div class='scrollbar "+position+"'></div>");
		this.bar = $("<div class='bar'></div>");
		this.element.append(this.bar);
		parentElement.append(this.element);

		this.transformsSupported = this.isTransformSupported();

		this._super(this.element);

		this.element.on('selectstart', false);
		this.element.addClass("no-select");

		this.mouseDelta=vec2.create();

		var hammer = new Hammer(this.element[0]);
		hammer.on("drag", ClassCallback(this, this.onDrag));
		hammer.on("dragend", ClassCallback(this, this.onEndDrag));
		hammer.on("dragstart", ClassCallback(this, this.onStartDrag));
		//this.element.hammer().on("tap", ClassCallback(this, this.onTap));

		this.view = new View(vec2.fromValues(this.bar.width(), this.bar.height()),
 											 vec2.fromValues(this.element.innerWidth(), this.element.innerHeight()));
	},

	/**
	*	Setup the scrollbar. Calculates bars length.
	*	@param containerSize the length (height or width) of the element wher the content is displayed
	*/
	setup: function(containerSize, contentSize){
		this.contentSize = contentSize;
		this.containerSize = containerSize;

		var ratio = this.containerSize/this.contentSize;
		if(this.vertical){
			this.element.height(containerSize);
			this.bar.height(Math.max(5, Math.floor(containerSize*ratio)));
		}
		else {
			this.element.width(containerSize);
			this.bar.width(Math.max(5, Math.floor(containerSize*ratio)));
		}

		this.resize();
	},

	/**
	*	Clear the bars position
	*/
	clear: function(){
		this.position = 0;
		this.setPosition(0);
	},

	getBarLength: function(){
		if(this.vertical)
			return parseInt(this.bar.height());
		else
			return parseInt(this.bar.width());
	},

	getViewLength: function(){
		if(this.vertical)
			return this.view.getViewSize()[1];
		else
			return this.view.getViewSize()[0];
	},

	getContentLength: function(){
		if(this.vertical)
			return this.view.getContentSize()[1];
		else
			return this.view.getContentSize()[0];
	},

	setPosition: function(newPos){
		if(this.transformsSupported){//this will be rendered on GPU, faster
			this.bar.css(this.transformsSupported+"transform", "translate("+newPos[0]+"px,"+newPos[1]+"px)");
		}
		else
			this.bar.css("left", newPos[0]+"px").css("top", newPos[1]+"px");
	},

	/**
	*	Set the bar position depending of the given content position
	*	@param contentPosition the top/left position of the inner content.
	*/
	setContentPosition: function(contentPosition){
		var newPos = vec2.create();
		var ratio = this.containerSize/this.contentSize;
		vec2.scale(newPos, contentPosition, ratio);
		this.view.setViewPosition(newPos);
		this.setPosition(this.view.getContentPosition());
	},

	onStartDrag: function(event){
		if(event && event.gesture){
			event.gesture.preventDefault();
			event.gesture.stopPropagation();
		}
	},

	onDrag: function(event) {
		if(!(event && event.gesture)){
			return;
		}

		event.preventDefault();
		var v = vec2.fromValues(event.gesture.deltaX, event.gesture.deltaY);
		this.view.move(vec2.negate(vec2.create(), vec2.sub(vec2.create(), this.mouseDelta, v)));
		this.mouseDelta = v;
		this.setPosition(this.view.getContentPosition());
		if(this.onScroll && typeof this.onScroll === "function"){
			this.onScroll(this.getPercentage());
		}
	},

	onTap: function(event){
		if(!(event && event.gesture)){
			return;
		}

		event.preventDefault();

		var v = vec2.fromValues(event.gesture.deltaX, event.gesture.deltaY);
	},

	getPercentage: function(){
		var distFrom = vec2.len(this.view.getViewPosition());

		return distFrom/this.getViewLength();
	},

	onEndDrag: function(event) {
		this.mouseDelta = vec2.create();
	},

	resize: function(){
		this.view.setViewSize(parseInt(this.element.width()), parseInt(this.element.height()));
		this.view.setContentSize(parseInt(this.bar.width()), parseInt(this.bar.height()));
		if(this.getViewLength() <= this.getContentLength() || this.getViewLength() == 0){
			this.hide();
		}
		else {
			this.show();
		}
	},

	isTransformSupported: function() {
		var styles = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
		var prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-'];
		for(var i = 0; i < styles.length; i++) {
			if(document.createElement('div').style[styles[i]] !== undefined) {
				return prefixes[i];
			}
		}
		return false;
	}

});
