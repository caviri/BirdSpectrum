let mic, fft;
let song;

var y = 0;
var spectrums = [];
var speed = 2400;
var Lextension = 10;


var r = 0;
var g = 0;
var b = 0;

let filter, filterFreq, filterRes;

//frameRate(2);
function preload() {
  // preload() runs once
    song = loadSound('assets/petirrojo.mp3');
}

function setup() {

  createCanvas(1200, 800); //1600,1600
  background(0);

  pixelDensity(1);

  //mic = new p5.AudioIn();
  //mic.start();
  fft = new p5.FFT();
  //fft.setInput(mic);

  input = createFileInput(handleFile);
  input.position(width-300, 0);

    filter = new p5.LowPass();

    // Disconnect soundfile from master output.
    // Then, connect it to the filter, so that we only hear the filtered sound
  song.disconnect();
  song.connect(filter);

}

function draw() {

  filterFreq = map(mouseX, 0, width, 10, 22050);

  // Map mouseY to resonance (volume boost) at the cutoff frequency
  filterRes = map(mouseY, 0, height, 15, 5);

  // set filter parameters
  filter.set(filterFreq, filterRes);


  let spectrum = fft.analyze();



  loadPixels();

   //var y = floor((pix/4)/width);
   //var x = floor(pix-(y*4));


  //console.log(width);
  //console.log(x);
  //console.log(pixels.length);

  //for ( var p =0; p < speed; p +=4){

//     r = random(r, r+5);
//     g = random(g, g+5);
//     b = random(b, b+5);

//     if (r > 255){r = 0};
//     if (g > 255){g = 0};
//     if (b > 255){b = 0};

    //line(0, y, 85, 75);

    for ( var x =  0; x <width; x++){

      var pixel = (x+y*width)*4;//(x*4)+((width*4)*y);

      var index_s = int(map(x, 0, width, 0, spectrum.length));

      var color = spectrum[index_s]; //map(spectrum[index_s], 0, 255, 255, 0)

      pixels[pixel] = color;
      pixels[pixel+1] = 0;
      pixels[pixel+2] = 0;
      pixels[pixel+3] = 200;

    }


    //}
//     //for (var le = 0; le < Lextension; le++){

//         pixels[pix+p] = r;
//         pixels[pix+p+1] = g;
//         pixels[pix+p+2] = b;
//         pixels[pix+p+3] = 200;
//       //}

    //color(r,g,b); //map(spectrum[p], 0, 255, 255, 0);

  if (y > height){y=0;}else{y += 1;};

  updatePixels();

  fill(0);
  stroke(0);

  rect(width-200, 100,180,100);

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, 180);
    let yy = map( waveform[i], -1, 1, 0, 100);
    vertex((width-200)+x, 100+yy);
  }
  endShape();

  //if (pix > pixels.length){pix=0};

}

// function mousePressed() {
//   if (song.isPlaying()) {
//     // .isPlaying() returns a boolean
//     song.stop();

//   } else {
//     song.play();

//   }
// }

function keyPressed() {
  if (keyCode === 80) {
    if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();

  } else {
    song.play();

  }

  }
}

function handleFile(file) {
  print(file);

  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    song = loadSound(file);
    song.disconnect();
    song.connect(filter);
    song.play();
  } else {
    song = loadSound(file);

    song.disconnect();
    song.connect(filter);
    song.play();

  }

}
