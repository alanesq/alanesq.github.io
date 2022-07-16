/*
   Display morse code via bunny image - 16Jul22
 
        Basic morse code javascript from: https://www.tutorialspoint.com/converting-string-to-morse-code-in-javascript
        images and idea from: https://www.youtube.com/user/bixanorak/about
 
*/


//   -------------- Global variables -----------------


  let message = "";              // message to send
  
  let position = -1;             // current position in message (0 = no message yet)
  
  let state = 0;                 // current morse state
                                 // 0 = none, 1 = dot, 2 = dash
                                 
  let nextEvent = 0;             // time next event is scheduled
  
  let currentTime;               // current time
  
  // image size
  let iw = 360
  let ih = 240
  
  // timings
  let mcdot = 150;
  let mcdash = 300;
  let mcgap = 250
  let mcspace = 350;
  
  
//   ------------------- morse code ------------------


const morseCode = {
   "A": ".-",
   "B": "-...",
   "C": "-.-.",
   "D": "-..",
   "E": ".",
   "F": "..-.",
   "G": "--.",
   "H": "....",
   "I": "..",
   "J": ".---",
   "K": "-.-",
   "L": ".-..",
   "M": "--",
   "N": "-.",
   "O": "---",
   "P": ".--.",
   "Q": "--.-",
   "R": ".-.",
   "S": "...",
   "T": "-",
   "U": "..-",
   "W": ".--",
   "X": "-..-",
   "Y": "-.--",
   "Z": "--.."
}

const convertToMorse = (str) => {
   return str.toUpperCase().split("").map(el => {
      return morseCode[el] ? morseCode[el] : el;
   }).join(" ");
};


// ------------- called when message is entered ----------


function textEntered() {
  message = convertToMorse(document.getElementById("MCmessage").value);
  document.getElementById("output").innerHTML = message;
  position = 0;
}


//   ------------------------------------------------------


function preload() {
  // images
  bunnya = loadImage("./bunnya.jpg");
  bunnyb = loadImage("./bunnyb.jpg");
  bunnyc = loadImage("./bunnyc.jpg");
  
}


//   ------------------------------------------------------


function setup() {
  let cnv = createCanvas(iw, ih);
  pixelDensity(1);            // in case of a high density display

}


// ------------------------------------------------------

  
function draw() {
  clear();
  //background(0);
  
  // check if morse state should reset
  currentTime = millis();   // current time
  if (currentTime > nextEvent) {
    
    if (state != 0) {
      state = 0;
      nextEvent = currentTime + mcgap;   
      //console.log("delay");
    } 
    else {
    
      // next char
      if (position > -1) {
        
        let char = message.charAt(position);
        //console.log(char);
        if (char == ".") {                     // dot
          //console.log("dot");
          state=1;
          nextEvent = currentTime + mcdot;
          dotsound.play();
        }
        else if (char == "-") {                // dash
          //console.log("dash");
          state=2;
          nextEvent = currentTime + mcdash;
          dashsound.play();
        }
        else  {                                // delay
          //console.log("space");
          state=0;
          nextEvent = currentTime + mcspace;
        }    
        
        position++;
        if (position > message.length) position=0;        
      }
    }
  
  }
  
  // draw bunny
  if (state == 0 && position > -1) image(bunnya, 0, 0, iw, ih);
  else if (state == 1) image(bunnyb, 0, 0, iw, ih);
  else if (state == 2) image(bunnyc, 0, 0, iw, ih);  
    
  //noLoop();
}


// ---------------------- end ---------------------------
