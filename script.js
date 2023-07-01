const API_KEY="153f34e4eb394f1ba9df987cf171519a";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("US")); // jb bhi window load ho tb callback function trigger hojana chahie
// sbse phle india ki news fetch krenge
async function fetchNews(query) {  // is function me jo bhi query daalenge to ye us query ki sari news le aaya krega
    // news laane ke lie fetch ka use krenge
    // fetch return krti h promise to await krna pdega
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}
// jitne bhi article aa rhe h utne hi template me bnane hai aur caard ke container me append krte jaana hai 
function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');
    cardsContainer.innerHTML="";
    // binddata ko call krne se phle container ko empty krdenge taaki jb bhi api call ho to container phle empty ho jae
    articles.forEach(article=>{
        if(!article.urlToImage) return; //jin article me image nhi h unko show nhi krna
        const cardClone=newsCardTemplate.content.cloneNode(true); // cards ke sare divs ki cloning krni h
        // card ko append krne se phle data daaldenge
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    })
}
function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDescription = cardClone.querySelector('#news-description');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDescription.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML= `${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank"); //click krne ke baad us link pe le jaaega new tab me
    })
}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}
// above function is used to perform styling on choosing (ipl, finance , politics);
const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');
searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
})
function reload(){
    window.location.reload();
}
// above function is used to reload on clicking the logo.