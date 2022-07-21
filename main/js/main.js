

//    Javascript for "/main.htm" of alanesq.com - 31 Oct 19

 
        
    
// Move the image around the screen

    const aSpeed = 30;                                // speed of motion

    const pictureStep = 5;                            // motion step size 

    const yDist = 40;                                 // distance picture will move up and down

    const yOffset = 60;                               // offset from top of screen

    let pictureXposition = 0;                         // current image location
    let pictureYposition = 0;                      
    let pictureXStep = pictureStep;                   // current image step size (negative reverses direction)
    let pictureYStep = pictureStep / 4; 

    const getPosition = document.getElementById("alan");

    let id = window.setInterval( function() { moveImage() }, aSpeed );      // run the moveImage procedure repeatedly

    // Move the image one step
    function moveImage() {
        pictureXposition += pictureXStep;
        pictureYposition += pictureYStep;
        
        // if exceeded max distance reverse direction
        if ( pictureYposition > yDist || pictureYposition < -yDist )  {pictureYStep = -pictureYStep;}; 
        if ( pictureXposition > window.innerWidth || pictureXposition < -200) {pictureXStep = -pictureXStep;} 
        
        // update picture position on screen
        getPosition.style.left = pictureXposition + "px";
        getPosition.style.top = (pictureYposition + yOffset) + "px";
    }


function windowResized() {                // if the screen is resised
    //console.log("Resize!!!");
    pictureXposition = -200;
}


// Using an event listener to check if image is clicked 
    document.getElementById("alan").addEventListener("click", () => {
        // toggle the image movement on/off
        if ( id != 0 ) {                    // if animation is active
            // stop animation
            clearInterval(id);              // stop procedure repeating
            id = 0;                         //  flag as stopped
        }
        else { 
            // start animation
            id = window.setInterval( function() { moveImage() }, aSpeed );      // run the moveImage function repeatedly
        }
    });



// end
