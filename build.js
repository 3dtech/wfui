var version = "1.1.0";
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;

var outputFile = "builds/WFUI."+version+".min.js";
var outputLatest = "builds/WFUI.latest.min.js";

var files = [
	"libs/classExtend.js",
	"libs/vec2.js",
	"src/UserInterface.js",
	"src/components/History.js",
	"src/components/HistoryTree.js",
	"src/components/View.js",
	"src/components/UIComponent.js",
	"src/components/Scrollbar.js",
	"src/components/DragScroll.js",
	"src/components/ScrollableComponent.js",
	"src/elements/UserMessage.js",
	"src/elements/Button.js",
	"src/elements/LoadingScreen.js",
	"src/menu/Menu.js",
	"src/menu/ScrollableMenu.js",
	"src/menu/DraggableItemMenu.js",
	"src/menu/items/MenuItem.js",
	"src/menu/items/BulletItem.js",
	"src/menu/items/ValueMenuItem.js",
	"src/menu/items/TextInputItem.js",
	"src/menu/items/ImageMenuItem.js",
	"src/menu/items/MultiValueMenuItem.js",
	"src/menu/items/StaticMenuItem.js",
	"src/menu/items/SubMenuItem.js",
	"src/components/Tab.js",
	"src/components/Tabs.js"
];

function output(error, stdout, stderr) {
	sys.puts(stderr);
	if (error !== null) {
		console.log('uglifyjs exec error: '+error);
	}
}

var command = "uglifyjs -m -c -o "+outputFile+" --stats ";
var commandLatest = "uglifyjs -m -c -o "+outputLatest+" --stats ";

if(process.argv.length>=3 && process.argv[2]=='debug') {
	command="uglifyjs -b -o "+outputFile+" --stats ";
	console.log('WARNING: Building DEBUG build of library.');
}

exec(command+files.join(' '), output);
exec(commandLatest+files.join(' '), output);
