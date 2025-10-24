fetch("./data.json")
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
        return `
            <div class="testimony">
                <div>
                    <div class="leftQuote">
                        <img src="./pictures/leftQ.svg">
                    </div>
                    <div class="testimony-section">
                        ${quote}
                    </div>
                    <div class="rightQuote">
                        <img src="./pictures/leftQ.svg">
                    </div>
                </div>
                <div class="contributor">${quote_provider}</div>
            </div>
        `;
    }

    let allTestimonials = "";
    let allNavs = "";
    let numberOfTestimonials = testimonials_authors.length;
    const Testimonials = document.getElementById("Testimonials");
    const Testimonials_list = Testimonials.querySelector(".testimonial-list");
    const Testimonials_nav = Testimonials.querySelector(".nav");


    for(let i = 0; i < testimonials_quotes.length; i++){
        allTestimonials += createTestimonial(testimonials_quotes[i], testimonials_authors[i]);
        allNavs += i == 0 ? '<img src="./pictures/NavCircle_B.svg">' : '<img src="./pictures/NavCircle_W.svg">';
    }

    Testimonials_list.innerHTML = allTestimonials;
    Testimonials_nav.innerHTML = allNavs;

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
            "Tidying Up": "./pictures/Services/Organization.svg",
            "Floors": "./pictures/Services/Floors.svg",
            "Kitchen": "./pictures/Services/Kitchen.svg",
            "Bathrooms": "./pictures/Services/Bathroom.svg",
            "Windows": "./pictures/Services/Window.svg",
            "Kitchen & Appliances": "./pictures/Services/Kitchen.svg",
            "Living Areas": "./pictures/Services/Living_Areas.svg",
            "Windows & Doors": "./pictures/Services/Window.svg"
        };
    }  

    function createServiceCards(allServices){
        let services_section = document.getElementById("Services");
        let container = services_section.querySelector(".container");

        const card_html = (title, services) => {
            return `
            <div class="card">
                <div class="name">
                    <h3>${title}</h3>
                </div>
                <div class="content">
                    ${services}
                </div>
            </div>
        `;
        };

        const services_html = (title, descriptors) => {
            console.log("Services HMTL");
            return `
                <div class="service">
                    <div class="title">
                        <div>
                            <img src="${image_icon_srcs[title] != undefined ? image_icon_srcs[title] : './pictures/Services/Organization.svg'}">
                            <div class="circle"></div>
                        </div>
                        <span>${title}</span>
                    </div>
                    <ul>
                        ${descriptors}
                    </ul>
                </div>
            `;
        }

        const descriptors_html = (descriptors) => {
            let allDescriptors = "";
            for(let i = 0; i < descriptors.length; i++){
                allDescriptors += "<li>"+descriptors[i]+"</li>";
            }

            return allDescriptors;
        }

        let cards = "";

        Object.keys(allServices).forEach(service => {
            let services = "";
            Object.keys(allServices[service]).forEach(serviceName => {
                let description = descriptors_html(allServices[service][serviceName]);
                services += services_html(serviceName, description);
            })

            cards += card_html(service, services);
        })

        container.innerHTML = cards;
    }

    createServiceCards(services);

    // Fully Insured
    if(general["Fully Insured"] != undefined){
        document.getElementById("FullyInsured").innerHTML = `<img src="./pictures/Fully_Insured.svg"><span>${general["Fully Insured"]}</span>`;
    }

    // Promotion
    let promotion_section = document.getElementById("Promotion");

    if(Object.keys(data["Promotions"]).length != 0){
        let all_promotions = "";    
        data["Promotions"].forEach(promotion => {
            all_promotions += `
                <div>
                    <h2>${promotion["Title"]}</h2>
                    <span>Valid from ${promotion["Start Date"]} - ${promotion["End Date"]}</span>
                </div>
                <span class="p_description">${promotion["Content"]}</span>
            `;
        });

        all_promotions += `<img src="./pictures/dArrow.svg">`;

        promotion_section.innerHTML = all_promotions;
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