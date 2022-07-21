
//   Javascript for 'alanesq.com/links' - 07 nov 19 

//      reference: https://www.w3schools.com/jsref


    let menuWidthOff = "60px";        // width of the side menu when closed (must be same as in css file)
    let menuWidthOn = "200px";        // width of the side menu when open
    
    let getMain = document.querySelector(".iframe"); 
    let getSidebar = document.querySelector(".sidebar"); 
    let getSidebarItems = document.getElementsByClassName("sideItem");
    let moreLinks = document.querySelector(".moreLinks");
    let toggleNavStatus = false;                                // Initial status of the toggled side menu (i.e. closed)
    let bannerVis = 0;                                          // banner opacity
    
    moreLinks.style.top = (getSidebar.getBoundingClientRect()["bottom"]) + "px";   // move banner to bottom of screen 

    window.setInterval( function() { moveBanner() }, 40 );      // update the banner position periodically 
        
    // Open / close the side menu (when button clicked)
    let toggleNav = function() {
            
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
    

    
    // update 'links here' banner location (triggered periodically)
    function moveBanner() {
        let currentPos = moreLinks.getBoundingClientRect()["top"];          // current position of banner
        let sideBarTop = getSidebar.getBoundingClientRect()["top"];         // top position of side menu box
        let screenBottom = getSidebar.getBoundingClientRect()["bottom"];    // bottom position of side menu box
        let moveStep=12;                                                    // step size of animation  
        
        // increase visibility a bit 
        if (bannerVis < 1) { bannerVis += 0.02; };
        if (bannerVis > 1) { bannerVis = 1 };
        moreLinks.style.opacity = bannerVis;
        
        // if side menu is closed and banner is not in top position
        if ( (toggleNavStatus === false) && (currentPos > sideBarTop) ) {
            moreLinks.style.top = (currentPos - moveStep) + "px";            
        } else if ( (toggleNavStatus === true) && (currentPos < (screenBottom - 75)) ) {
            moreLinks.style.top = (currentPos + moveStep) + "px";
        }
        
        // correct position if screen size changes
        if (currentPos < sideBarTop) {
            moreLinks.style.top = sideBarTop + "px"; 
        } else if (currentPos > (screenBottom - 75)) {
            moreLinks.style.top = (screenBottom - 75) + "px"; 
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
    
