// constants for eventListeners and data
const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('nav');
const board = document.querySelector('#gameBoard');

// gameBoard arrays
let cardsOnBoard = [];
let inPlay = [];

// score & turn array
let players = [
    { id: 'playerOne', player: 'player 1', score: 0 },
    { id: 'playerTwo', player: 'player 2', score: 0 }
]; 

// games objects > arrays > objects; possibly change to class for refactor
const games = {
    planets: [
        { name: 'Mercury', img: 'images/planets/mercury.png' },
        { name: 'Venus', img: 'images/planets/venus.png' },
        { name: 'Earth', img: 'images/planets/earth.png' },
        { name: 'Mars', img: 'images/planets/mars.png' },
        { name: 'Jupiter', img: 'images/planets/jupiter.png' },
        { name: 'Saturn', img: 'images/planets/saturn.png' },
        { name: 'Uranus', img: 'images/planets/uranus.png' },
        { name: 'Neptune', img: 'images/planets/neptune.png' },
        { name: 'Sun', img: 'images/planets/sun.png' },
        { name: 'Moon', img: 'images/planets/moon.png' }
    ],
    stars: [
        { name: 'Aquarius', img: 'images/constellations/aquarius.png' },
        { name: 'Aries', img: 'images/constellations/aries.png' }, 
        { name: 'Cancer', img: 'images/constellations/cancer.png' }, 
        { name: 'Capricorn', img: 'images/constellations/capricorn.png' }, 
        { name: 'Cassiopeia', img: 'images/constellations/cassiopeia.png' }, 
        { name: 'Centaurus', img: 'images/constellations/centaurus.png' }, 
        { name: 'Gemini', img: 'images/constellations/gemini.png' }, 
        { name: 'Leo', img: 'images/constellations/leo.png' }, 
        { name: 'Libra', img: 'images/constellations/libra.png' }, 
        { name: 'Orion', img: 'images/constellations/orion.png' }, 
        { name: 'Pegasus', img: 'images/constellations/pegasus.png' }, 
        { name: 'Pisces', img: 'images/constellations/pisces.png' }, 
        { name: 'Sagittarius', img: 'images/constellations/sagittarius.png' }, 
        { name: 'Scorpius', img: 'images/constellations/scorpius.png' }, 
        { name: 'Taurus', img: 'images/constellations/taurus.png' }, 
        { name: 'Ursa Major', img: 'images/constellations/ursa-major.png' }, 
        { name: 'Ursa Minor', img: 'images/constellations/ursa-minor.png' }, 
        { name: 'Virgo', img: 'images/constellations/virgo.png' }
    ]
}

// menu open/close event
hamburger.addEventListener('click', openMenu);
let navSwitch = 0;

function openMenu(evt) {
    const bars = hamburger.children;
    evt.preventDefault();
    
    if (navSwitch === 0) {
        navigation.style.display = 'initial';
        bars[0].classList.add('top');
        bars[1].classList.add('middle');
        bars[2].classList.add('bottom');
        navSwitch = 1;
    } else {
        navigation.style.display = 'none';
        bars[0].classList.remove('top');
        bars[1].classList.remove('middle');
        bars[2].classList.remove('bottom');
        navSwitch = 0;
    }
}

// navigation menu item events
navigation.addEventListener('mouseover', function(evt) { // on hover
    evt.target.style.color = '#FDCB56';
});

navigation.addEventListener('mouseout', function(evt) { // on exit hover
    evt.target.style.color = '#FFFCF1';
});

navigation.addEventListener('click', function(evt) { // on click load new board
    evt.preventDefault();

    let arraySelector = evt.target.innerText;
    // clear previous board
    clearBoard();
    // load new board
    loadBoard(arraySelector.toLowerCase());
});

function loadBoard(arrayQuery) {
    // set new board
    const newBoard = games[arrayQuery];
    for (let i = 0; cardsOnBoard.length < 8; i += 2) {
        let randomIndex = Math.floor(Math.random()*newBoard.length);
        // console.log(newBoard[randomIndex].name);
        cardsOnBoard.push(newBoard[randomIndex], newBoard[randomIndex]);
    }
    // shuffle cardsOnBoard
    shuffle(cardsOnBoard);
    // push cards to View
    createCards(cardsOnBoard);
}

// create & push cards to View from gameBoard Array
function createCards(array) {
    for (let card in array) {
        // define attribute variables
        let newCard = document.createElement('div');
        
        // build card
        newCard.setAttribute('id', card); // gameBoard[card].name
        newCard.setAttribute('class', 'card back');

        // push to board
        document.getElementById('gameBoard').appendChild(newCard);
    }
}

// shuffle gameBoard array
function shuffle(array) {
    for (let i = array.length-1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random()*array.length);

        let upNext = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = upNext;
    }
}

// flip card
board.addEventListener('click', (evt) => {
    evt.preventDefault();
    // get array location via data-id as set in createCards function
    const card = evt.target.getAttribute('id');
    // create img and title elements
    let frontImg = document.createElement('img');
    let frontTitle = document.createElement('h2');
    // set img and title attributes using data-id from getAttribute^
    frontImg.setAttribute('src', cardsOnBoard[card].img);
    frontTitle.innerHTML = cardsOnBoard[card].name;
    // push new card to inPlay
    inPlay.push(card);
    // flip card/change image
    // remove bg
    evt.target.classList.remove('back');
    // add img and title
    evt.target.appendChild(frontImg);
    evt.target.appendChild(frontTitle);
    // check for match
    if(inPlay.length === 2) {
        checkMatch();
    }
});

function checkMatch () {
    const firstIndex = inPlay[0];
    const secondIndex = inPlay[1];
    const firstCard = cardsOnBoard[firstIndex].name;
    const secondCard = cardsOnBoard[secondIndex].name;

    console.log(firstCard);
    console.log(secondCard);
    
    if (firstCard === secondCard) {
        // if match iterate point for current player & go again
        document.getElementById(`${players[0].id}`).innerHTML = `${players[0].player}: ${players[0].score+=1}`;
        console.log('MATCH');
        turn();
        // win scenario   
    } else if (firstCard != secondCard) {
        // if no match go to next player
        console.log('NO MATCH');
        turn();
        // and flip back
        // flipBack();
    }
}

function turn() {
    // switch next player to first array
    let prevPlayer = players.shift();
    players.push(prevPlayer);
    // emphasize new current player on score board
    
    // clear in play array
    inPlay = [];
}

function win() {
// all cards flipped and matched
// player with most points wins
}

function clearBoard(){
    // empty dom game-board div
    while(board.firstElementChild) {
        board.removeChild(board.firstElementChild)
    }
    // empty gameBoard array
    cardsOnBoard = [];
}

function flipBack() {
    // get images & titles as nodeList
    let clearCard = board.querySelectorAll('img, h3');
    
    // remove images & titles
    // clearCard.parentNode.removeChild(clearCard);

    // get card divs
    for (let card in board) {
        // set backgrounds for all board > divs to 'back'
        if (card.classList != 'card back') {
            card.classList.add('back');
        }
    }
}
// default start board load
loadBoard('planets');
console.log(cardsOnBoard);
