var slideIndex = 0;

carousel();

// Function to control carousel (auto and manual)
function carousel(click = 0) {
    let slides = document.getElementsByClassName("mySlides");

    // Hide all images
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
        slides[i].style.display = "hidden";
    }

    if (click === 0) {
        // Auto mode
        slideIndex++;
        if (slideIndex >= slides.length) { 
            slideIndex = 0; 
        }
    } else if (click === 1) {
        // Forward click
        slideIndex++;
        if (slideIndex >= slides.length) { 
            slideIndex = 0; 
        }
    } else {
        // Backward click
        slideIndex--;
        if (slideIndex < 0) { 
            slideIndex = slides.length - 1; 
        }
    }

    // Show the correct image
    slides[slideIndex].style.display = "block";
    slides[slideIndex].style.opacity = 1;

    // Auto-transition every 3 seconds if not manually clicked
    if (click === 0) {
        setTimeout(carousel, 4000);
    }
}

// function load_images_into_carousel(){
//     var imageCarousel = document.getElementById("imgCarousel");

//     for(var i = 1; i <= 4; i++){
//         console.log("Image:", i);
//         var image = document.createElement("img");
//         image.src = "./pictures/img-carousel/pic" + i + ".jpg";
//         image.className = "mySlides";
//         imageCarousel.appendChild(image);
//     }

//     images_loaded = true;
//     carousel();
// }