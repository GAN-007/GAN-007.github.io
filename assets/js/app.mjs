const portfolioRepos=['github-ai-genius','MAI-UI','GANTECH-HRM','openai-nextjs-starter','ai-document-assistant','MPESA'];
function portfolioAnswer(text){
 const q=text.toLowerCase();
 if(q.includes('skill'))return 'Python, Django, Flask, PHP, JavaScript, React, SQL, PostgreSQL, AI automation, dashboards and fintech systems.';
 return portfolioRepos.join('\n');
}
document.addEventListener('DOMContentLoaded',()=>{
 const year=document.querySelector('#year');
 if(year)year.textContent=new Date().getFullYear();
 console.info('George Alfred Nyamema production portfolio loaded',portfolioRepos);
});
