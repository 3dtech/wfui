/**
 * Loading screen
 */
var LoadingScreen = UIComponent.extend({
	/** Constructor
		@param element JQuery element that is assigned to this tab */
	init: function(element) {
		this._super(element);
		this.element=element;
		this.tabs=false;
		this.progress=0;
	},
	
	/** Sets progress of the loading-screen tab. Calls onLoadingDone when
    progress has reached 100 */
	setProgress: function(progress) {
		this.progress=Math.max(Math.min(parseInt(progress*100), 100), 0);
//		console.log('setProgress: ', progress, this.progress);
		if (this.element) {
			this.element.find('.progress').one().css('width', (this.progress)+'%');
		}
		//if(this.progress==100) this.onLoadingDone();
	},
	
	/** Called when progress reaches 100 */
	onLoadingDone: function() {
		this.hide();
	}
});
