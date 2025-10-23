fetch("data.json")
.then(res => res.json())
.then((contents) => {
    let data = JSON.parse(contents["data"]);
    let general = {};

    if(data["General"] != undefined){
        data["General"].forEach(general_info => {
            general[general_info["Element"]] = general_info["Text"];
        });
    }

    // First & Second Pictures (About-Me & Display Pics)
    if(general["First Picture"] != undefined){
        document.getElementById("FirstPicture").src = general["First Picture"];
    }

    if(general["Second Pictrue"] != undefined){
        document.getElementById("SecondPicture").src = general["Second Picture"];
    }

    // Logo & Title
    if(general["Logo"] != undefined){
        document.getElementById("Official_Logo_A").href = general["Logo"];
        document.getElementById("Official_Logo_B").src = general["Logo"];
        document.getElementById("Official_Logo_C").src = general["Logo"];
    }

    if(general["Title"] != undefined){
        document.getElementById("Official_Title_A").innerText = general["Title"];
        document.getElementById("Official_Title_B").innerText = general["Title"];
    }

    // About Me
    let aboutMe_title = data["About-Me"][0]["Title"];
    let aboutMe_content = data["About-Me"][0]["Content"];
    
    const aboutMe_element = document.getElementsByClassName("about-me")[0];
    const aboutMe_title_element = aboutMe_element.getElementsByTagName("h2")[0];
    const aboutMe_content_element = aboutMe_element.getElementsByClassName("content")[0];

    aboutMe_title_element.innerText = aboutMe_title_element.length > 0 ? aboutMe_title : "A Clean Home = A Happy Home";
    aboutMe_content_element.innerText = aboutMe_content_element.length > 0 ? aboutMe_content : "Feel the difference a truly clean home makes. A spotless, welcoming space you can be proud of — without the stress. I focus on the details, work with honesty and precision, and take cleaning off your plate so you can focus on what matters most: living your life.";

    // First Button
    if(general["First Button"] != undefined){
        aboutMe_element.querySelector("button").innerText = general["First Button"];
    }

    // Testimonials
    let testimonials_quotes = [];
    let testimonials_authors = [];

    data["Testimonials"].forEach(testimony => {
        testimonials_quotes.push(testimony["Content"]);
        testimonials_authors.push(testimony["Name (optional)"]);
    });

    function createTestimonial(quote, quote_provider){
        const testimonials_section = document.getElementById("Testimonials");
        const testimonials_list = testimonials_section.querySelector(".testimonial-list");

        let testimony = document.createElement("div");
        testimony.className = "testimony";

        // Content (Quote)
        let content = document.createElement("div");
        let leftQuote = document.createElement("div");
        let testimony_section = document.createElement("div");
        let rightQuote = document.createElement("div");

        leftQuote.className = "leftQuote";
        testimony_section.className = "testimony-section";
        rightQuote.className = "rightQuote";

        let quote_img_l = document.createElement("img");
        quote_img_l.src = "pictures/leftQ.svg";

        let quote_img_r = document.createElement("img");
        quote_img_r.src = "pictures/leftQ.svg";

        leftQuote.appendChild(quote_img_l);
        rightQuote.appendChild(quote_img_r);

        content.appendChild(leftQuote);
        testimony_section.innerText = quote;
        content.appendChild(testimony_section);
        content.appendChild(rightQuote);

        // Contributor (Person who contributed the testimonial)
        let contributor = document.createElement("div");
        contributor.className = "contributor";
        let personQuoted = quote_provider != "" ? quote_provider : "Unknown";
        contributor.innerText = "-" + personQuoted;

        testimony.appendChild(content);
        testimony.appendChild(contributor);

        testimonials_list.appendChild(testimony);
    }

    for(let i = 0; i < testimonials_quotes.length; i++){
        createTestimonial(testimonials_quotes[i], testimonials_authors[i]);
        let testimonials_section = document.getElementById("Testimonials");
        let testimonials_nav = testimonials_section.querySelector(".nav");

        let nav_img = document.createElement("img");
        nav_img.src = i == 0 ? "pictures/NavCircle_B.svg" : "pictures/NavCircle_W.svg";

        testimonials_nav.appendChild(nav_img);
    }

    // Services
    let services = {};
    let services_obj = data["Services"];
    
    let includes = {};

    if(data["Services-Include"] != undefined){
        data["Services-Include"].forEach(included => {
            includes[included["Service"]] = included["Includes (optional)"];
        })
    }

    services_obj.forEach(service => {
        let serviceTitle = service["Service"];
        let serviceName = service["Name"];
        let serviceDescription = service["Description"];

        if(!services[serviceTitle]){
            services[serviceTitle] = {};
        }

        if (!services[serviceTitle][serviceName]) {
            services[serviceTitle][serviceName] = [];
        }
          
        services[serviceTitle][serviceName].push(serviceDescription);
    });

    let image_icon_srcs = {};

    if(data["Service-Icons"] != undefined){
        data["Service-Icons"].forEach(serviceImg => {
            image_icon_srcs[serviceImg["Service"]] = serviceImg["Image Url"];
        });
    }  

    if(Object.keys(image_icon_srcs).length == 0){
        image_icon_srcs = {
            "Tidying Up": "pictures/Services/Organization.svg",
            "Floors": "pictures/Services/Floors.svg",
            "Kitchen": "pictures/Services/Kitchen.svg",
            "Bathrooms": "pictures/Services/Bathroom.svg",
            "Windows": "pictures/Services/Window.svg",
            "Kitchen & Appliances": "pictures/Services/Kitchen.svg",
            "Living Areas": "pictures/Services/Living_Areas.svg",
            "Windows & Doors": "pictures/Services/Window.svg"
        };
    }  

    function createServiceCard(allServices){
        let services_section = document.getElementById("Services");
        let container = services_section.querySelector(".container");

        Object.keys(allServices).forEach(service => {
            let card = document.createElement("div");
            card.className = "card";

            let serviceName = document.createElement("div");
            serviceName.className = "name";
            let heading = document.createElement("h3");
            heading.innerText = service;            
            serviceName.appendChild(heading);
            if(includes[service] != undefined){
                let includes_text = document.createElement("div");
                console.log("INCLUDES:", includes);
                includes_text.innerText = includes[service];

                serviceName.appendChild(includes_text);
            }

            let content = document.createElement("div");
            content.className = "content";

            Object.keys(allServices[service]).forEach(serviceName => {
                let service_container = document.createElement("div");
                service_container.className = "service";
                // service_container.setAttribute('data-service', 'BC Sweeping & Dusting');

                let title = document.createElement("div");
                title.className = "title";

                let icon_container = document.createElement("div");
                let icon_img = document.createElement("img");
                icon_img.src = image_icon_srcs[serviceName] != undefined ? image_icon_srcs[serviceName] : "pictures/Services/Organization.svg";
                let circle = document.createElement("div");
                circle.className = "circle";
                icon_container.appendChild(icon_img);
                icon_container.appendChild(circle);

                let title_span = document.createElement("span");
                title_span.innerText = serviceName;

                title.appendChild(icon_container);
                title.appendChild(title_span);

                let descriptors = allServices[service][serviceName];
                let ul = document.createElement("ul");

                for(let i = 0; i < descriptors.length; i++){
                    let li = document.createElement("li");
                    li.innerText = descriptors[i];
                    ul.appendChild(li);
                }

                service_container.appendChild(title);
                service_container.appendChild(ul);

                content.appendChild(service_container);
            })

            card.appendChild(serviceName);
            card.appendChild(content);

            container.appendChild(card);
        })
    }

    createServiceCard(services);

    // Fully Insured
    if(general["Fully Insured"] != undefined){
        let fullyInsuredText = document.createElement("span");
        fullyInsuredText.innerText = general["Fully Insured"];
        document.getElementById("FullyInsured").appendChild(fullyInsuredText);
    }

    // Promotion
    let promotion_section = document.getElementById("Promotion");

    if(Object.keys(data["Promotions"]).length != 0){     
        data["Promotions"].forEach(promotion => {
            let title_section = document.createElement("div");
            let heading = document.createElement("h2");
            heading.innerText = promotion["Title"];
            let span = document.createElement("span");
            span.innerText = "Valid from " + promotion["Start Date"] + " - " + promotion["End Date"];
            title_section.appendChild(heading);
            title_section.appendChild(span);

            let description = document.createElement("div");
            description.className = "p_description";
            description.innerText = promotion["Content"];

            promotion_section.appendChild(title_section);
            promotion_section.appendChild(description);
        });

        let arrow_img = document.createElement("img");
        arrow_img.src = "pictures/dArrow.svg";

        promotion_section.appendChild(arrow_img);
    }else{
        promotion_section.style.display = "none";
    }
    // Quote Button
    if(general["Second Button"] != undefined){
        document.getElementById("submit-button").innerText = general["Second Button"];
    }

    // Contact Info
    if(general["Instagram"] != undefined){
        document.getElementById("Instagram").href = general["Instagram"];
    }
    if(general["Facebook"] != undefined){
        document.getElementById("Facebook").href = general["Facebook"];
    }

    const footer = document.getElementById("Footer");
    let spans = footer.querySelector(".contact").getElementsByTagName("span");
    if(general["Email"] != undefined){
        spans[0].innerText = general["Email"];
    }
    if(general["Phone"] != undefined){
        spans[1].innerText = general["Phone"];
    }

}).catch(err => {
    console.log("ERROR Loading Content:", err);
});