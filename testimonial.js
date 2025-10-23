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
    if(scrollRight && (testimonialNmbr + 1) <= nav_imgs){
        testimonialNmbr += 1;
    }else if(!scrollRight && (testimonialNmbr - 1) >= 1){
        testimonialNmbr -= 1;
    }
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
    console.log("TOUCH");
    startX = event.changedTouches[0].pageX;
})

slider.addEventListener('touchend', (event) => {
    console.log("STOP TOUCH");
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

for(let i = 1; i <= nav_imgs; i++){
    let one_nav_img = nav.querySelector("img:nth-child("+i+")");

    one_nav_img.addEventListener("click", (event) => {
        console.log("Clicked one nav img", i, testimonialNmbr, one_nav_img.src);
        if(one_nav_img.src.toString().endsWith("pictures/NavCircle_W.svg")){
            console.log("WHITE");
            if(testimonialNmbr < i){
                let go_right_times = i - testimonialNmbr;
                console.log("Scroll", go_right_times + "x to the right");
                for(let j = 0; j < go_right_times; j++){
                    scrollTestimonial(true);
                }
            }else{
                let go_left_times = testimonialNmbr - i;
                console.log("Scroll", go_left_times + "x to the left");
                for(let j = 0; j < go_left_times; j++){
                    scrollTestimonial(false);
                }
            }
        }
    })
}