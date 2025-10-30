
let selectedCards = [];
let matchedCards = [];
let score = 0;
let timer;
let timeLeft = 60; 
let level = 'easy'; 


function showLevel(selectedLevel) {
    
    document.getElementById('home').style.display = 'none';

  
    document.querySelectorAll('.level').forEach(levelDiv => {
        levelDiv.style.display = 'none';
    });

    
    document.getElementById(selectedLevel).style.display = 'block';
    level = selectedLevel;
    
    
    initializeGame(selectedLevel);
}


function goHome() {
   
    document.getElementById('home').style.display = 'block';
    document.querySelectorAll('.level').forEach(levelDiv => {
        levelDiv.style.display = 'none';
    });
}


function initializeGame(level) {
    
    score = 0;
    timeLeft = 60;
    document.querySelector('.page_head h4').textContent = 'SCORE : ' + score;

    clearInterval(timer);
    startTimer();

    
    generateCards(level);
}


function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Temps écoulé! Votre score est : ' + score);
        } else {
            timeLeft--;
            document.querySelector('.timer').textContent = 'Temps restant : ' + timeLeft + 's';
        }
    }, 1000);
}


function generateCards(level) {
    let cardsContainer;
    let numCards;

    switch (level) {
        case 'easy':
            cardsContainer = document.getElementById('easy_cards');
            numCards = 6;
            break;
        case 'medium':
            cardsContainer = document.getElementById('medium_cards');
            numCards = 12;
            break;
        case 'hard':
            cardsContainer = document.getElementById('hard_cards');
            numCards = 24;
            break;
        default:
            return;
    }


    let cards = [];
    for (let i = 1; i <= numCards / 2; i++) {
        cards.push(i, i); 
    }

  
    cards = shuffle(cards);

   
    cardsContainer.innerHTML = '';
    cards.forEach((card, index) => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-card', card);
        cardElement.setAttribute('data-index', index);
        cardElement.onclick = flipCard;
        cardsContainer.appendChild(cardElement);
    });
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}


function flipCard(event) {
    const clickedCard = event.target;

    if (clickedCard.classList.contains('flipped') || matchedCards.includes(clickedCard)) {
        return;
    }

    clickedCard.classList.add('flipped');
    clickedCard.textContent = clickedCard.getAttribute('data-card'); 

    selectedCards.push(clickedCard);

    if (selectedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    if (selectedCards[0].getAttribute('data-card') === selectedCards[1].getAttribute('data-card')) {
        
        matchedCards.push(selectedCards[0], selectedCards[1]);
        score += 10; 
        document.querySelector('.page_head h4').textContent = 'SCORE : ' + score;
        selectedCards = [];

        if (matchedCards.length === document.querySelectorAll('.card').length) {
            clearInterval(timer);
            alert('Félicitations ! Vous avez gagné avec un score de ' + score);
        }
    } else {
       
        setTimeout(() => {
            selectedCards[0].classList.remove('flipped');
            selectedCards[1].classList.remove('flipped');
            selectedCards = [];
        }, 1000);
    }
}
