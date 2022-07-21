/*
   Display animated text - 10 Dec 19
   
   include following in html:    
            <script language="javascript" type="text/javascript" src="http://www.alanesq.eu5.net/js/p5.min.js"></script>
            <script language="javascript" type="text/javascript" src="js/animtext.js"></script>
            
            <center><div id="animtext"></div></center>


    based on code by Daniel Shiffman
    Video: https://www.youtube.com/watch?v=4hA7G3gup-4
    
*/


// declare global variables
let lines = [];
let font, vImage;
let vehicles = [];
let points = [];
let maxX=0, maxY=0, minX=Infinity , minY=Infinity;
let lPad, radii;


//   ----------------- s e t t i n g s --------------------


// text to display - format = 'lines.push("This is a message");'
    lines.push("Welcome to");
    lines.push("alanesq.eu5.net");
    
let tcol = [255,0,0];                       // text colour (red overwritten if shimmer is enabled)
const lSpace = 65;                          // line spacing (default = 65)
const shimmer = true;                       // shimmering text effect enabled (true/false)
const textFont = 'js/1CamBam_Stick_2.ttf'   // font to use
const bHeight = 0.7;                        // height of available display used (0 to 1)
// const vehicleImage = 'blank.png';        // image for vehicles (if using image rather than dot)


//   ------------------------------------------------------


function preload() {
  font = loadFont(textFont);
  // vImage = loadImage(vehicleImage);      // if using image rather than dot
}


function setup() {
    
  pixelDensity(1);            // in case of a high density display
  //frameRate = 10;
  let cnv = createCanvas(windowWidth, windowHeight * bHeight);
  cnv.parent('animtext');     // put canvas inside html div with ID 'anitext'
  
  // adjust border and dot size depending on display size (range approx. 300 to 2000 horizontal?)
  lPad = windowWidth / 25;              // padding around whole text block
  radii = 9 * (windowHeight / 500);     // size of dots

  // find all the x,y points on the text
  for (let [index, i] of lines.entries()) {     // step through each line of text
    let qpoints=font.textToPoints(i, 0, (index * lSpace), 60, { 
        sampleFactor: 0.25
    });
    
    // add the points of this line of text to the others
    for (let j of qpoints) {
        points.push(j);   
        
        // find min and max values of x,y
        if (j.x > maxX) maxX = j.x;  
        if (j.y > maxY) maxY = j.y;
        if (j.x < minX) minX = j.x;  
        if (j.y < minY) minY = j.y;
    }
  }

    /* alternative way to find max values
    maxX = points.reduce( (max, val) => {
        if (val.x > max) return val.x;
        else return max;
    }, 0);
    */


  // create a new vehicle for each point in the complete list of points
  for (let i of points) {
    // map to display resolution with border
        xMap = map(i.x, minX, maxX, lPad, windowWidth - lPad);
        yMap = map(i.y, minY, maxY, lPad, (windowHeight * bHeight) - lPad);
    let vehicle = new Vehicle(xMap, yMap);
    vehicles.push(vehicle);
  }
   
}


// ------------------------------------------------------


function draw() {
    
  clear();
  //background(51);
  
  for (let i of vehicles) {         // step through all the vehicles
    i.behaviors();
    i.update();
    if (shimmer === true) tcol[0]=random(200,255);    // create shimmer effect if enabled
    i.show(tcol,radii);
  }
}


// ------------------------------------------------------


class Vehicle {
    
    constructor(x, y) {
        this.pos = createVector( random(windowWidth, windowWidth * 4),random(0, windowHeight) );
        this.target = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        //this.r = windowWidth / 110;
        this.maxspeed = 10;
        this.maxforce = 1;
    }

    behaviors() {
        let arrive = this.arrive(this.target);
        let mouse = createVector(mouseX, mouseY);
        let flee = this.flee(mouse);

        arrive.mult(1);
        flee.mult(5);

        this.applyForce(arrive);
        this.applyForce(flee);
    }

    applyForce(f) {
        this.acc.add(f);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    show(tcol,r) {      // colour, radius
        strokeWeight(r);
        stroke(tcol);
        point(this.pos.x, this.pos.y);
        // image(vImage, this.pos.x, this.pos.y, r, r);        
    }


    arrive(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();
        let speed = this.maxspeed;
        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxspeed);
        }
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
    }

    flee(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();
        if (d < 25) {
            desired.setMag(this.maxspeed);
            desired.mult(-1);
            let steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

}  


// ---------------------- end ---------------------------
