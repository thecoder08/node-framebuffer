# Framebuffer
A library for interacting with the Linux framebuffer API.
## Usage
After installing, you can use Framebuffer like so:
```javascript
// import Framebuffer and colors from node-framebuffer
var { Framebuffer, colors } = require('node-framebuffer');

// create a new Framebuffer instance
var fb = new Framebuffer('/dev/fb0');

// draw a blue 50x50 rectangle to (100, 100) on the framebuffer
fb.drawRectangle(100, 100, 50, 50, colors.red);
```
