
// jscript for the tables pages on alanesq.com/links - 03 nov 19

//      reference: https://www.w3schools.com/jsref



// toggle the style when button pressed (top left of screens)

    var styleSet = "css/tables.css";     // flag default style is set at startup

    if (localStorage.getItem("linkTableStyle") == "alternative") toggleStyle();     // read style prefference from local storage
     
    function toggleStyle() {
        if ( styleSet == "css/tables.css" ) {
            // change to 'tables-alternative.css' style
            document.getElementById('stylesheet').href='css/tables-alternative.css';
            styleSet = "css/tables-alternative.css"; 
            localStorage.setItem("linkTableStyle", "alternative");      // store setting in local storage
        } else {
            // change to default 'tables.css' style
            document.getElementById('stylesheet').href='css/tables.css';
            styleSet = "css/tables.css";   
            localStorage.setItem("linkTableStyle", "standard");         // store setting in local storage
        }
    }
