
// Shows banner if the image file exists - Dec 19



let fName = "http://www.alanesq.eu5.net/banner.gif";



let theImg = new Image();
theImg.src = fName;


theImg.onload = function () {
    // successfully loaded so do something here.
    document.getElementById('bannerDiv').innerHTML = 
        "<a target='_blank' href='http://www.alanesq.com/banner.htm'>" + 
        "<img width='100%' src='" + fName + "'></a>";
}

theImg.onerror = function () {
    // error loading so do something else here.
    
}

