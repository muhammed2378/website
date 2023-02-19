
// list of images sources
let imgs = ['../images/img-1.jpg', '../images/img-2.jpg','../images/img-3.jpg', '../images//img-4.jpg', '../images/img-5.jpg', '../images/img-5.jpg', '../images/img-7.jpg', '../images/img-8.jpg', '../images/img-9.jpg','../images/img-10.jpg' ]

// check local storage

let mainColor = localStorage.getItem("color-option")

// All color links
let colorLi = document.querySelectorAll(".color-list li");

// get the active color stored in local storage
let activeColor = localStorage.getItem("activeLi")


// check if the mainColor is not null if so, then retrieve the data from local storage
if (mainColor !== null){
    document.documentElement.style.setProperty("--main-color", mainColor)

    // remove all active classes from color list
    document.querySelector(".active").classList.remove("active");

    // change the active class to the right circul
    colorLi.forEach(el => {
        // check if the Avtive color in the local storage is equal to  the data-color of li  
        if(el.dataset.color === mainColor){

            el.classList.add("active")
        }
    })
}






// Settings box

let box_gear = document.querySelector(".fa-gear");
let box = document.querySelector(".settings-box ");



box_gear.onclick =  () => {
    box.classList.toggle("show")
}

// change the main color of the page

colorLi.forEach(li => {
    li.addEventListener("click", e => {
        // set color 
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)

        // set color in local storage
        localStorage.setItem("color-option", e.target.dataset.color)

        handlClass(e)
    })
})




// ---- active the random background to yes or no


// check background status in localstorage
let backgroundInterval;

let flag = true;

let randomSelection = localStorage.getItem("random-background")

if(randomSelection !== null) {
    document.querySelectorAll(".random-backgrounds span").forEach(e => {
        e.classList.remove("active")
    })

    // change to the image that is stored in localstorage
    document.querySelector(".landing-page").style.backgroundImage = `url(${imgs[localStorage.getItem("random-num")]})`;
    
    if(randomSelection === "yes"){    
        flag = true;
        document.querySelector(".random-backgrounds .yes").classList.add("active")
    }else {
        flag = false
        document.querySelector(".random-backgrounds .no").classList.add("active")
    }

    
    
} else {
    document.querySelector(".landing-page").style.backgroundImage = `url(${imgs[0]})`;
}




let landing_page = document.querySelector(".landing-page")
let spans = document.querySelectorAll(".random-backgrounds span")

spans.forEach(span => {

    span.addEventListener("click", e => {

        handlClass(e)

        if(e.target.dataset.background == "yes"){
            flag = true;
            randomizebckImg()
            localStorage.setItem("random-background", "yes")
        }else {
            flag = false
            clearInterval(backgroundInterval)
            localStorage.setItem("random-background", "no")
        }
    })
})



function randomizebckImg(){
    if (flag === true) {

        // change the image every 10 seconds
        backgroundInterval = setInterval(function() {
            // get a random number in range [0:4]
            let randomNumber = Math.floor(Math.random() * imgs.length);

            // store random in number locla strorage
            localStorage.setItem("random-num", randomNumber)

            // set the image
            landing_page.style.backgroundImage = `url(${imgs[randomNumber]})`;
        }, 100)

    }
}





// ----- show/unshow the navigation bullets



let navigationOption = document.querySelectorAll(".show-navs span");

let navigationBox = document.querySelector(".nav-bullets")

// check navigation bullets from localstorage

let showNavs = localStorage.getItem("show-bullets")

if (showNavs !== null) {
    navigationOption.forEach(el => {
        el.classList.remove("active")
    })
    if(showNavs === "yes") {
        navigationBox.style.display = "block"
        document.querySelector(".show-navs .yes").classList.add("active")
        
    } else {
        navigationBox.style.display = "none"
        document.querySelector(".show-navs .no").classList.add("active")
    }
    
}




navigationOption.forEach(opt => {
    opt.addEventListener("click", (e) => {
        handlClass(e)
        if(e.target.dataset.show === "no") {

            // display it to none
            navigationBox.style.display = "none"
            window.localStorage.setItem("show-bullets", "no")
        } else {


            // display it to none
            navigationBox.style.display = "block"

            window.localStorage.setItem("show-bullets", "yes")
        }
    })
})

// ---- reset button

let resetBtn = document.querySelector(".settings-box .reset")

resetBtn.addEventListener("click", e => {
    localStorage.removeItem("color-option")
    localStorage.removeItem("show-bullets")
    localStorage.removeItem("random-background")
    location.reload()
})




// ########################





// randomizebckImg()


// animate progress onscrolling


let mySkills = document.querySelector(".skills")
let skills = document.querySelectorAll(".skills .skill-box .skill-progress span")

// the rect of the mySkills (x, y, width, height)
let mySkillsRect = mySkills.getBoundingClientRect(); 

// the rect of the body (x, y, width, height)
let bodyRect = document.body.getBoundingClientRect();

window.onscroll =  () => {

    // the current height of the window
    let currentHeight = this.scrollY;

    // formula to get the right positon of the wanted element
    let rect = (mySkillsRect.top - bodyRect.top) - mySkillsRect.height;
    
    // check if the current height is greater than rect(formula) to start the animation
    if (currentHeight > rect) {
        // modify the progress
        skills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }
}

// Create popup

let getImgs = document.querySelectorAll(".gallery .imgs-box img");

// go throw the imgs

getImgs.forEach(img => {

    img.addEventListener("click", (e) => {
        // create an overlay 
        let overlay = document.createElement("div")
        // create a class to the overlay
        overlay.className = "popup-overlay"

        // append the overlay element to the body
        document.body.appendChild(overlay);

        // create img box
        let imgBox = document.createElement("div")
        // create a class to the img box
        imgBox.className = "img-box"

        // create the popup img
        let popupImg = document.createElement("img")

        // assing the img's src to the new img's src
        popupImg.src = img.src

        // the heading
        if(img.alt !== null) {
            // create the head
            let h3 = document.createElement("h3")

            // create the text
            let text = document.createTextNode(img.alt)

            // append the text to the h3
            h3.appendChild(text)

            // append the h3 to the img box
            imgBox.appendChild(h3)
        }

        // append the img into the box
        imgBox.appendChild(popupImg)

        // append the img box into the body
        document.body.append(imgBox)

        // create the close button



        let closeButton = document.createElement("i")
        closeButton.className = "fa-solid fa-xmark"

        imgBox.appendChild(closeButton)
        

    })
})

// close pop up 

document.addEventListener("click", (e) => {
    if(e.target.className === "fa-solid fa-xmark") {
        // remove the popup img
        e.target.parentElement.remove()

        // remove the overlay
        document.querySelector(".popup-overlay").remove()
    }
})

// Nav blullets

// Select All the bullets

let bullets = document.querySelectorAll(".nav-bullets .bullet")



// select all links

let links = document.querySelectorAll(".links li a")


function jumpToElement(elements) {
    elements.forEach(el => {
        
        el.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
        })
        })
    })
}

jumpToElement(bullets)
jumpToElement(links)

// handle activeClass

function handlClass(event) {
     // remove active from all li
    event.target.parentElement.querySelector(".active").classList.remove("active");

     // set active to the current color
    event.target.classList.add("active")
}

// show menue bar on click

let bars = document.querySelector(".bars");


let linksBox = document.querySelector(".links");


document.addEventListener("click", e => {

    // check if you click the menu bar
    if(e.target.parentElement === bars) {
        // add the class open to the link box
        linksBox.classList.toggle('open')

        // add the arrow class to the bars
        bars.classList.toggle('arrow')
    // check if doesn't click on the menue bar and the bar
    } else if(e.target !== linksBox && e.target.parentElement !== linksBox) {
        // remove the class open to the link box
        linksBox.classList.remove('open')

        // remove the arrow class to the bar
        bars.classList.remove('arrow')
    }
})