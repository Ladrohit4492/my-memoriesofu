/* ===============================
   Pinterest Scrapbook Script
================================= */

const pages = document.querySelectorAll(".page");
const startBtn = document.getElementById("startBtn");
const music = document.getElementById("music");
const hearts = document.querySelector(".hearts");

let currentPage = 0;

/* -------------------------------
   Floating Hearts
-------------------------------- */

function createHeart(){

    const heart = document.createElement("span");

    const icons = ["❤","💖","💕","💗","💝","🌸"];

    heart.innerHTML =
        icons[Math.floor(Math.random()*icons.length)];

    heart.style.left = Math.random()*100+"vw";

    heart.style.fontSize =
        (20+Math.random()*25)+"px";

    heart.style.animationDuration =
        (5+Math.random()*6)+"s";

    hearts.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },11000);

}

setInterval(createHeart,400);

/* -------------------------------
   Open Scrapbook
-------------------------------- */

startBtn.addEventListener("click",()=>{

    pages[0].classList.add("hidden");

    currentPage = 1;

    pages[currentPage].classList.remove("hidden");

    if(music){
        music.play().catch(()=>{});
    }

});

/* -------------------------------
   Tap anywhere to continue
-------------------------------- */

document.addEventListener("click",(e)=>{

    if(e.target.tagName==="BUTTON") return;

    if(currentPage===0) return;

    if(currentPage<pages.length-1){

        pages[currentPage].classList.add("hidden");

        currentPage++;

        pages[currentPage].classList.remove("hidden");

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }

});

/* -------------------------------
   Restart
-------------------------------- */

function restartBook(){

    pages.forEach(page=>page.classList.add("hidden"));

    currentPage=0;

    pages[0].classList.remove("hidden");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

/* -------------------------------
   Fade Animation
-------------------------------- */

pages.forEach(page=>{

    page.style.transition="opacity .8s";

    page.style.opacity = page.classList.contains("hidden") ? "0" : "1";

});

const observer = new MutationObserver(()=>{

    pages.forEach(page=>{

        if(!page.classList.contains("hidden")){

            page.style.opacity="1";

        }else{

            page.style.opacity="0";

        }

    });

});

observer.observe(document.body,{
    subtree:true,
    attributes:true,
    attributeFilter:["class"]
});

/* -------------------------------
   Optional Keyboard Controls
-------------------------------- */

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        if(currentPage<pages.length-1){

            pages[currentPage].classList.add("hidden");

            currentPage++;

            pages[currentPage].classList.remove("hidden");

        }

    }

    if(e.key==="ArrowLeft"){

        if(currentPage>0){

            pages[currentPage].classList.add("hidden");

            currentPage--;

            pages[currentPage].classList.remove("hidden");

        }

    }

});