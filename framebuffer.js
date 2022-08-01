module.exports.Framebuffer = function(dev, width, height, depth) {

var fs = require('fs');

this.framebuffer = fs.openSync(dev, 'w');
this.width = width;
this.height = height;
this.depth = depth;

this.setPixel = function(x, y, color) {
  colorToDraw = [...color];
  colorToDraw.push(0);
  fs.writeSync(this.framebuffer, new Uint8Array(colorToDraw), 0, this.depth, ((y * this.width) + x) * this.depth);
}

this.clear = function() {
  fs.writeSync(this.framebuffer, new Uint8Array(this.width * this.height * this.depth), 0, this.width * this.height * this.depth, 0);
}

this.drawRectangle = function(x, y, width, height, color) {
  for (var i = y; i < (y + height); i++) {
    for (var j = x; j < (x + width); j++) {
      this.setPixel(j, i, color);
    }
  }
}

this.drawLine = function(x0, y0, x1, y1, color) {
   var dx = Math.abs(x1 - x0);
   var dy = Math.abs(y1 - y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx - dy;

   while(true) {
      this.setPixel(x0, y0, color);

      if ((x0 === x1) && (y0 === y1)) break;
      var e2 = 2*err;
      if (e2 > -dy) { err -= dy; x0  += sx; }
      if (e2 < dx) { err += dx; y0  += sy; }
   }
}

}

module.exports.colors = {
  red: [0, 0, 255],
  blue: [255, 0, 0],
  green: [0, 255, 0],
  white: [255, 255, 255],
  black: [0, 0, 0],
  cyan: [255, 255, 0],
  magenta: [255, 0, 255],
  yellow: [0, 255, 255]
}
