const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('nav');

// menu open/close event
hamburger.addEventListener('click', openMenu);
let navSwitch = 0;

function openMenu(evt) {
    console.log(hamburger[0]);
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

