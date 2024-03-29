module.exports.Framebuffer = function(dev, width, height, depth) {

var fs = require('fs');

this.framebuffer = fs.openSync(dev, 'r+');
this.width = width;
this.height = height;
this.depth = depth;

this.plot = function(x, y, color) {
  if (x >= this.width || x < 0 || y >= this.height || y < 0) {
    return;
  }
  var colorToDraw = [...color];
  colorToDraw.reverse();
  colorToDraw.push(0);
  fs.writeSync(this.framebuffer, new Uint8Array(colorToDraw), 0, this.depth, ((y * this.width) + x) * this.depth);
}

this.clear = function() {
  fs.writeSync(this.framebuffer, new Uint8Array(this.width * this.height * this.depth), 0, this.width * this.height * this.depth, 0);
}

this.circle = function(x, y, radius, color) {
  for (var i = -radius; i < radius; i++) {
    for (var j = -radius; j < radius; j++) {
      if (j*j + i*i < radius*radius) {
        this.plot(x + j, y + i, color);
      }
    }
  }
}

this.buffer = function(x, y, width, height, depth, buffer) {
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var location = ((i * width) + j) * depth;
      var pixel = [];
      for (var k = 0; k < depth; k++) {
        pixel[k] = buffer[location + k];
      }
      this.plot(x + j, y + i, pixel);
    }
  }
}

this.rectangle = function(x, y, width, height, color) {
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      this.plot(x + j, y + i, color);
    }
  }
}

this.line = function(x0, y0, x1, y1, color) {
   var dx = Math.abs(x1 - x0);
   var dy = Math.abs(y1 - y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx - dy;

   while(true) {
      this.plot(x0, y0, color);

      if ((x0 === x1) && (y0 === y1)) break;
      var e2 = 2*err;
      if (e2 > -dy) { err -= dy; x0  += sx; }
      if (e2 < dx) { err += dx; y0  += sy; }
   }
}

}

module.exports.FramebufferArray = function(array, width, height, depth) {
    
this.array = array;
this.width = width;
this.height = height;
this.depth = depth;

this.plot = function(x, y, color) {
  if (x >= this.width || x < 0 || y >= this.height || y < 0) {
    return;
  }
  for (var i = 0; i < this.depth; i++) {
      this.array[((y * this.width) + x) * this.depth + i] = color[i];
  }
}

this.clear = function() {
  this.array.fill(0);
}

this.circle = function(x, y, radius, color) {
  for (var i = -radius; i < radius; i++) {
    for (var j = -radius; j < radius; j++) {
      if (j*j + i*i < radius*radius) {
        this.plot(x + j, y + i, color);
      }
    }
  }
}

this.buffer = function(x, y, width, height, depth, buffer) {
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var location = ((i * width) + j) * depth;
      var pixel = [];
      for (var k = 0; k < depth; k++) {
        pixel[k] = buffer[location + k];
      }
      this.plot(x + j, y + i, pixel);
    }
  }
}

this.rectangle = function(x, y, width, height, color) {
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      this.plot(x + j, y + i, color);
    }
  }
}

this.line = function(x0, y0, x1, y1, color) {
   var dx = Math.abs(x1 - x0);
   var dy = Math.abs(y1 - y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx - dy;

   while(true) {
      this.plot(x0, y0, color);

      if ((x0 === x1) && (y0 === y1)) break;
      var e2 = 2*err;
      if (e2 > -dy) { err -= dy; x0  += sx; }
      if (e2 < dx) { err += dx; y0  += sy; }
   }
}

}

module.exports.colors = {
  blue: [0, 0, 255],
  red: [255, 0, 0],
  green: [0, 255, 0],
  white: [255, 255, 255],
  black: [0, 0, 0],
  yellow: [255, 255, 0],
  magenta: [255, 0, 255],
  cyan: [0, 255, 255]
}