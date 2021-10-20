//grab a couple of things
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
const go = document.querySelector('.go')
let playerLives = 6;
let start = new Audio();
start.volume = 0.3;
start.src = './audio/start.mpeg';
//link text

playerLivesCount.textContent = playerLives;

//Generate the data
const getData = () => [
    { imgSrc: './img/axe.jpg', name: 'axe' },
    { imgSrc: './img/bristleback.jpg', name: 'bristleback' },
    { imgSrc: './img/bane.jpg', name: 'bane' },
    { imgSrc: './img/axe.jpg', name: 'axe' },
    { imgSrc: './img/jakiro.jpg', name: 'jakiro' },
    { imgSrc: './img/dazzle.jpg', name: 'dazzle' },
    { imgSrc: './img/enigma.jpg', name: 'enigma' },
    { imgSrc: './img/lion.jpg', name: 'lion' },
    { imgSrc: './img/cm.jpg', name: 'cm' },
    { imgSrc: './img/bristleback.jpg', name: 'bristleback' },
    { imgSrc: './img/enigma.jpg', name: 'enigma' },
    { imgSrc: './img/dazzle.jpg', name: 'dazzle' },
    { imgSrc: './img/bane.jpg', name: 'bane' },
    { imgSrc: './img/jakiro.jpg', name: 'jakiro' },
    { imgSrc: './img/lion.jpg', name: 'lion' },
    { imgSrc: './img/cm.jpg', name: 'cm' }
];

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5)
    return cardData;
};
randomize();

//Card Generetor Function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate HTML
    cardData.forEach(item => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        //Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        //Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
            var audio = new Audio();
            audio.volume = 0.2;
            audio.src = './audio/audio.mpeg';
            audio.autoplay = true;
        });
    });

};
//check cards
const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');

    //Logic
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            console.log('match');

            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';

                var audio = new Audio();
                audio.src = './audio/yes.mpeg';
                audio.volume = 0.3
                audio.autoplay = true;
            })
        } else {
            console.log('wrong');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard'), 700)
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                start.volume = 0;
                let lose = new Audio();
                lose.volume = 0.4;
                console.log(lose.volume);
                lose.src = './audio/lose.mpeg';
                lose.play();
                restart('Проигрыш..попробуй еще раз');
                setTimeout(() => lose.pause(), 7000);
            }
        }

    }
    if (toggleCard.length === 16) {
        start.volume = 0;
        let win = new Audio();
        win.volume = 0.4;
        win.src = './audio/win.mpeg';
        win.play();
        restart('Победа!');
        setTimeout(() => win.pause(), 7000);

    }
};

//RESTART
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        setTimeout(() => cards[index].classList.add('hint'), 200);
        //randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000);

        setTimeout(() => cards[index].classList.remove('hint'), 3000);

    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
    setTimeout(() => start.volume = 0.3, 7100);
    setTimeout(() => start.currentTime = 0, 7100);


};
cardGenerator();


window.addEventListener('load', () => {
    start.play();
    start.loop = true;
    restart('GL HF');
});