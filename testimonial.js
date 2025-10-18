let mouseDown = false;
let startX, scrollLeft;
const slider = document.querySelector('#Testimonials');
const testimonialsSlide = document.querySelector(".testimonial-list");
const nav = document.querySelector(".nav");
const nav_imgs = nav.querySelectorAll("img").length;

let testimonialNmbr = 1;

slider.addEventListener('mousedown', (event) => {
    event.preventDefault();
    mouseDown = true;
    startX = event.pageX;
})

function scrollTestimonial(scrollRight){
    testimonialsSlide.scrollBy(scrollRight ? window.innerWidth : (0 - window.innerWidth), 0);
    testimonialNmbr = scrollRight ? testimonialNmbr + 1 : testimonialNmbr - 1;
    nav.querySelector("img:nth-child("+testimonialNmbr+")").src = "pictures/NavCircle_B.svg";
    nav.querySelector("img:nth-child("+(scrollRight ? testimonialNmbr-1 : testimonialNmbr+1)+")").src = "pictures/NavCircle_W.svg";
}

slider.addEventListener('mouseup', (event) => {
    // slider.scrollLeft = scrollLeft - window.innerWidth;
    event.preventDefault();
    mouseDown = false;
    event.preventDefault();
    if(nav_imgs > 1){
        if((startX - event.pageX) > 0){
            scrollTestimonial(true);
        }else if((startX - event.pageX) < 0){
            scrollTestimonial(false);
        }
    }  
    
})

slider.addEventListener('touchstart', (event) => {
    event.preventDefault();
    startX = event.changedTouches[0].pageX;
})

slider.addEventListener('touchend', (event) => {
    if(nav_imgs > 1){
        if((startX - event.changedTouches[0].pageX) > 0){
            console.log("Moving right");
            scrollTestimonial(true);
        }else if((startX - event.changedTouches[0].pageX) < 0){
            console.log("Moving left");
            scrollTestimonial(false);
        }
    }    
})