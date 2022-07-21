
// Shows banner if the image file exists - 21Jul22



let fName = "https://alanesq.github.io/main/banner.gif";



let theImg = new Image();
theImg.src = fName;


theImg.onload = function () {
    // successfully loaded so do something here.
    document.getElementById('bannerDiv').innerHTML = 
        "<a target='_blank' href='https://alanesq.github.io/main/banner.htm'>" + 
        "<img width='100%' src='" + fName + "'></a>";
}

theImg.onerror = function () {
    // error loading so do something else here.
    
}

