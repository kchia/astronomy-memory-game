// constants for eventListeners and data
const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('nav');
const board = document.querySelector('#gameBoard');

// gameBoard arrays
let cardsOnBoard = [];
let inPlay = [];
let players = ['playerOne', 'playerTwo'];
let playerOne = 0;
let playerTwo = 0;

// games objects > arrays > objects
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
    // checkMatch();
});

function checkMatch (evt) {
    if (inPlay.length === 2 && inPlay[0] === inPlay[1]) {
        // if match iterate point for current player & go again
        playerOne++
        document.getElementById('score').innerText 
        // win scenario   
    } else if (inPlay.length === 2 && inPlay[0] != inPlay[1]) {
        // if no match go to next player
        let prevPlayer = players.shift();
        players.push(prevPlayer);
        // and flip back
        // remove board.children.children
        // set board children style.background to cardBack
    }
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

// default start board load
loadBoard('planets');