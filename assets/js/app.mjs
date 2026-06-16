const portfolioRepos=['github-ai-genius','MAI-UI','GANTECH-HRM','openai-nextjs-starter','ai-document-assistant','MPESA'];
function portfolioAnswer(text){
 const q=text.toLowerCase();
 if(q.includes('skill'))return 'Python, Django, Flask, PHP, JavaScript, React, SQL, PostgreSQL, AI automation, dashboards and fintech systems.';
 return portfolioRepos.join('\n');
}
function addMessage(text,kind){
 const box=document.querySelector('#messages');
 if(!box)return;
 const item=document.createElement('div');
 item.className='msg '+(kind||'bot');
 item.textContent=text;
 box.appendChild(item);
 box.scrollTop=box.scrollHeight;
}
document.addEventListener('DOMContentLoaded',()=>{
 const year=document.querySelector('#year');
 if(year)year.textContent=new Date().getFullYear();
 const panel=document.querySelector('#aiPanel');
 const toggle=document.querySelector('#aiToggle');
 const close=document.querySelector('#aiClose');
 const form=document.querySelector('#aiForm');
 const input=document.querySelector('#aiInput');
 if(toggle&&panel)toggle.onclick=()=>{panel.classList.toggle('open');panel.setAttribute('aria-hidden',panel.classList.contains('open')?'false':'true');};
 if(close&&panel)close.onclick=()=>panel.classList.remove('open');
 if(form&&input)form.onsubmit=e=>{e.preventDefault();const q=input.value.trim();if(!q)return;addMessage(q,'user');input.value='';addMessage(portfolioAnswer(q),'bot');};
 console.info('George Alfred Nyamema production portfolio loaded',portfolioRepos);
});
