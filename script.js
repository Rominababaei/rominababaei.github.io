
document.documentElement.classList.add("js");
const header=document.querySelector(".site-header");
const progress=document.querySelector(".scroll-progress");
const backToTop=document.querySelector(".back-to-top");
const menuButton=document.querySelector(".menu-toggle");
const navLinks=document.querySelectorAll(".nav-links a");
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function onScroll(){
  const y=window.scrollY;
  header.classList.toggle("is-scrolled",y>40);
  backToTop.classList.toggle("visible",y>700);
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=max>0?((y/max)*100)+"%":"0%";
}
window.addEventListener("scroll",onScroll,{passive:true});
onScroll();
menuButton.addEventListener("click",()=>{
  const open=document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded",String(open));
});
navLinks.forEach(link=>link.addEventListener("click",()=>{
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded","false");
}));
backToTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:reducedMotion?"auto":"smooth"}));
const reveals=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window&&!reducedMotion){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.13});
  reveals.forEach(el=>observer.observe(el));
}else{
  reveals.forEach(el=>el.classList.add("is-visible"));
}
const visual=document.querySelector(".hero-visual");
if(visual&&!reducedMotion){
  visual.addEventListener("pointermove",event=>{
    const box=visual.getBoundingClientRect();
    const x=(event.clientX-box.left)/box.width-.5;
    const y=(event.clientY-box.top)/box.height-.5;
    visual.style.transform="perspective(900px) rotateX("+(-y*5)+"deg) rotateY("+(x*6)+"deg)";
  });
  visual.addEventListener("pointerleave",()=>{visual.style.transform="";});
}
document.querySelector("#year").textContent=new Date().getFullYear();
