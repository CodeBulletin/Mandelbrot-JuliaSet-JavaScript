var maxitr = 100;
var zoom = 2;
var lastzoom = zoom;
var zoomval = 0.3;
var h = 1;
var shiftx = 0;
var shifty = 0;
var infi = 4;
var graphics;
var imagemode = false;
var loopimage = true;
var setMode = true;
// var nx = 0.1;
// var n = nx+1;
var ca = 0;
var cb = 0;
var t = 0;
var rectWidth1 = 250, rectWidth2 = 250;
function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  textAlign(LEFT ,CENTER);
  rectMode(CORNERS);
}
function drawJset() {
  if (imagemode === false) {
    graphics = createGraphics(100, 100, P2D);
  } else {
    graphics = createGraphics(height, height, P2D);
  }
  graphics.pixelDensity(1);
  graphics.loadPixels();
  for (var x = 0; x < graphics.height; x++) {
    for (var y = 0; y < graphics.height; y++) {
      var a = map(x, 0, graphics.height, -zoom, zoom) - shiftx;
      var b = map(y, 0, graphics.height, -zoom, zoom) - shifty;
      var itr = 0;
      while (itr < maxitr) {
        // var aa = Math.pow((a*a + b*b),(n / 2)) * Math.cos(n * Math.atan2(b, a))
        // var bb = Math.pow((a*a + b*b),(n / 2)) * Math.sin(n * Math.atan2(b, a))
        var aa = a*a - b*b;
        var bb = 2*a*b;
        a = aa + ca;
        b = bb + cb;

        if (a*a + b*b > infi) {
          break;
        }
        itr++;
      }
      var pix = (x+y*graphics.width)*4;
      var bright = map(itr, 0, maxitr, 0, 255);
      if (itr === maxitr) {
        bright = 0;
      }
      graphics.pixels[pix + 0] = bright;
      graphics.pixels[pix + 1] = (bright*2)%256;
      graphics.pixels[pix + 2] = (bright*3)%256;
      graphics.pixels[pix + 3] = 255;
    }
  }
  graphics.updatePixels();
}
function drawMset() {
  if (imagemode === false) {
    graphics = createGraphics(100, 100, P2D);
  } else {
    graphics = createGraphics(height, height, P2D);
  }
  graphics.pixelDensity(1);
  graphics.loadPixels();
  for (var x = 0; x < graphics.height; x++) {
    for (var y = 0; y < graphics.height; y++) {
      var a = map(x, 0, graphics.height, -zoom, zoom) - shiftx;
      var b = map(y, 0, graphics.height, -zoom, zoom) - shifty;
      var ca = a;
      var cb = b;
      var itr = 0;
      while (itr < maxitr) {
        // var aa = Math.pow((a*a + b*b),(n / 2)) * Math.cos(n * Math.atan2(b, a))
        // var bb = Math.pow((a*a + b*b),(n / 2)) * Math.sin(n * Math.atan2(b, a))
        var aa = a*a - b*b;
        var bb = 2*a*b;
        a = aa + ca;
        b = bb + cb;

        if (a*a + b*b > infi) {
          break;
        }
        itr++;
      }
      var pix = (x+y*graphics.width)*4;
      var bright = map(itr, 0, maxitr, 0, 255);
      if (itr === maxitr) {
        bright = 0;
      }
      graphics.pixels[pix + 2] = bright;
      graphics.pixels[pix + 1] = (bright*2)%256;
      graphics.pixels[pix + 0] = (bright*3)%256;
      graphics.pixels[pix + 3] = 255;
    }
  }
  graphics.updatePixels();
}
function draw() {
  background(0);
  if(loopimage === true){
    if(setMode ===true){
      drawJset();
    } else {
      drawMset();
    }
    loopimage = false;
  }
  image(graphics, 0, 0, height, height);
  strokeWeight(1);
  stroke(255);
  line(height, 0, height, height);
  textSize(15);
  if(setMode === true){
    fill(255);
  } else {
    noFill();
  }
  ellipse(height+20, 20, 15, 15);
  text('Julia Set', height+30, 20);
  if(setMode === false){
    fill(255);
  } else {
    noFill();
  }
  ellipse(height+100, 20, 15, 15);
  text('Mandelbrot Set', height+110, 20);
  if(setMode === true){
    ca = map(rectWidth1, 0, 500, -1, 1);
    cb = map(rectWidth2, 0, 500, -1, 1);
    fill(255);
    text(-1, height+20, 50);
    text(1, height+550, 50);
    text(-1, height+20, 80);
    text(1, height+550, 80);
    rect(height + 40, 40, height + 540, 60);
    rect(height + 40, 70, height + 540, 90);
    fill(0,255,255);
    rect(height + 40, 40, height + 40 + rectWidth1, 60);
    rect(height + 40, 70, height + 40 + rectWidth2, 90);
    push();
    stroke(0);
    fill(0);
    textAlign(CENTER, CENTER);
    text(cb,height+290, 82);
    text(ca,height+290, 52);
    pop();
  }
}
function keyPressed() {
  imagemode = false;
  if (keyCode === UP_ARROW) {
    if (nf(zoom, 0, h) <= nf(lastzoom*0.1, 0, h+1)) {
      zoomval = zoom*0.1;
      lastzoom = zoom;
      h++;
	}
    zoom -= zoomval;
  }
  if (keyCode === DOWN_ARROW) {
    zoom += 2*zoomval
  }
  if (key == 'd') {
    shiftx += zoom*0.1;
  }
  if (key == 'a') {
    shiftx -= zoom*0.1;
  }
  if (key == 'w') {
    shifty += zoom*0.1;
  }
  if (key == 's') {
    shifty -= zoom*0.1;
  }
  if (key == 'i') {
    maxitr = maxitr*2;
  }
  if (key == 'k') {
    maxitr = int(maxitr/2);
  }
  if (key == 'y') {
    infi = infi*2;
  }
  if (key == 'h') {
    infi = int(infi/2);
  }
  if (key == 'x') {
    imagemode = true;
  }
  if (key == 'r') {
    maxitr = 100;
    zoom = 3;
    lastzoom = zoom;
    zoomval = 0.3;
    h = 1;
    shiftx = 0;
    shifty = 0;
    infi = 15;
    imagemode = false;
  }
  loopimage = true;
}
function mousePressed(){
  imagemode = false;
  if(dist(mouseX, mouseY, height+20, 20) < 15/2){
    setMode = true;
    loopimage = true;
  }
  if(dist(mouseX, mouseY, height+100, 20) < 15/2){
    setMode = false;
    loopimage = true;
  }
}
function mouseDragged(){
  if(((mouseX >= height + 40 && mouseY >= 40)&&(mouseX <= height + 540 && mouseY <= 60))&& setMode === true) {
    rectWidth1 = mouseX - height - 40;
    loopimage = true;
  }
  if(((mouseX >= height + 40 && mouseY >= 70)&&(mouseX <= height + 540 && mouseY <= 90))&& setMode === true) {
    rectWidth2 = mouseX - height - 40;
    loopimage = true;
  }
}
