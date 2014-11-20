/** History for hierachical back movement */
var HistoryTree = Class.extend({
	init: function() {
		this.setup();
		this.states = {};
		this.tree = {};
		this.current = [];
		this.rootState = [];
	},
	
	setup: function(){
		// When Back or Forward button is clicked this function is called
		window.onpopstate = ClassCallback(this, this.back);
	},

	setRootState: function(callback, args){
		this.rootState = [callback, args];
	},

	//generates a blank tree
	setTree: function(tree){
		this.tree = tree;
	},

	setState: function(name, callback, args){
		var stateChange = false;
		if(this.hasLeaf(name, 0) !== null){
			this.current.push(name);
			stateChange = true;
		}
		else if(this.hasLeaf(name, 1) !== null){
			this.current.pop();
			this.current.push(name);
			stateChange = true;
		}
		else if(this.hasLeaf(name, 2) !== null){
			this.current.pop();
			this.current.pop();
			this.current.push(name);
			stateChange = true;
		}
		else { //Choosen state isn't a child, sibling nor parent. Maybe it is a main node
			for(var i in this.tree){
				if(i == name){
					this.current = [i];
					stateChange = true;
				}
			}
		}
		if(stateChange){
			this.states[this.current.join(".")] = [callback, args];
			this.callCurrent();
			if (history && history.pushState) {
				history.pushState({id:name}, document.title, document.location);
			}
		}
	},

	hasLeaf: function(name, offset){
		var state = this.tree;
		for(var i=0; i < Math.max(0, this.current.length-offset); i++){
			if(typeof state === "object"){
				state = state[this.current[i]];
			}
		}
		
		for(var j in state){
			if(j === name){
				return state[j];
			}
		}

		return null;
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

		if(this.current.length === 0 && typeof this.onExit === "function"){
			this.onExit();
			return;
		}

		var last = this.current.slice(0, Math.max(this.current.length-1));
		var last_key = last.join(".");

		if(typeof this.states[last_key] !== "undefined"){
			if(typeof this.states[last_key][0] === "function"){
				this.states[last_key][0](this.states[last_key][1]);
			}
			this.current = last;

			this.onBack(last);
		}
		else if(this.current.length == 1){
			this.current.pop();
			if(typeof this.rootState[0] === "function"){
				this.rootState[0](this.rootState[1]);
			}
		}
	},
	
	onBack: function(stack){
	
	},

	onExit: function(){

	},

	clear: function(){
		this.current = [];
	},

	callCurrent: function(){
		var key = this.current.join(".");

		if(typeof this.states[key] !== "undefined"){
			if(typeof this.states[key][0] === "function"){
				this.states[key][0](this.states[key][1]);
			}
		}
	}
});
