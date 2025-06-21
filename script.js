var slideIndex = 0;
let formObject = {};
let chosenPackage;

window.onload = () => {
    carousel();
}

// carousel();

// Function to control carousel (auto and manual)
function carousel(click = 0) {
    console.log("Carousel called");
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

function ensureValidity(checkboxChoices){
    if(checkboxChoices.length === 0){
        alert("You have not selected anything for the Create Your Own! package.\n\nPlease choose something to proceed.");
    }else{
        formContinuation(2, checkboxChoices);
    }
}

function checkboxesChosen(name) {
    let checkboxes = document.getElementsByName(name);
    let results = [];
    checkboxes.forEach((checkbox) => {
        if(checkbox.checked){
            results.push(checkbox.value);
        }
    })

    return results;
}

function formValidity(formDetails){
    let valid = true;

    console.log("Why?", formObject);

    Object.keys(formDetails).forEach((key) => {
        if(key != "phoneNmbr" && key != "comments"){
            if(formDetails[key].length <= 0){
                valid = false;
            }
        }
    });

    Object.keys(formObject).forEach((key) => {
        if(!formObject[key]){
            valid = false;
        }
    });

    return valid;
}


function formContinuation(step, packageSelected="", previous = false){
    let step1 = document.getElementsByClassName("step1");
    let step2 = document.getElementsByClassName("step2");
    let step3 = document.getElementsByClassName("step3");

    console.log("Previous?", previous);

    if(step === 1){
        step1[0].style.display = "block";
        step2[0].style.display = "none";
        step3[0].style.display = "none";

    }else if(step === 2){
        console.log("Proceeding to step2");
        console.log("Selected package:", packageSelected);
        step1[0].style.display = "none";
        step2[0].style.display = "block";
        step3[0].style.display = "none";
        if(!previous){
            console.log("Package Pending:", packageSelected);
            document.getElementsByName("packageChosen")[0].value = packageSelected;
        }
    }else if(step === 3){
        let formDetails = setReviewDetails();
        formValid = formValidity(formDetails);
        // formValid = true;
        if(formValid){
            console.log("proceeding to step3");
            console.log("Form Info:", formDetails);
            
            step2[0].style.display = "none";
            step3[0].style.display = "block";

            let packages = formDetails.packageChosen.split(",");
            let packageNumber = packages.length;
            let packageDiv = document.createElement("div");
            packageDiv.className = "multiList";

            document.getElementById("packageSelected").innerHTML = "";

            if(packageNumber === 1){
                packageDiv.innerHTML = packages[0];
            }else{
                let index = 0;
                for(let i = 0; i < 2; i++){
                    let unorderedList = document.createElement("ul");
                    let endIndex = i === 0 ? Math.ceil(packageNumber/2) : packageNumber;
                    for(index; index < endIndex; index++){
                        let packageComponent = document.createElement("li");
                        packageComponent.textContent = packages[index];
                        unorderedList.appendChild(packageComponent);
                    }
                    packageDiv.appendChild(unorderedList);
                }
            }
            

            if(packages[0] != "Deep Clean" && packages[0] != "Basic Clean"){
                let title = document.createElement("p");
                title.innerHTML = "Create Your Own!";
                document.getElementById("packageSelected").appendChild(title);
            }
            
            document.getElementById("packageSelected").appendChild(packageDiv);
            // document.getElementById("packageSelected").innerHTML = formDetails.packageChosen;

            document.getElementById("email").innerHTML = formDetails.email;
            document.getElementById("firstName").innerHTML = formDetails.fName;
            document.getElementById("lastName").innerHTML = formDetails.lName;
            let formattedDate = new Date((formDetails.cleaningDate+"T00:00:00"));
            formattedDate = formattedDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            document.getElementById("cleaningDay").innerHTML = formattedDate;
            document.getElementById("cleaningTime").innerHTML = formatTimeTo12Hour(formDetails.cleaningTime);
            document.getElementById("address").innerHTML = formDetails.address;
            document.getElementById("bedroomQty").innerHTML = formDetails.bedroomQty;
            document.getElementById("bathroomQty").innerHTML = formDetails.bathroomQty;
            document.getElementById("phoneNmbr").innerHTML = formDetails.phoneNmbr;
            document.getElementById("comments").innerHTML = formDetails.comments;
        }else{
            alert("Please ensure all information has been entered correctly.");
        }
    }
}

function formatTimeTo12Hour(timeString) {
    const [hour, minute] = timeString.split(":").map(Number);
  
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  
    return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
  }

function setReviewDetails(){
    let form = document.forms[0];
    console.log("Form:", form);

    let formInfo = {
        packageChosen: form.elements["packageChosen"].value,
        email: form.elements["email"].value,
        fName: form.elements["firstName"].value,
        lName: form.elements["lastName"].value,
        cleaningDate: form.elements["cleaningDate"].value,
        cleaningTime: form.elements["cleaningTime"].value,
        address: form.elements["address"].value,
        bedroomQty: form.elements["bedroomQuantity"].value,
        bathroomQty: form.elements["bathroomQuantity"].value,
        phoneNmbr: form.elements["phoneNmbr"].value,
        comments: form.elements["comments"].value
    }

    return formInfo;
}


function userValidationInstruction(inputId, formId, regex){
    let emailInput = document.getElementById(inputId);

    emailInput.addEventListener("change", (event) => {
        const newValue = event.target.value;

        if(!newValue.match(regex) && newValue != ""){
            document.getElementById(formId).getElementsByClassName("errorMessage")[0].style.display = "block";
            document.getElementById(formId).className = "error";
            formObject[formId] = false;
        }else{
            document.getElementById(formId).getElementsByClassName("errorMessage")[0].style.display = "none";
            document.getElementById(formId).className = "";
            formObject[formId] = true;
        }
    });
}

// Email
userValidationInstruction("email_Input", "emailForm", /^[^@ ]+@[^@ ]+\.[^@ ]+$/gm);
// First Name
userValidationInstruction("firstName_Input", "firstNameForm", /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/gm);
// Last Name
userValidationInstruction("lastName_Input", "lastNameForm", /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/gm);

// Day (not worrying about time)
let day = document.getElementById("cleaningDate_Input");

day.addEventListener("change", (event) => {
    const newValue = event.target.value;
    const date = new Date(newValue);
    console.log("Val:", newValue);
    if(date <= new Date()){
        document.getElementById("cleaningDayForm").getElementsByClassName("errorMessage")[0].style.display = "block";
        document.getElementById("cleaningDayForm").className = "error";
        formObject["cleaningDayForm"] = false;
    }else{
        document.getElementById("cleaningDayForm").getElementsByClassName("errorMessage")[0].style.display = "none";
        document.getElementById("cleaningDayForm").className = "";
        formObject["cleaningDayForm"] = true;
    }
    console.log("Day:", new Date(newValue).getUTCDate(), new Date().getUTCDate());
});

// Bedroom Qty.
let bedroomNmbr = document.getElementById("bedroomQuantity_Input");

bedroomNmbr.addEventListener("change", (event) => {
    const newValue = event.target.value;

    if(Number(newValue) < 0){
        document.getElementById("bedroomQtyForm").getElementsByClassName("errorMessage")[0].style.display = "block";
        document.getElementById("bedroomQtyForm").className = "error";
        formObject["bedroomQtyForm"] = false;
    }else{
        document.getElementById("bedroomQtyForm").getElementsByClassName("errorMessage")[0].style.display = "none";
        document.getElementById("bedroomQtyForm").className = "";
        formObject["bedroomQtyForm"] = true;
    }
});

// Bathroom Qty.
let bathroomNmbr = document.getElementById("bathroomQuantity_Input");

bathroomNmbr.addEventListener("change", (event) => {
    const newValue = event.target.value;

    if(Number(newValue) < 0){
        document.getElementById("bathroomQtyForm").getElementsByClassName("errorMessage")[0].style.display = "block";
        document.getElementById("bathroomQtyForm").className = "error";
        formObject["bathroomQtyForm"] = false;
    }else{
        document.getElementById("bathroomQtyForm").getElementsByClassName("errorMessage")[0].style.display = "none";
        document.getElementById("bathroomQtyForm").className = "";
        formObject["bathroomQtyForm"] = true;
    }
});

// Phone Nmbr
let phoneNmbr = document.getElementById("phoneNmbr_Input");

phoneNmbr.addEventListener("change", (event) => {
    const newValue = event.target.value;
    console.log("Length:", newValue.length);

    if((newValue.length < 10 || newValue.length > 12) && newValue.length != 0){
        document.getElementById("phoneNumberForm").getElementsByClassName("errorMessage")[0].style.display = "block";
        document.getElementById("phoneNumberForm").className = "error";
        formObject["phoneNumberForm"] = false;
    }else{
        document.getElementById("phoneNumberForm").getElementsByClassName("errorMessage")[0].style.display = "none";
        document.getElementById("phoneNumberForm").className = "";
        formObject["phoneNumberForm"] = true;
    }
});

// Address: /^\d+\s+[A-Za-z\s]+\.?,\s+[A-Za-z\s]+\.?,\s+[A-Za-z\s]+\.?\s+\d{5}$/gm
userValidationInstruction("address_Input", "addressForm", /^[a-zA-Z0-9\s.,!?'"()\-]{1,500}$/gm);
// Comments
userValidationInstruction("comments_Input", "commentsForm", /^[a-zA-Z0-9\s.,!?'"()\-]{1,500}$/gm);


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