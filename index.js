let matchedCards = [];
let cards = [];
let firstCard, secondCard;
let lockBoard = false; //lockBoards works as a flag to avoid movements during flipping
let score = 0;
let overlay = null;

let cardsArray = [
    {
        'id': 'apple',
        'img': 'Assets/apple.jpeg'
    },
    {
        'id': 'dinner',
        'img': 'Assets/dinner.jpeg'
    },
    {
        'id': 'flower',
        'img': 'Assets/flower.jpeg'
    },
    {
        'id': 'ghost',
        'img': 'Assets/ghost.jpeg'
    },
    {
        'id': 'hand',
        'img': 'Assets/hand.jpeg'
    },
    {
        'id': 'crow',
        'img': 'Assets/crow.jpeg'
    },
    {
        'id': 'moon',
        'img': 'Assets/moon.jpeg'
    },
    {
        'id': 'tree',
        'img': 'Assets/tree.jpeg'
    },
    {
        'id': 'undead',
        'img': 'Assets/undead.jpeg'
    },
    {
        'id': 'witch',
        'img': 'Assets/witch.jpeg'
    },
];


function hideCards(){
    cards.forEach(card => {
        card.classList.remove('visible');
        card.addEventListener('click', flipCard);
    });
}

function play(){
    matchedCards = []
    document.querySelector("#flips").textContent = score;
    overlay = document.getElementsByClassName('overlay-text')[0];
    overlay.addEventListener('click', restart);
    cards = Array.from(document.getElementsByClassName('card'));
    shuffleCards();
}


function restart(){
    resetBoard();
    score = 0;
    overlay.classList.remove('visible');
    hideCards();
    play();
}

function createDeck(){
    const parentDiv = document.querySelector('.card-container');
    let designIterator = 0;
    for(let i =0; i < cardsArray.length*2; i++){

    const childDiv = document.createElement('div'); //creates card
    

    const childCardBack = document.createElement('div');  //creates back card
    

    const childCardFront = document.createElement('div'); //creates front card
    

    
    const drops = [];

    for(let j = 0; j < 5; j++){
        drops[j] = document.createElement('img');
        if(j == 4)
            {
                drops[j].src = "Assets/bones.png"
            }
        else {
            drops[j].src = "Assets/blood1.png"
        }
    }

    const frontImage = document.createElement('img');
    if(i%2 === 0 && i > 1){
        designIterator++;
    }

    const source = (cardsArray[designIterator].img)
    frontImage.src = source;
    frontImage.classList.add('card-value');
    
    drops[0].classList.add('drop', 'top-left');
    drops[1].classList.add('drop', 'top-right');
    drops[2].classList.add('drop', 'bottom-left');
    drops[3].classList.add('drop', 'bottom-right');
    drops[4].classList.add('bones');

    
    for(let j = 0; j < 5; j++)
        childCardBack.appendChild(drops[j]);
    
    childCardFront.appendChild(frontImage);
    childDiv.classList.add('card');
    childCardBack.classList.add('card-face', 'card-back');
    childCardFront.classList.add('card-face', 'card-front');

    childDiv.appendChild(childCardBack)
    childDiv.appendChild(childCardFront);
    parentDiv.appendChild(childDiv)
    childDiv.addEventListener("click", flipCard); 
}
}

//Suffle with the Fisher-Yates algorithm
function shuffleCards(){
    console.log(cards.length)
    for(let i = cards.length -1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i*1));
        cards[randomIndex].style.order = i;
        cards[i].style.order = randomIndex;
    }
}


function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add("visible");

    if(!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    score++; //score only adds per flipped pair
    document.querySelector("#flips").textContent = score;
    lockBoard = true;

    checkForMatch();

}

function checkForMatch(){


    let isMatch = firstCard.getElementsByClassName('card-value')[0].src === secondCard.getElementsByClassName('card-value')[0].src;

    isMatch ? disableCards() : unflipCards();

}

function disableCards(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    matchedCards.push(firstCard);
    matchedCards.push(secondCard);

    if(matchedCards.length === cards.length){
        victory();
    }
    
    resetBoard();
}

function unflipCards(){
    setTimeout(() => {
        firstCard.classList.remove("visible");
        secondCard.classList.remove("visible");
        resetBoard();
    }, 1000);
}


function resetBoard(){
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}


function victory(){
    overlay.classList.add('visible');
}



createDeck();
play();
