/** Default UserInterface class that other UserInterface's extend */
var UserInterface=Class.extend({
	init: function(wayfinder) {
		this.elements = {}; //Store oftenly used elements here
		this.history = new History();
		this.maxInactivityTime = 30000;
		this.lastTouch = (new Date()).getTime();
		$(window).resize(ClassCallback(this, this.resize));
	},

	/** Called when wayfinder data has been loaded */
	start: function() {
		this.setup();
		this.resize();
	},

	setup: function(){

	},

	onSetupFinished: function(){

	},

	setupLanguage: function(){
		//var language = this.wayfinder.getLanguage();
		if(language && this.wayfinder.languages[language]){
			$("body").removeClass("rtl");
			$("body").removeClass (function (index, css) {
				return (css.match (/(^|\s)language_\S+/g) || []).join(' ');
			});
			$("body").addClass("language_"+this.wayfinder.languages[language].getName());
			$("body").addClass(this.wayfinder.languages[language].getTextDirection());
		}
	},

	setIdleTimer: function(){
		if(this.wayfinder.settings.data["kiosk.max-inactivity"]){
			this.maxInactivityTime = parseInt(this.wayfinder.settings.data["kiosk.max-inactivity"], 10)*1000;
		}

		var me = this;

		function trigger() {
			me.lastTouch = (new Date()).getTime();
			me.hideScreensaver();
		}

		$('body').mousedown(trigger);
		$("body").hammer().on('touch', trigger);

		var checker = function(){
			var time = (new Date()).getTime();
			if(time - me.lastTouch >  me.maxInactivityTime){
				if(me.lastTouch > -1){
					me.onTimeout();
				}
				setTimeout(checker, me.maxInactivityTime);
			}else {
				setTimeout(checker, me.maxInactivityTime - (time - me.lastTouch));
			}
		};

		setTimeout(checker, this.maxInactivityTime);
	},

	resize: function() {
		
	},

	/** Called by wayfinder when data loading progress changes */
	onProgress: function(progress) {
		
	},

	/** Called after new language has been set */
	onSetLanguage: function(language) {
		this.setupLanguage();
	},

	showScreensaver: function(){
		if (!this.wayfinder.screensaving) {
			$("#screensaver").show(100);
		}
	},

	hideScreensaver: function(){
		if (this.wayfinder.screensaving) {
			$("#screensaver").hide(100);
			this.lastTouch = (new Date()).getTime();
		}
	},

	/**
	* Called when nobody has touched the screen for awhile
	*/
	onTimeout: function(){
		this.lastTouch = -1; //Disables timeouting until somebody has touched
		//this.wayfinder.restoreDefaultState();
		this.showScreensaver();
	}
});