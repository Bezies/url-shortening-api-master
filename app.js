

const shorten = document.getElementById("shorten-button");
const input = document.getElementById("shorten");
const errorMessage = document.getElementById("error");

// REGEX WEBSITE 
let regEx = /((((http|https):(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)(\.\w{2,3})))/i

function validateMail(mail) {
    if (regEx.test(mail)) {
        return true
    } else {
        return false
    }
}




// CREER UN NOUVEAU SHORT LINK 

shorten.addEventListener("click", () => {


    // VALIDATION MAIL INPUT 
    errorMessage.style.display = "none";
    input.classList.remove("error");

    if (validateMail(input.value) === false) {
        console.log("nein");
        errorMessage.style.display = "block";
        input.classList.add("error");

        // NEW DIV SHORT LINK 
    } else {
        fetch('https://api.shrtco.de/v2/shorten?url=' + input.value)
        .then((res) => res.json())
        .then((data) => {
            input.value = ''
            const shortlink = document.createElement("div")
            shortlink.classList.add("newLink");
            shortlink.innerHTML =
                `
        <div class="ellipsis">${data.result.original_link}</div>
        
        <div class="link-copy"><a href="" class="shortLink">${data.result.full_short_link}</a> <button class="copy">Copy</button>

        </div>
        `
            document.querySelector(".shortLinkBox").appendChild(shortlink)

            // COPY LINK 

            const copy = document.querySelectorAll(".copy");

            copy.forEach(c => {
                c.addEventListener("click", () => {
                    copyText = c.previousElementSibling.innerHTML
                    copySuccess(copyText)
                    c.innerHTML = "Copied!";
                    c.classList.add("copied")
                })
            })


            function copySuccess(copyText) {
                navigator.clipboard.writeText(copyText)
                // .then(() => {console.log(`${copyText} copy success`)})
                // .catch((e) => { console.log(`${e} copy error`) })
            }
        })
    }

})







// OPEN MENU MOBILE VERSION 

const hamburger = document.querySelector("#hamburger");
const menu = document.querySelector("nav");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("open");
})





