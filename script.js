var rgb = [];
var kleurmix = [];
let kleur = 0;
let click = 1;
let countX = 0;
let countY = 0;
let buttonclick = 0;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var img = document.getElementById("redblue");
ctx.drawImage(img, 0, 0);
var imgData = ctx.getImageData(0, 0, c.width, c.height);
canvas.width = img.width;
canvas.height = img.height;



function average() {
  for (let i = 0; i < imgData.data.length; i += 4) {
    var valueR = parseInt(imgData.data[i]);
    var valueG = parseInt(imgData.data[i + 1]);
    var valueB = parseInt(imgData.data[i + 2]);
    var valueA = 1; //de waarde van alpha is in de array 255? Deze waarde kan echter niet hoger zijn dan 1 en er zit geen transparantie in de foto
    rgb[kleur] = [valueR, valueG, valueB, valueA];
    kleur++;
  }


  let one = rgb.splice(0, Math.ceil(rgb.length / 2));


  while (rgb.length > click) {
    kleur = 0;

    for (let i = 0; i < click; i += 2) {

      var base = rgb[kleur];
      var added = rgb[kleur + 1];

      var mix = [];

      mix[3] = 1 - (1 - added[3]) * (1 - base[3]);
      mix[0] = Math.round((added[0] * added[3] / mix[3]) + (base[0] * base[3] * (1 - added[3]) / mix[3]));
      mix[1] = Math.round((added[1] * added[3] / mix[3]) + (base[1] * base[3] * (1 - added[3]) / mix[3]));
      mix[2] = Math.round((added[2] * added[3] / mix[3]) + (base[2] * base[3] * (1 - added[3]) / mix[3]));

      kleurmix[kleur] = mix;
      kleur++;
    }
    rgb = kleurmix;

    kleurmix = [];

  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < rgb.length; i++) {

    var Color = "rgb" + "(" + rgb[i].toString() + ")";
    ctx.fillStyle = Color;

    var pixelsize = (canvas.width * canvas.height) / click;


    if (countX < canvas.width) {
      ctx.fillRect(countX, countY, pixelsize, pixelsize);
      countX = countX + pixelsize;
    }
    else {
      ctx.fillRect(countX, countY, pixelsize, pixelsize);
      countY = countY + pixelsize;
      countX = 0;
    }

  }

  console.log(pixelsize);
  console.log(rgb.length);
  countX = 0;
  countY = 0;
  click += 1000;
  kleur = 0;

}

// ctx.putImageData(rgb[0], 0, 0);     console.log(rgb[0]); //RGBA staat in 1 array //
