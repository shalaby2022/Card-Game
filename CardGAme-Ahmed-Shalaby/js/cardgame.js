let container = document.querySelector('.container');
let newGame = document.querySelector('.start');
let hint = document.querySelector('.hint');
let counter = document.querySelector('#counter').firstChild
console.log(counter)
let images = [
    'card1',
    'card2',
    'card3',
    'card4',
    'card5',
    'card1',
    'card2',
    'card3',
    'card4',
    'card5']


//--------------------------  Shuffling cards  -----------------------//
function shuffleArray(array) {
    for (let i=0; i < images.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
} 

//-------------------------- Genertating Cards &  seT ID -----------------------//

function GenerateCards() {
    shuffleArray(images);
    for(let i=0; i < images.length; i++) {
            container.innerHTML += `
                <div class="card" id=${i}><img src='images/${images[i]}.jpg' alt=""></div>`
        }
}
GenerateCards();

//------------------------- Clicking Card -------------------------//

let checker =[];
let srcImage =[]; 
let matched=[];

function AddListenerToCards(){
    let cards = document.querySelectorAll('.container .card');
    cards.forEach((card) => {
    
        card.addEventListener('click', () => {
            checker.push(card);
            srcImage.push(card.firstChild);
            card.style.backgroundImage = 'url()';
            card.firstChild.style.opacity = '1';
            if(srcImage.length == 2) {
                if(checker[0].getAttribute('id') == checker[1].getAttribute('id')) {
                    checker[0].style.backgroundImage = 'url()';
                    srcImage[0].style.opacity= '1';
                    checker[1].style.backgroundImage = 'url(../images/card11.jpg)';
                    srcImage[1].style.opacity = '0';
                    srcImage =[];
                    checker =[]; 
                }
                if( (srcImage[0].getAttribute('src') == srcImage[1].getAttribute('src')) ) {
                    checker[0].style.pointerEvents ="none";
                    checker[1].style.pointerEvents ="none";
                    console.log(card)
                    matched.push(checker[0].id,checker[1].id)
                    console.log( 'matched'+ matched   );
                    srcImage =[];
                    checker =[];            
                }
                else {
                    setTimeout(()=>{
                        console.log(srcImage);
                        console.log(checker);
                        checker[0].style.backgroundImage = 'url(../images/card11.jpg)';
                        srcImage[0].style.opacity= '0';
                        checker[1].style.backgroundImage = 'url(../images/card11.jpg)';
                        srcImage[1].style.opacity = '0';
                        srcImage =[];
                        checker =[];
                    },200)
                }
            }
            
        })
    })
}

AddListenerToCards();


//==============================================
let count = 3;

function addRotateOnClickEvent(){
    let cards = document.querySelectorAll('.container .card');
    hint.addEventListener('click', ()=> {
        for(let i=0; i < cards.length; i++) { 
            cards[i].style.backgroundImage = `url(../images/${cards}.jpg)`;
            cards[i].firstChild.style.opacity = '1';
            setTimeout(() => {
                cards[i].style.backgroundImage = `url(../images/card11.jpg)`;
                cards[i].firstChild.style.opacity = '0';
                checker=[];
                matched.forEach((e)=>{
                    if(e == cards[i].id){
                        cards[i].style.backgroundImage = `url(../images/${cards}.jpg)`;
                        cards[i].firstChild.style.opacity = '1';
                    }
                })
            },400);
        }
    })
}

addRotateOnClickEvent();


/* -------------------------------------------------------------------------- */
/*                               new Game start                               */
/* -------------------------------------------------------------------------- */

newGame.addEventListener('click', ()=> {
    matched=[];
    container.innerHTML = '';
    GenerateCards();
    AddListenerToCards();
    addRotateOnClickEvent();
});


