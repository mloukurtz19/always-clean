window.onload = () => {
    let screenH = window.screen.availHeight;
    let screenW = window.screen.availWidth;

    if(screenW < 768){
        let header = document.getElementsByTagName("header")[0];
        console.log("Header:", header, screenH);
        console.log("Header height:", window.getComputedStyle(header).height);
        let aboutMe = document.getElementById("aboutMe");
        aboutMe.style.height = (screenH - parseFloat(window.getComputedStyle(header).height)) + "px";
        console.log("New height:", (screenH - parseFloat(window.getComputedStyle(header).height)));
    }
    
}