
//   Javascript for 'alanesq.com/links' - 03 nov 19 

//      reference: https://www.w3schools.com/jsref


    let menuWidthOff = "60px";        // width of the side menu when closed (must be same as in css file)
    let menuWidthOn = "200px";        // width of the side menu when open
    
    let getMain = document.querySelector(".iframe"); 
    let getSidebar = document.querySelector(".sidebar"); 
    let getSidebarItems = document.getElementsByClassName("sideItem");
    let moreLinks = document.querySelector(".moreLinks");
    let toggleNavStatus = false;        // Initial status of the toggled side menu (i.e. closed)
    var bannerTimer, bannerActive = 1;  // banner movement variables

    // Open / close the side menu (when button clicked)
    let toggleNav = function() {
        
        // turn off the 'more links' banner
        if ( bannerActive == 1 ) {
            bannerActive = 0;       // Flag banner as no longer active
            // moreLinks.style.opacity = 0.5;
            bannerTimer = window.setInterval( function() { moveBanner() }, 40 );     
        }
        
        
        if (toggleNavStatus === false) {
            // Show the side menu
            getSidebar.style.width = menuWidthOn;                   // set menu bar width
            for (i = 0; i < getSidebarItems.length; i++) {          // make all menu item texts visible
                getSidebarItems[i].style.visibility = "visible";   
            }
            toggleNavStatus = true;
        } else  {
            // Hide the side menu
            getSidebar.style.width = menuWidthOff;                  // set menu bar width
            for (i = 0; i < getSidebarItems.length; i++) {          // make all menu item texts hidden
                getSidebarItems[i].style.visibility = "hidden";   
            }
            toggleNavStatus = false;
        }
                    
    }    // function toggleNav
    

    // move the banner down off the display
    function moveBanner() {
        let currentPos = moreLinks.getBoundingClientRect()["top"];     // current position of banner
        console.log(currentPos);
        if ( currentPos < document.documentElement["clientHeight"]) {
            moreLinks.style.top = (currentPos + 5) + "px";
        } else {
            // finished
            clearInterval(bannerTimer);
            moreLinks.style.visibility = "hidden"; 
        }
    }
    
    
    // Side menu item selection
    let buttonMisc = function() {
        getMain.src="misc.htm";     // change contents of iFrame
        toggleNav();                // close the side menu
    }
 
    let buttonFun = function() {
        getMain.src="fun.htm";
        toggleNav();     
    }
    
    let buttonShopping = function() {
        getMain.src="shopping.htm";
        toggleNav(); 
    }

    let buttonElectronics = function() {
        getMain.src="electronics.htm";
        toggleNav(); 
    }
    
