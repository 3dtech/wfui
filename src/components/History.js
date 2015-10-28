/** History for back and forward movement */
var History = ClassWFUI.extend({
	init: function() {
		this.setup();
		this.states = [];
	},
	
	setup: function(){
		// When Back or Forward button is clicked this function is called
		window.onpopstate = WFUICallback(this, this.back);
	},
	
	/** Adds a new tab to tabs list. Calls onAdd method of added tab */
	write: function(createFunc, closeFunc) {
		this.states.push({"open": createFunc, "close": closeFunc});
		if (history && history.pushState) {
			history.pushState({id:(this.states.length-1)}, document.title, document.location);
		}

		if(createFunc && typeof createFunc === "function"){
			createFunc();
		}
	},
	
	back: function(event){
		if(this.states.length > 0){
			var lastState = this.states.pop();
			if(lastState && lastState.close && typeof lastState.close === "function"){
				lastState.close();
			}

			if(this.states.length > 0){
				lastState = this.states[this.states.length-1];
				//open previous state
				if(lastState && lastState.open && typeof lastState.open === "function"){
					lastState.open();
				}
			}
		}

		if(event.state){
			this.onBack(event.state.id);
		}

		if(this.states.length === 0 && typeof this.onExit === "function"){
			this.onExit();
		}
	},
	
	onBack: function(name){
	
	},

	onExit: function(){

	},

	clear: function(){
		this.states.length = 0;
	},

	triggerBack: function(){
		history.back();
	},

	callState: function(name){
		if(name){
			if(this.states[name] && typeof this.states[name] === "function"){
				this.states[name]();
			}
		}
	}
});
