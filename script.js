
// FIX: define scroll function
function scrollToSection(id){
 const el = document.getElementById(id);
 if(el){
  el.scrollIntoView({behavior:'smooth'});
 }
}

// counter animation
const counters=document.querySelectorAll('.counter');
counters.forEach(counter=>{
 const update=()=>{
  const target=+counter.getAttribute('data-target');
  const c=+counter.innerText;
  const inc=target/100;
  if(c<target){counter.innerText=Math.ceil(c+inc);setTimeout(update,20);}else{counter.innerText=target;}
 };
 update();
});

// testimonial slider
let index=0;
const slides=document.querySelectorAll('.slider p');
setInterval(()=>{
 slides[index].classList.remove('active');
 index=(index+1)%slides.length;
 slides[index].classList.add('active');
},3000);

// form submission
const form=document.getElementById('form');
const spinner=document.getElementById('spinner');
const status=document.getElementById('status');

form.addEventListener('submit',async e=>{
 e.preventDefault();

 const name=document.getElementById('name').value.trim();
 const email=document.getElementById('email').value.trim();

 if(name.length<3){status.innerText='Name too short';return;}
 if(!email.includes('@')){status.innerText='Invalid email';return;}

 spinner.style.display='block';

 const data={name,email,message:document.getElementById('message').value};

 try{
  await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',{
   method:'POST',
   body:JSON.stringify(data)
  });
  status.innerText='Submitted successfully';
  form.reset();
 }catch{
  status.innerText='Error sending';
 }

 spinner.style.display='none';
});
