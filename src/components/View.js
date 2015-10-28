/** View is used to pan content. It provides view area with given size on content with given size.
	It does not bind itself to any elements.
	@param contentSize Width and height of content as Vector
	@param viewSize Width and height of view as Vector */
var View=ClassWFUI.extend({
	init: function(contentSize, viewSize) {
		this.position=vec2.create(); ///< Current view position

		// View and content size
		this.contentSize=contentSize;      ///< Width and height of content
		this.viewSize=viewSize;            ///< Width and height of current view
		this._maxPosition = vec2.create(); /// Buffer vector for clampPosition
		this._minPosition = vec2.create(); /// Buffer vector for clampPosition
	},

	/** Gets current view position */
	getViewPosition: function() {
		return this.position;
	},

	/** Gets position of content */
	getContentPosition: function() {

		return this.position;
	},

	/** Clamps current position of view into current range */
	clampPosition: function() {
		vec2.sub(this._maxPosition, this.getViewSize(), this.getContentSize());
		vec2.max(this._maxPosition, this._minPosition, this._maxPosition);
		this.position=this.clamp(this.position, vec2.create(), this._maxPosition);
	},

	/** Sets current position
		@param position New position */
	setViewPosition: function(position) {
		if(!isNaN(parseFloat(position[0])) && isFinite(position[0]) && !isNaN(parseFloat(position[1])) && isFinite(position[1])){
			this.position=position;
			this.clampPosition();
		}
	},

	/** Moves position by given delta
		@param delta Vector instance */
	move: function(delta) {
		this.setViewPosition(vec2.add(delta, this.getViewPosition(), delta));
	},

	setViewSize: function(width, height) {
		this.viewSize = vec2.fromValues(width, height);
		this.clampPosition();
	},

	setContentSize: function(width, height) {
		this.contentSize = vec2.fromValues(width, height);
		this.clampPosition();
	},

	isContentLonger: function(){
		return (this.viewSize[1] <= this.contentSize[1]);
	},

	isContentWider: function(){
		return (this.viewSize[0] <= this.contentSize[0]);
	},

	/** Gets size content */
	getContentSize: function() {
		return this.contentSize;
	},

	/** Gets width of container */
	getViewSize: function() {
		return this.viewSize;
	},

	clamp: function(v, min, max){
		var out = vec2.clone(v);
		vec2.max(out, out, min);
		vec2.min(out, out, max);
		//console.log("IN", JSON.stringify(v), "min:", JSON.stringify(min), "max:", JSON.stringify(max), "out:", JSON.stringify(out));
		return out;
	},

	getPercentagePosition: function(){
		return vec2.div(vec2.create(), this.position, this.viewSize);
	}
});
