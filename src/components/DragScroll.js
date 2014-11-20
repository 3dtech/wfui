/** When given an element, will perform scrolling of child elements within bounds of view element.

	@param viewElement JQuery element that will act as container for content inside the scroll
	@param contentElement JQuery element that will act as scrollable content
	@param options - set different options - optional
*/
var DragScroll=Class.extend({
	init: function(viewElement, contentElement, options) {
		this.options = {
			"smooth": true, //set if the end of drag has a fade out animation
			"reverse": true, //set if content will scroll in reverse direction
			"swapContainers": true, // set if content is bigger than the container
			"updateInterval": 10, // in how many milliseconds will the animation update itself
			"wheelSpeed": 100 // how smooth is the mouse wheel scrolling
		};

		if(options !== undefined && options){
			this.options = this.chooseOptions(this.options, options);
		}

		this.viewElement=viewElement;
		this.contentElement=contentElement;

		this.viewElement.addClass("scrollable-view");
		this.contentElement.addClass("scrollable-content");

		this.mouseDelta=vec2.create();	// Mouse movement delta
		this.smoothDistance = null;
		this.timeout=null;
		this.updateCallback = false;
		this.transformsSupported = this.isTransformSupported();

		this.smoothCoeficent = vec2.fromValues(11, 11);

		this._vec2cache = vec2.create();
		this.positionClassNames = "";

		if(this.getOption("swapContainers")){
			this.view=new View(vec2.fromValues(this.viewElement.width(), this.viewElement.height()), vec2.fromValues(this.contentElement.width(), this.contentElement.height()));
		}
		else {
			this.view=new View(vec2.fromValues(this.contentElement.width(), this.contentElement.height()), vec2.fromValues(this.viewElement.width(), this.viewElement.height()));
		}

		var me=this;

		$(window).resize(function() { me.resize(); });

		// Attach touch events
		this.viewElement.hammer().on("dragstart", function(event) {
			if(event && event.gesture){
				event.gesture.preventDefault();
				event.gesture.stopPropagation();
			}
			me.onStartDrag();
			me.stop();
		});

		this.viewElement.hammer().on("tap", function(event) {
			event.gesture.preventDefault();
		});

		this.viewElement.hammer().on("drag", ClassCallback(this, this.onDrag));

		this.viewElement.hammer().on("dragend", ClassCallback(this, this.onEndDrag));

		this.viewElement.bind("mousewheel", function(event, delta) {
			me.scroll(vec2.fromValues(0, -me.getOption("wheelSpeed")*delta));
		});
	},

	/**
	*	Combines default options with given options
	*/
	chooseOptions: function(defaultOptions, newOptions){
		for(var i in newOptions){
			if(defaultOptions[i]){
				defaultOptions[i] = newOptions[i];
			}
		}
		return defaultOptions;
	},

	getOption: function(name){
		return this.options[name];
	},

	setOption: function(name, value){
		this.options[name] = value;
	},

	/**
	* Sets the end scrolling to smooth or not
	* Default is true;
	*/
	setSmoothScrolling: function(smooth){
		this.setOption("smooth", smooth);
	},

	/**
	* Sets the direction of the scrolling.
	* Default is false
	* True - moves the content in the same direction as the mouse is moving
	* False - moves the content in reverse direction
	*/
	setDirection: function(direction){
		this.setOption("reverse", direction);
	},

	onStartDrag: function() {

	},

	onDrag: function(event) {
		//check if the event is a touch event and the target isn't a scrollbar
		//TODO move scrollbar out of scrollable-view
		if(!(event && event.gesture && event.gesture.target.className.search("bar") == -1)){
			return;
		}

		event.gesture.preventDefault();
		event.gesture.stopPropagation();
		if(!this.scrolling){
			this.scrolling = true;

			var v = vec2.fromValues(event.gesture.deltaX, event.gesture.deltaY);

			if(this.getOption("reverse")){
				this.scroll(vec2.subtract(vec2.create(), this.mouseDelta, v));
			}
			else{
				this.scroll(vec2.subtract(vec2.create(), v, this.mouseDelta));
			}


			this.mouseDelta = v;
		}
	},

	/** Scrolls child elements immediately by given delta within bounds of the container. Does not update mouse position or mouse delta.
		@param delta Vector containing the scroll delta */
	scroll: function(delta) {
		var me = this;
		this.timeout = requestAnimFrame(function() {
			me.view.move(delta);
			delta = vec2.clone(me.view.getContentPosition());
			me.setContentOffset(delta);
			if(me.updateCallback && typeof me.updateCallback === "function"){
				me.updateCallback(me);
			}
		}, 0);
	},

	reset: function() {
		this.setScroll(vec2.create());
	},

	setScroll: function(position) {
		this.view.setViewPosition(position);
		this.setContentOffset(this.view.getContentPosition());
	},

	/** Call when resizing the view or child element */
	resize: function() {
		if(this.getOption("swapContainers")){
			this.view.setViewSize(parseInt(this.contentElement.innerWidth()), parseInt(this.contentElement.innerHeight()));
			this.view.setContentSize(parseInt(this.viewElement.width()), parseInt(this.viewElement.height()));
		}
		else {
			this.view.setViewSize(parseInt(this.viewElement.innerWidth()), parseInt(this.viewElement.innerHeight()));
			this.view.setContentSize(parseInt(this.contentElement.width()), parseInt(this.contentElement.height()));
		}
		this.scroll(0);
		this.checkIfScrollIsNeeded();
	},

	setContentOffset: function(pos) {
		var sign = 1;
		if (this.getOption("swapContainers")) {
			sign = -1;
		}

		if(this.transformsSupported){//this is rendered on GPU, faster
			this.contentElement.css(this.transformsSupported+"transform", "translate("+(pos[0]*sign)+"px,"+(pos[1]*sign)+"px)");
		}
		else
			this.contentElement.css("left", (pos[0]*sign)+"px").css("top", (pos[1]*sign)+"px");

		this.scrolling = false;
		this.checkContentPosition();
	},

	/** Stops scrolling */
	stop: function() {
		this.mouseDelta = vec2.create();
		if(this.timeout)
			cancelAnimationFrame(this.timeout);
	},

	/** Scrolls child elements immediately by given delta within bounds of the container. Does not update mouse position or mouse delta.
		@param velocity Vector containing the scroll delta */
	onEndDrag: function(event) {
		if(event !== undefined && event.type === "dragend" && event.gesture){
			event.gesture.preventDefault();

			var velocity = vec2.fromValues(event.gesture.velocityX, event.gesture.velocityY); // speed of travelled distance
			//if smooth scolling is enabled and drag speed is high enough
			if(this.getOption("smooth") && vec2.sqrLen(velocity) > 0.3){
				var dragLength = vec2.fromValues(event.gesture.deltaX, event.gesture.deltaY);	//drag distance
				var smoothDistance = vec2.create();
				vec2.multiply(smoothDistance, dragLength, velocity);
				var me=this;
				this.stop(); //Stop previous scrolling
				var i = 0;
				var smoothScrollTimer = function() {
					var distance = vec2.create();
					vec2.div(distance, smoothDistance, me.smoothCoeficent);
					if(vec2.sqrLen(distance) > 3) {
						vec2.sub(smoothDistance, smoothDistance, distance);
						requestAnimFrame(smoothScrollTimer, me.getOption("updateInterval"));
						vec2.negate(distance, distance);
						me.scroll(distance);
					}
				};
				this.timeout=requestAnimFrame(smoothScrollTimer, me.updateInterval);	// Start smooth scrolling
			}
		}
	},

	setUpdateCallback: function(_callback){
		this.updateCallback = _callback;
	},

	/**
	*	Set content position based on percentage
	*/
	setRelativePosition: function(percentage){
		var newPosition = vec2.create();
		vec2.scale(newPosition, vec2.sub(newPosition, this.view.getViewSize(), this.view.getContentSize()), percentage);
		this.setScroll(newPosition);
	},

	getRelativePosition: function(){
		vec2.div(this._vec2cache, this.view.getViewPosition(), vec2.sub(this._vec2cache, this.view.getViewSize(), this.view.getContentSize()));
		return this._vec2cache;
	},

	checkIfScrollIsNeeded: function(){
		if(this.view.isContentLonger()){
			this.viewElement.addClass("content-longer");
		}

		if(this.view.isContentWider()){
			this.viewElement.addClass("content-wider");
		}
	},

	checkContentPosition: function(){
		var percentage = this.getRelativePosition();
		var classes = [];

		if(percentage[0] === 0){
			classes.push("on-left");
		}

		if(percentage[1] === 0){
			classes.push("on-top");
		}

		if(percentage[0] === 1){
			classes.push("on-right");
		}

		if(percentage[1] === 1){
			classes.push("on-bottom");
		}

		classes = classes.join(" ");
		if(classes !== this.positionClassNames){
			this.viewElement.removeClass(this.positionClassNames);
			this.viewElement.addClass(classes);
			this.positionClassNames = classes;
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

// Chooses best time'ing method for better performance. Thanks to Paul Irish
window.requestAnimFrame = (function(callback, time){
  return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
				window.setTimeout(callback, time);
			};
})();

(function() {
	if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();
