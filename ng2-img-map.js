"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ImgMapComponent = (function () {
    function ImgMapComponent(renderer) {
        this.renderer = renderer;
        /**
         * Radius of the markers.
         */
        this.markerRadius = 10;
        /**
         * On change event.
         */
        this.changeEvent = new core_1.EventEmitter();
        /**
         * On mark event.
         */
        this.markEvent = new core_1.EventEmitter();
        this.canvClickEvent = new core_1.EventEmitter();
        /**
         * Collection of markers.
         */
        this.markers = [];
        /**
         * Index of the hover state marker.
         */
        this.markerHover = null;
        /**
         * Pixel position of markers.
         */
        this.pixels = [];
        window.setInterval(() => this.draw(), 1000);
    }
    Object.defineProperty(ImgMapComponent.prototype, "setMarkers", {
        set: function (markers) {
            this.markerActive = null;
            this.markerHover = null;
            this.markers = markers;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    
    ImgMapComponent.prototype.change = function () {
        if (this.markerActive === null) {
            this.changeEvent.emit(null);
        }
        else {
            this.changeEvent.emit(this.markers[this.markerActive]);
        }
        this.draw();
    };
    /**
     * Get the cursor position relative to the canvas.
     */
    ImgMapComponent.prototype.cursor = function (event) {
        var rect = this.canvas.nativeElement.getBoundingClientRect();
        return [
            event.clientX - rect.left,
            event.clientY - rect.top
        ];
    };
    /**
     * Draw a marker.
     */
    var markerimage = new Image();
    markerimage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4gUeFTcnwJ7LMQAABDdJREFUWMO9mEtvG1UUgL/xxBM7duOKUNOLCuKhwiI8hGATMhKBApsMbVWB2DStCouqrPkJ/QNIlboCidJVgAUw3VBFGGmqbECoQDYgRZEXGSkpJCZp4kcmwyLXlT2+Y8/D6ZGi2Oeex+dz79x75mrEFNcyEbaDa5k68AJwCngHeAkoS7M14HfgNrAA/Clsx2v7xhEtIdw08LUE0ge4eRL4A2E7d+JCZmIWMO9a5reAA4gIcEgbATjSNx8nYSZK1eT/x4B14BzJ5RywLmM9iJ16il3LPAIsA48qg2igoT0I5gM+Pr4fGvIe8Iywna1UgK5lgo+Gxm/AyyqbhudRqzfZbjZpeB4Ao7pO0TAo5QxG9dBVcBefV9Dw+61JLUL1PgI+V1WtWttmp9Xq6z+WzfJkqRhWzY+F7XyRqILumTfA88aBWnBs3/dZqW3R9LyBv9AHDF3nqdIRMprSuoSu/ye++zneQyIdLvVWTqNa26LVDdcE5oEP5d+81KEBLc+jWttCUwNeCoMDGBlQgDNBxeZunXo33E/A+zOLS/92mM1XpiYfAb4B3gSoex6bu3VKuVFVjs+SbjPTwfWw2Wh0wq3MLC69BWwofDfk2EqIrzJHZEDXMsuAEdTvtPY6v14FmFlc6nkEOnRXQ3zbYshcsSv4fA/cnhdU3Yywjd4cEEOZKwpgXvX0BqrUGEQXtNlX7zf5JID3gopsptu8MjX5xCDAoE0wRliuKIB3g4rciI7evVV8KiFUYF02ALqmkRvRI+XqCyhbIg9Y7dp0fZ+Cke1UXa5MTZZnFpdUU0tlarIMXG7rCkYWv3eKV9u9YmTAjrNxIXgqTORznetoFKhWpibnFBWcA6rShn3fZyKfQ7ECFwI5Ix51B79oFrCDJ8n6/R3+2a2r3O6E7W0T+RzHCmOqClrArdiAHaDLwNNB/ZqEDDlfu57aiXyOcmFMNbwsbOfZtB3123J2u+R4scCJ8SJZPSP7v+6l4ANZPcOJ8SLHi4WwPuJU+n6wDuSw5XQrs+x5+9SaTZpyEzZGdEqGwYie6ZfgFg0sRiFVPyhBS8Bm318qu2oGd9NtOSpsp5b6nWTVmkYGutK37/MP1tu+HwnuirCd2qo1PbR3kvZxtA4USCf3gWPAbpTXz7jvxe8B36cEPC1s54dDeXGXkD/Km4QkclvYzruHerMAvAr8khDwNeDXODcLWpIsrmXeAOZiun0lbOdC3FyZhJX4JKTND5MN6cNDARS2sw1cj+FyXfrEFi3N4+ha5qq8GOprJmzn8aQ5ElVw/fTr7Y/nVed04CQ8H/B5eBWUVfwLOBky/LewnefSxM+QXsyEY4cP6M6aCNtZA64phq8J21lzZ9MxDmOKDy6Aerudo0At7p300AE7QC8AX8qvF4Xt3BhGXG1IcABZ4A+pehFopa3e0MW1zLOuZZ4dZsz/AaAxkQFVeXFBAAAAAElFTkSuQmCC';
    //'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4gUeFTcnwJ7LMQAABDdJREFUWMO9mEtvG1UUgL/xxBM7duOKUNOLCuKhwiI8hGATMhKBApsMbVWB2DStCouqrPkJ/QNIlboCidJVgAUw3VBFGGmqbECoQDYgRZEXGSkpJCZp4kcmwyLXlT2+Y8/D6ZGi2Oeex+dz79x75mrEFNcyEbaDa5k68AJwCngHeAkoS7M14HfgNrAA/Clsx2v7xhEtIdw08LUE0ge4eRL4A2E7d+JCZmIWMO9a5reAA4gIcEgbATjSNx8nYSZK1eT/x4B14BzJ5RywLmM9iJ16il3LPAIsA48qg2igoT0I5gM+Pr4fGvIe8Iywna1UgK5lgo+Gxm/AyyqbhudRqzfZbjZpeB4Ao7pO0TAo5QxG9dBVcBefV9Dw+61JLUL1PgI+V1WtWttmp9Xq6z+WzfJkqRhWzY+F7XyRqILumTfA88aBWnBs3/dZqW3R9LyBv9AHDF3nqdIRMprSuoSu/ye++zneQyIdLvVWTqNa26LVDdcE5oEP5d+81KEBLc+jWttCUwNeCoMDGBlQgDNBxeZunXo33E/A+zOLS/92mM1XpiYfAb4B3gSoex6bu3VKuVFVjs+SbjPTwfWw2Wh0wq3MLC69BWwofDfk2EqIrzJHZEDXMsuAEdTvtPY6v14FmFlc6nkEOnRXQ3zbYshcsSv4fA/cnhdU3Yywjd4cEEOZKwpgXvX0BqrUGEQXtNlX7zf5JID3gopsptu8MjX5xCDAoE0wRliuKIB3g4rciI7evVV8KiFUYF02ALqmkRvRI+XqCyhbIg9Y7dp0fZ+Cke1UXa5MTZZnFpdUU0tlarIMXG7rCkYWv3eKV9u9YmTAjrNxIXgqTORznetoFKhWpibnFBWcA6rShn3fZyKfQ7ECFwI5Ix51B79oFrCDJ8n6/R3+2a2r3O6E7W0T+RzHCmOqClrArdiAHaDLwNNB/ZqEDDlfu57aiXyOcmFMNbwsbOfZtB3123J2u+R4scCJ8SJZPSP7v+6l4ANZPcOJ8SLHi4WwPuJU+n6wDuSw5XQrs+x5+9SaTZpyEzZGdEqGwYie6ZfgFg0sRiFVPyhBS8Bm318qu2oGd9NtOSpsp5b6nWTVmkYGutK37/MP1tu+HwnuirCd2qo1PbR3kvZxtA4USCf3gWPAbpTXz7jvxe8B36cEPC1s54dDeXGXkD/Km4QkclvYzruHerMAvAr8khDwNeDXODcLWpIsrmXeAOZiun0lbOdC3FyZhJX4JKTND5MN6cNDARS2sw1cj+FyXfrEFi3N4+ha5qq8GOprJmzn8aQ5ElVw/fTr7Y/nVed04CQ8H/B5eBWUVfwLOBky/LewnefSxM+QXsyEY4cP6M6aCNtZA64phq8J21lzZ9MxDmOKDy6Aerudo0At7p300AE7QC8AX8qvF4Xt3BhGXG1IcABZ4A+pehFopa3e0MW1zLOuZZ4dZsz/AaAxkQFVeXFBAAAAAElFTkSuQmCC';
   
    ImgMapComponent.prototype.drawMarker = function (pixel, type) {
        //console.log("pixel="+pixel[0]+" "+pixel[1]);
        var context = this.canvas.nativeElement.getContext('2d');
        context.drawImage(markerimage,pixel[0]-20, pixel[1]-40);
        
    };
    /**
     * Check if a position is inside a marker.
     */
    ImgMapComponent.prototype.insideMarker = function (pixel, coordinate) {
        return Math.sqrt((coordinate[0] - pixel[0]) * (coordinate[0] - pixel[0])
            + (coordinate[1] - pixel[1]) * (coordinate[1] - pixel[1])) < this.markerRadius;
    };
    /**
     * Convert a percentage position to a pixel position.
     */
    ImgMapComponent.prototype.markerToPixel = function (marker) {
        var image = this.image.nativeElement;
        return [
            (image.clientWidth / 100) * marker[0],
            (image.clientHeight / 100) * marker[1]
        ];
    };
    /**
     * Convert a pixel position to a percentage position.
     */
    ImgMapComponent.prototype.pixelToMarker = function (pixel) {
        var image = this.image.nativeElement;
        return [
            (pixel[0] / image.clientWidth) * 100,
            (pixel[1] / image.clientHeight) * 100
        ];
    };
    /**
     * Sets the new marker position.
     */
    ImgMapComponent.prototype.mark = function (pixel) {
        
        this.markEvent.emit(pixel);
    };
    /**
     * returns the click location
     */
    ImgMapComponent.prototype.canvClick = function (pixel) {
        this.canvClickEvent.emit(pixel);
    };
    /**
     * Sets the marker pixel positions.
     */
    ImgMapComponent.prototype.setPixels = function () {
        var _this = this;
        this.pixels = [];
        this.markers.forEach(function (marker) {
            _this.pixels.push(_this.markerToPixel(marker));
        });
    };
    /**
     * Clears the canvas and draws the markers.
     */
    ImgMapComponent.prototype.draw = function () {
        var _this = this;
        var canvas = this.canvas.nativeElement;
        var container = this.container.nativeElement;
        var image = this.image.nativeElement;
        var height = image.clientHeight;
        var width = image.clientWidth;
        this.renderer.setElementAttribute(canvas, 'height', "" + height);
        this.renderer.setElementAttribute(canvas, 'width', "" + width);
        this.renderer.setElementStyle(container, 'height', height + "px");
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, width, height);
        this.setPixels();
        // added by mark - to use image
        this.pixels.forEach(function (pixel, index) {
            if (_this.markerActive === index) {
                _this.drawMarker(pixel, 'active');
            }
            else if (_this.markerHover === index) {
                _this.drawMarker(pixel, 'hover');
            }
            else {
                _this.drawMarker(pixel);
            }
        });
        
    };
    ImgMapComponent.prototype.onClick = function (event) {
        var _this = this;
        var cursor = this.cursor(event);
        var active = false;
        if (this.changeEvent.observers.length) {
            var change = false;
            this.pixels.forEach(function (pixel, index) {
                if (_this.insideMarker(pixel, cursor)) {
                    active = true;
                    if (_this.markerActive === null || _this.markerActive !== index) {
                        _this.markerActive = index;
                        change = true;
                    }
                }
            });
            if (!active && this.markerActive !== null) {
                this.markerActive = null;
                change = true;
            }
            if (change)
                this.change();
        }
        if (!active && this.markEvent.observers.length) {
            this.mark(cursor);
        }
    };
    ImgMapComponent.prototype.onLoad = function (event) {
        this.draw();
    };
    ImgMapComponent.prototype.onMousemove = function (event) {
        var _this = this;
        if (this.changeEvent.observers.length) {
            var cursor_1 = this.cursor(event);
            var hover = false;
            var draw = false;
            this.pixels.forEach(function (pixel, index) {
                if (_this.insideMarker(pixel, cursor_1)) {
                    hover = true;
                    if (_this.markerHover === null || _this.markerHover !== index) {
                        _this.markerHover = index;
                        draw = true;
                    }
                }
            });
            if (!hover && this.markerHover !== null) {
                this.markerHover = null;
                draw = true;
            }
            if (draw)
                this.draw();
        }
    };
    ImgMapComponent.prototype.onMouseout = function (event) {
        if (this.markerHover) {
            this.markerHover = null;
            this.draw();
        }
    };
    ImgMapComponent.prototype.onResize = function (event) {
        this.draw();
    };
    
    __decorate([
        core_1.ViewChild('canvas'), 
        __metadata('design:type', core_1.ElementRef)
    ], ImgMapComponent.prototype, "canvas", void 0);
    __decorate([
        core_1.ViewChild('container'), 
        __metadata('design:type', core_1.ElementRef)
    ], ImgMapComponent.prototype, "container", void 0);
    __decorate([
        core_1.ViewChild('image'), 
        __metadata('design:type', core_1.ElementRef)
    ], ImgMapComponent.prototype, "image", void 0);
    __decorate([
        core_1.Input('markers'), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], ImgMapComponent.prototype, "setMarkers", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ImgMapComponent.prototype, "markerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImgMapComponent.prototype, "src", void 0);
    __decorate([
        core_1.Output('change'), 
        __metadata('design:type', Object)
    ], ImgMapComponent.prototype, "changeEvent", void 0);
    __decorate([
        core_1.Output('mark'), 
        __metadata('design:type', Object)
    ], ImgMapComponent.prototype, "markEvent", void 0);
    ImgMapComponent = __decorate([
        core_1.Component({
            selector: 'img-map',
            styles: [
                '.img-map { position: relative; }',
                '.img-map canvas, .img-map img { position: absolute; top: 0; left: 0; }',
                '.img-map img { display: block; height: auto; max-width: 100%; }'
            ],
            template: "\n    <div\n      class=\"img-map\"\n      #container\n      (window:resize)=\"onResize($event)\"\n    >\n      <img\n        #image\n        [src]=\"src\"\n        (load)=\"onLoad($event)\"\n      >\n      <canvas\n        #canvas\n        (click)=\"onClick($event)\"\n        (mousemove)=\"onMousemove($event)\"\n        (mouseout)=\"onMouseout($event)\"\n      ></canvas>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.Renderer])
    ], ImgMapComponent);
    return ImgMapComponent;
}());
exports.ImgMapComponent = ImgMapComponent;
//# sourceMappingURL=ng2-img-map.js.map