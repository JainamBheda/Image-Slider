const box1=document.querySelector(".boxes");
const container=document.querySelector(".container")
const arrow=document.querySelectorAll(".container i")
let isDragging=false, startX, startScrollLeft ,timeoutid;
const firstCardWidth = box1.querySelector(".card").offsetWidth;
let cardPerview=Math.round(box1.offsetWidth / firstCardWidth);
const box1childrens=[...box1.children];
let audio=new Audio("bgsound.mp3");
audio.play();
audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
arrow.forEach(btn =>{
    btn.addEventListener("click",()=>{
        // console.log(btn.id);
        box1.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})
box1childrens.slice(-cardPerview).reverse().forEach(card=>{
    box1.insertAdjacentHTML("afterbegin",card.outerHTML);
});
box1childrens.slice(0,cardPerview).forEach(card=>{
    box1.insertAdjacentHTML("beforeend",card.outerHTML);
});
const start=(e)=>{
    isDragging=true;
    box1.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft=box1.scrollLeft;
}
const dragging=(e)=>{
    if(!isDragging) return;
    box1.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop=()=>{
    isDragging=false;
    box1.classList.remove("dragging");
}
const infiniteScroll=()=>{
    if(box1.scrollLeft === 0){
        box1.classList.add("no-transition");
        box1.scrollLeft=box1.scrollWidth -  (2*box1.offsetWidth);
        box1.classList.remove("no-transition");
    }
    else if(Math.ceil(box1.scrollLeft) === box1.scrollWidth-box1.offsetWidth){
        box1.classList.add("no-transition");
        box1.scrollLeft=box1.offsetWidth;
        box1.classList.remove("no-transition");
    }
}
const autoplay=()=>{
    if(window.innerWidth<800) return;
    timeoutid=setTimeout(()=>box1.scrollLeft += firstCardWidth,2500);
}
autoplay();
clearTimeout(timeoutid);
if(!container.matches(":hover")) autoplay();

box1.addEventListener("mousedown",start);
box1.addEventListener("mousemove",dragging);
document.addEventListener("mouseup",dragStop);
box1.addEventListener("scroll",infiniteScroll);
container.addEventListener("mouseenter",()=>clearTimeout(timeoutid));
container.addEventListener("mouseleave",()=>autoplay);