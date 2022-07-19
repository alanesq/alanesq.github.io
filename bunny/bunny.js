/*
   Display morse code via bunny image - 17Jul22
 
        Basic morse code javascript from: https://www.tutorialspoint.com/converting-string-to-morse-code-in-javascript
        images and idea from: https://www.youtube.com/user/bixanorak/about
 
*/


//   -------------- Global variables -----------------


  let message = "";              // message to send
  
  let position = -1;             // current position in message (-1 = no message yet)
  
  let state = 0;                 // current state of morse code display
                                 // 0 = none, 1 = dot, 2 = dash
                                 
  let nextEvent = 0;             // time next event is scheduled
  
  let currentTime;               // store for current millis
  
  // image size based on screen size
  let tsize = Math.min(screen.height, screen.width) - 350;
  if (tsize < 320) tsize=320;
  let iw = tsize;
  let ih = tsize;
  
  // morse code timings
  let mcdot = 180;       // dot 
  let mcdash = 300;      // dash
  let mcgap = 250        // delay between sounds
  let mcspace = 350;     // space 
  
  
//   ------------------- morse code ------------------
//   from: https://www.tutorialspoint.com/converting-string-to-morse-code-in-javascript


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
   "Z": "--..",
   "0": "-----",
   "1": ".----",
   "2": "..---",
   "3": "...--",
   "4": "....-",
   "5": ".....",
   "6": "-....",
   "7": "--...",
   "8": "---..",
   "9": "----."
}

const convertToMorse = (str) => {
   return str.toUpperCase().split("").map(el => {
      return morseCode[el] ? morseCode[el] : el;
   }).join(" ");
};


// ------------ called when a message is entered ---------


function textEntered() {
  message = convertToMorse(document.getElementById("MCmessage").value);
  document.getElementById("output").innerHTML = message;
  position = 0;
}


//   --------------------- preloads -----------------------


function preload() {
  // images
  bunnya = loadImage("./bunnya.jpg");
  bunnyb = loadImage("./bunnyb.jpg");
  bunnyc = loadImage("./bunnyc.jpg");
  
}


//   ----------------------- setup ------------------------


function setup() {
  let cnv = createCanvas(iw, ih);
  pixelDensity(1);            // in case of a high density display

}


// ------------------------ draw ------------------------

  
function draw() {
  clear();
  //background(0);
  
  // check if time delay has expired
  currentTime = millis();   // current time
  if (currentTime > nextEvent) {
    
    if (state != 0) {    // if a dot or dash is ending leave a delay before next one 
      state = 0;
      nextEvent = currentTime + mcgap;   
    } 
    else {
    
      // step through the morse code
      if (position > -1) {          // -1 = message has not been entered yet
        
        // show position in morse code above the image
        let ttext = "";
        if (position > 0) ttext = message.substring(0, position);
        ttext+="<u>" + message.charAt(position) + "</u>";
        ttext+=message.substring(position + 1, 999);
        document.getElementById("output").innerHTML = ttext;
        
        // find next part of morse code
        let char = message.charAt(position);
        if (char == ".") {                     // dot
          state=1;
          nextEvent = currentTime + mcdot;
          dotsound.play();
        }
        else if (char == "-") {                // dash
          state=2;
          nextEvent = currentTime + mcdash;
          dashsound.play();
        }
        else  {                                // space
          nextEvent = currentTime + mcspace;
        }    
        
        position++;
        if (position > message.length) position=0;  // back to start
      }
    } 
  
  }
  
  // show the bunny
  if (position > -1) {
    if (state == 0) image(bunnya, 0, 0, iw, ih);                    // bunny at rest
    else if (state == 1) image(bunnyb, 0, 0, iw, ih);               // bunny ear down
    else if (state == 2) image(bunnyc, 0, 0, iw, ih);               // bunny other ear down  
  }

}


// ---------------------- end ---------------------------
