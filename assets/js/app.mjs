const portfolioRepos=['github-ai-genius','MAI-UI','GANTECH-HRM','openai-nextjs-starter','ai-document-assistant','MPESA'];
document.addEventListener('DOMContentLoaded',()=>{
 const year=document.querySelector('#year');
 if(year)year.textContent=new Date().getFullYear();
 console.info('George Alfred Nyamema production portfolio loaded',portfolioRepos);
});
