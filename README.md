WFUI
====

User Interface (UI) Library for Single Page Applications (SPA)

Depends on jQuery

Getting Started
----
Create Your UI class by extending the UserInterface class:

```var MyUserInterface = UserInterface.extend({

});```

Include the Library and Your code in the html file head

Start the application:
```var gui;
$(function(){
	gui = new MyUserInterface();
});```

Build
--------
Using node call
node build.js

For debugging purposes call
node build.js debug
