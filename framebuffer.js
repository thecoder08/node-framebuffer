module.exports.Framebuffer = function(dev) {

var fs = require('fs');

this.framebuffer = fs.openSync(dev, 'w');

this.getPixel = function(x, y) {
  return ((y * 1920) + x) * 4;
}

this.clear = function() {
  for (var i = 0; i < 2073600; i++) {
    fs.writeSync(this.framebuffer, new Uint8Array([0, 0, 0, 0]));
  }
}

this.drawRectangle = function(x, y, width, height, color) {
  color.push(0);
  for (var i = y; i < (y + height); i++) {
    for (var j = x; j < (x + width); j++) {
      fs.writeSync(this.framebuffer, new Uint8Array(color), 0, 4, this.getPixel(j, i));
    }
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
