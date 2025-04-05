fetch("content.xml")
    .then(response => response.text())
    .then(text => (new window.DOMParser()).parseFromString(text, "text/xml"))
    .then(data => {
        const header = data.getElementsByTagName("header")[0];
        const about_section = data.getElementsByTagName("about-section")[0];
        const quote_section = data.getElementsByTagName("quote-section")[0];
        const image_section = data.getElementsByTagName("image-section")[0];
        const contactMe_section = data.getElementsByTagName("contact-me-section")[0];

        // Header section
        const header_html_element = document.getElementsByTagName("header")[0];
        var header_img = header_html_element.getElementsByTagName("img")[0];
        var header_title = header_html_element.getElementsByTagName("h1")[0];

        var content_header_picture = header.getElementsByTagName("image")[0].innerHTML;
        var content_header_title = header.getElementsByTagName("title")[0].innerHTML;

        if(content_header_picture.length > 0){
            header_img.src = "./pictures/" + content_header_picture;
        }

        if(content_header_title.length > 0){
            header_title.innerHTML = content_header_title;
        }        

        // About Me section
        const aboutMe_html_element = document.getElementsByClassName("about-me")[0];
        var aboutMe_title = aboutMe_html_element.getElementsByTagName("h2")[0];
        var aboutMe_content = aboutMe_html_element.getElementsByClassName("content")[0];
        var aboutMe_img = aboutMe_html_element.getElementsByTagName("img")[0];

        var content_aboutMe_title = about_section.getElementsByTagName("title")[0].innerHTML;
        var content_aboutMe_content = about_section.getElementsByTagName("text")[0].innerHTML;
        var content_aboutMe_img = about_section.getElementsByTagName("image")[0].innerHTML;

        if(content_aboutMe_title.length > 0){
            aboutMe_title.innerHTML = content_aboutMe_title;
        }else{
            aboutMe_title.innerHTML = "A Clean Home = A Happy Home";
        }

        if(content_aboutMe_content.length > 0){
            aboutMe_content.append(content_aboutMe_content);
        }else{
            aboutMe_content.append("I want you to notice the difference in your home. Great cleaning creates an inviting home you can be proud of! I believe details, honesty, and precision make the difference. Balancing work, school, and life is difficult already and cleaning becomes a hassle. I am here to relieve you of that difficulty freeing you up to enjoy life!");
        }

        if(content_aboutMe_img.length > 0){
            aboutMe_img.src = "./pictures/" + content_aboutMe_img;
        }

        // Quote Section
        const form_html_element = document.getElementById("form-embed");
        var content_form = quote_section.getElementsByTagName("google-form")[0].innerHTML;

        if(content_form.length > 0){
            form_html_element.innerHTML = content_form;
        }

        // Image Carousel
        const carousel_html_element = document.getElementById("imgCarousel");
        const carousel_images = image_section.getElementsByTagName("image");

        for(var i = 0; i < carousel_images.length; i++){
            var new_img = document.createElement("img");
            new_img.className = "mySlides";
            new_img.src = "./pictures/img-carousel/" + carousel_images[i].innerHTML;

            carousel_html_element.appendChild(new_img);
        }

        // Contact Me Section
        const contactMe_html_element = document.getElementsByClassName("contact-me")[0];
        var contactMe_logo = contactMe_html_element.getElementsByClassName("logo")[0];
        contactMe_logo = contactMe_logo.getElementsByTagName("img")[0];
        var email_phone = contactMe_html_element.getElementsByClassName("email-phone")[0];
        var contactMe_email = email_phone.getElementsByTagName("div")[0];
        var contactMe_phone = email_phone.getElementsByTagName("div")[1];
        var contactMe_socialMedia = contactMe_html_element.getElementsByClassName("social-media")[0];

        const social_media_infos = contactMe_section.getElementsByTagName("social-media");

        var content_logo = contactMe_section.getElementsByTagName("image")[0].innerHTML;
        var content_email = contactMe_section.getElementsByTagName("email")[0].innerHTML;
        var content_phone = contactMe_section.getElementsByTagName("phone")[0].innerHTML;

        if(content_logo.length > 0){
            contactMe_logo.src = "./pictures/" + content_logo;
        }

        if(content_email.length > 0){
            contactMe_email.innerHTML = "Email: " + content_email;
        }

        if(content_phone.length > 0){
            contactMe_phone.innerHTML = "Phone: " + content_phone;
        }

        for(var i = 0; i < social_media_infos.length; i++){
            var social_media_element = document.createElement("a");
            social_media_element.href = social_media_infos[i].getElementsByTagName("link")[0].innerHTML;
            social_media_element.target = "_blank";

            var social_media_img = document.createElement("img");
            social_media_img.src = "./pictures/" + social_media_infos[i].getElementsByTagName("image")[0].innerHTML;

            social_media_element.appendChild(social_media_img);
            social_media_element.append(social_media_infos[i].getElementsByTagName("handler")[0].innerHTML);

            contactMe_socialMedia.appendChild(social_media_element);
        }

    })
    .catch(err => console.log("Error:", err));