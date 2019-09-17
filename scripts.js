const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('nav');

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
    // stars: ['Aries', 'Cancer', 'Capricorn', 'Cassiopeia', 'Centaurus', 'Gemini', 'Leo', 'Libra', 'Orion', 'Pegasus', 'Pisces', 'Sagittarius', 'Scorpius', 'Taurus', 'Ursa Major', 'Ursa Minor', 'Virgo']
}

// gameBoard array
let gameBoard = [] ;

// menu open/close event
hamburger.addEventListener('click', openMenu);
let navSwitch = 0;

function openMenu(evt) {
    const bars = hamburger.children;
    evt.preventDefault();
    
    if (navSwitch === 0) {
        navigation.style.opacity = '1';
        bars[0].classList.add('top');
        bars[1].classList.add('middle');
        bars[2].classList.add('bottom');
        navSwitch = 1;
    } else {
        navigation.style.opacity = '0';
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

    const boardToLoad = navigation.querySelectorAll('a');
    let arraySelector = evt.target.innerText;
    // arraySelector = arraySelector.toLowerCase();
    loadBoard(arraySelector.toLowerCase());
});

function loadBoard(arrayQuery) {
    const board = games[arrayQuery];
    for (let i = 0; i < 8; i += 2) {
        let randomIndex = Math.floor(Math.random()*board.length);
        console.log(board[randomIndex]);
        console.log(board[randomIndex]);
    }
}

