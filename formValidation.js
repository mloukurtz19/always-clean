const quoteForm = document.getElementById("FormA");
const submitButton = document.getElementById("submit-button");

const full_name = document.getElementById("full_name");
const email = document.getElementById("email");
const preferred_date = document.getElementById("preferred_date");
const preferred_time = document.getElementById("preferred_time");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const additional_details = document.getElementById("additional_details");

function userValidation(input, inputName, regex){
    input.addEventListener("keyup", () => {
        const label = document.querySelector("label[for='"+inputName+"']");
        const error_span = label.querySelector(".invalid");
    
        if(!input.value.match(regex)){
            error_span.classList.add("error");
            input.classList.add("error");
        }else{
            error_span.classList.remove("error");
            input.classList.remove("error");
        }
    })
}

userValidation(full_name, "full_name", /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/gm);
userValidation(email, "email", /^[^@ ]+@[^@ ]+\.[^@ ]+$/gm);
userValidation(address, "address", /^[a-zA-Z0-9\s.,!?'"()\-]{1,500}$/gm);
userValidation(phone, "phone", /^(\d{1,12})?$/gm);

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const year = tomorrow.getFullYear();
const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const day = String(tomorrow.getDate()).padStart(2, '0');
const minDate = `${year}-${month}-${day}`;

preferred_date.setAttribute('min', minDate);

function onSubmit(token){
    // event.preventDefault();
    console.log("Form Submission");

    if(full_name.value.match(/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/gm) &&
        email.value.match(/^[^@ ]+@[^@ ]+\.[^@ ]+$/gm) &&
        address.value.match(/^[a-zA-Z0-9\s.,!?'"()\-]{1,500}$/gm) &&
        phone.value.match(/^(\d{1,12})?$/gm)){
        
        if(!(full_name.value.trim().length == 0 || email.value.trim().length == 0 ||
            preferred_date.value.trim().length == 0 || preferred_time.value.trim().length == 0 ||
            address.value.trim().length == 0)){

                console.log("Valid Form Contents");
                quoteForm.submit();               
        }else{
            alert("Please ensure all required fields are filled.");
        }
    }else{
        alert("Please address any invalid fields and ensure required fields are filled.");
    }

    console.log(
        " Name", full_name.value + "\n",
        "Email", email.value + "\n",
        "Date", preferred_date.value + "\n",
        "Time", preferred_time.value + "\n",
        "Address", address.value + "\n",
        "Phone", phone.value + "\n",
        "Additional Details", additional_details.value + "\n"
    );

}

function goToQuote(){
    let quoteSection = document.getElementById("Form");
    quoteSection.scrollIntoView();
}