const modal = document.getElementById("Popup");
const modal_button = document.getElementById("closePopup");
const services = document.querySelectorAll(".service");

modal_button.addEventListener("click", () => {
    modal.style.display = "none";
})

window.onclick = (event) => {
    if(event.target == modal){
        modal.style.display = "none";
    }
}

services.forEach(service => {
    service.addEventListener("click", (event) => {
        console.log("Service:", service.dataset.service);
        console.log("Service:", service.innerHTML);

        if(window.innerWidth <= 768){
            modal.style.display = "flex";
            document.getElementById("popupContent").innerHTML = "<div class='service'>" + service.innerHTML + "</div>";
        }        
    })
});
