/*
  
    display "happy Festivus" banner if it is getting near to Festivus

    alanesq.com - 21jul22
    
*/

// --------------------------- S e t t i n g s -------------------------------


    const BannerWidth = 75;         // Width of banner in percent of display width
    const BannerHeight = 145;       // Height of banner in px
    const iLoc = "https://alanesq.github.io/main/img/festivus.jpg";

    
// ---------------------------------------------------------------------------

    
const today = new Date();       // todays date
let iWidth = 0;     

// check if today is December between 10th and 25th    (Note: months starts at zero)
if (today.getMonth() === 11 && today.getDate() > 9 && today.getDate() < 25) showBanner();


// ---------------------------------------------------------------------------


// Add Festivus banner with link to HTML and start animation
function showBanner() {  
    let theImg = new Image();
    theImg.src = iLoc;
    
    theImg.onload = function () {
        // image successfully loaded 
        let iStyle = "width: 0%; height: " + BannerHeight + "px;";    // css style for image
        document.getElementById('festivusDiv').innerHTML = 
            "<a target='_blank' href='https://en.wikipedia.org/wiki/Festivus'>" + 
            "<center><img id='fImg' style='" + iStyle + "' src='" + iLoc + "'></a></center>";
        window.setTimeout( function() { moveBanner() }, 3000 );     // start animation after a delay
    }
}
    
// Animate the Festivus banner's width
function moveBanner() {
    if ( iWidth < BannerWidth ) {
        iWidth += 5;  
        document.getElementById('fImg').style.width = iWidth + "%";
        window.setTimeout( function() { moveBanner() }, 80 );     // restart procedure after a delay
    }           
}

 
// -------------------------------- e n d ------------------------------------
