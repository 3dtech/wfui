
var DraggableItemMenu = Menu.extend({
    init: function(element) {
        this._super(element);
        this.dragging = false;
        this.draggableElement = null;
        this.draggableObject = null;
        this.dragCache = vec2.create();
    },
    addCallback: function(item) {
        var me = this;
        var hammertime = new Hammer(item.element[0]);
        var doubleTap = new Hammer.Tap({
            event: "doubletap",
            taps: 2,
            domEvents: true
        });
        hammertime.add([ doubleTap ]);
        if (item.element && hammertime) {
            hammertime.on("tap doubletap", function(event) {
                if (event.target == item.element[0] || event.target.parentNode == item.element[0]) {
                    event.preventDefault();
                    me.activateItem(item);
                    if (item.callback && typeof item.callback === "function") {
                        item.callback(item);
                    }
                    me.onItemClick(item, event);
                    item.onClick();
                }
            });
            hammertime.on("touch panstart panend pancancel pan release mouseleave", function(event) {
                me.drag(item, event);
            });
            hammertime.on("touchstart", function() {
                item.element.addClass("tapped");
            });
            hammertime.on("touchend", function() {
                item.element.removeClass("tapped");
            });
        }
    },
    drag: function(item, event) {
        switch (event.type) {
          case "panstart":
            this.initDragging(item, event.center.x, event.center.y);
            this.updatePosition(event.center.x, event.center.y);
            break;

          case "panend":
            this.updatePosition(event.center.x, event.center.y);
            this.cancelDragging(event.center.x, event.center.y);
            break;

          default:
            this.updatePosition(event.center.x, event.center.y);
            break;
        }
    },
    initDragging: function(item, x, y) {
        this.dragging = true;
        if (!item) return;
        if (this.draggableElement) {
            this.draggableElement.remove();
        }
        if (item.iconElement) {
            this.draggableElement = item.iconElement.clone();
            this.draggableElement.addClass("draggable");
            this.draggableElement.appendTo("body");
        }
        var piece = item.getDataObject();
        if (piece) {
            this.draggableObject = piece;
            this.onDragStart(piece);
            this.onDrag(vec2.set(this.dragCache, x, y), piece);
        }
    },
    cancelDragging: function(x, y) {
        if (this.draggableElement && this.draggableObject) {
            this.onDragEnd(vec2.set(this.dragCache, x, y), this.draggableObject);
        }
        this.dragging = false;
        if (this.draggableElement) {
            this.draggableElement.remove();
        }
        this.draggableElement = null;
        this.draggableObject = null;
    },
    updatePosition: function(x, y) {
        if (this.draggableElement && this.draggableObject) {
            this.draggableElement.css("left", x);
            this.draggableElement.css("top", y);
            this.onDrag(vec2.set(this.dragCache, x, y), this.draggableObject);
        }
    },
    onDragEnd: function(position, object) {},
    onDragStart: function(position, object) {},
    onDrag: function(position, object) {}
});
