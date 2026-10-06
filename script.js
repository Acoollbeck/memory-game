///////////// DOM tree generate //////////////////////////////
const body = document.querySelector('body')
const modal = document.createElement('div')

const modalScore = document.createElement('div')
const modalTitle = document.createElement('h2');
const modalDescr = document.createElement('p');

const modalButtons = document.createElement('div');
const modalBtnNew = document.createElement('button');
const modalBtnClose = document.createElement('button');


const header = document.createElement('header');
const headerContainer = document.createElement('div');
const headerBtnNew = document.createElement('button');
const headerBtnTable = document.createElement('button');

const headerScore = document.createElement('div')
const headerScoreItem = document.createElement('div');

const main = document.createElement('main');
const hero = document.createElement('section');
const heroContainer = document.createElement('div');
const heroList = document.createElement('ul');
const footer = document.createElement('footer');
const footerContainer = document.createElement('div');

let moves = 0
let success = 0


modal.classList.add('modal')
modalScore.classList.add('modal__score')
modalTitle.classList.add('modal__title')
modalDescr.classList.add('modal__descr')
modalButtons.classList.add('modal__buttons')
modalBtnNew.classList.add('modal__buttons-new', 'btn')
modalBtnNew.textContent = 'New Game'
modalBtnClose.classList.add('modal__buttons-close', 'btn')
modalBtnClose.textContent = 'Close'



header.classList.add('header');
headerContainer.classList.add('header__container', 'container');
headerBtnNew.classList.add('header__btn-new', 'btn')
headerBtnNew.textContent = 'New Game'
headerBtnTable.classList.add('header__btn-table', 'btn')
headerBtnTable.textContent = 'Leaderboard'



headerScore.classList.add('header__score');
main.classList.add('main');
hero.classList.add('hero')
heroContainer.classList.add('hero__container', 'container');
heroList.classList.add('hero__list');
footer.classList.add('footer');
footerContainer.classList.add('footer__container', 'container')


document.body.append(header);

document.body.append(modal);
modal.append(modalScore);
modalScore.append(modalTitle);
modalTitle.textContent = 'Поздравляю';

modalScore.append(modalDescr);



modal.append(modalButtons)
modalButtons.append(modalBtnNew);
modalButtons.append(modalBtnClose)


header.append(headerContainer);

headerContainer.append(headerScore);
headerScore.append(headerBtnNew)
headerScore.append(headerBtnTable)


for (let i = 0; i < 2; i++) {
  const headerScoreItem = document.createElement('div');
  const headerScoreLabel = document.createElement('span');
  const headerScoreValueMoves = document.createElement('span');
  const headerScoreValueSuccess = document.createElement('span');

  

  if(i === 1) {
    headerScoreLabel.textContent = 'Moves: ';
    headerScoreValueMoves.textContent = moves;
    
    headerScoreItem.append(headerScoreLabel);
    headerScoreItem.append(headerScoreValueMoves)
  } else {
    headerScoreLabel.textContent = 'Successfully: ';
    headerScoreValueSuccess.textContent = `${success}/8`
    
    headerScoreItem.append(headerScoreLabel);
    headerScoreItem.append(headerScoreValueSuccess)
  }

  headerScoreItem.classList.add('header__score-item');
  headerScoreLabel.classList.add('header__score-label');
  headerScoreValueMoves.classList.add('header__score-moves');
  headerScoreValueSuccess.classList.add('header__score-success');



  headerScore.prepend(headerScoreItem);
}

document.body.append(main);
main.append(hero)
hero.append(heroContainer);
heroContainer.append(heroList);


function generateCards() {
  const cards = [];
  
  
  const newCards = []
  for (let i = 1; i <= 8; i++) {
    cards.push(i, i);
  }

  for (let i = 0; i < 16; i++) {
    const card = cards[Math.floor(Math.random() * cards.length)]
    newCards.push(card)
    cards.splice(cards.indexOf(card), 1);
  }
  
  for (let i = 0; i < 16; i++) {
    const heroCard = document.createElement('li');
    const heroImage = document.createElement('img');
  
    heroCard.classList.add('hero__card');
    heroImage.classList.add('hero__img')
    heroImage.draggable = false;
    heroCard.append(heroImage);
    heroImage.src = `cards/${[newCards[i]]}.jpg`;
    heroList.append(heroCard);
  }
}

generateCards()


document.body.append(footer);
footer.append(footerContainer);


/////////////////// Main functional ////////////////////////
let count = 0
let srcTarget = [];
let cardTarget = []

function resetCount () {
  count = 0;
  srcTarget = []
  cardTarget.forEach((e) => {
    e.classList.remove('active')
  })
  cardTarget = [];
}

function increaseSuccess() {
  const img = document.querySelectorAll('.hero__img');
  success++
  document.querySelector('.header__score-success').textContent = `${success}/8`
  count = 0;
  srcTarget = [];
  cardTarget = [];

  if (success === 8) {
    modalDescr.textContent = `Количество затраченных ходов: ${moves}`;
    modal.classList.add('active');
    body.classList.add('active');
    img.forEach(e => {
      e.style.pointerEvents = 'none'
    })
  }
}

function checkCount(target) {

  if(count === 2 && srcTarget[0] === srcTarget[1]) {
    moves++
    document.querySelector('.header__score-moves').textContent = moves
    target.forEach((e) => {
      e.style.pointerEvents = 'none';
    })

    setTimeout(() => {
      target.forEach((e) => {
        e.style.pointerEvents = 'auto';
      })
      increaseSuccess()
    }, 100)
  }

  if(count === 2 && srcTarget[0] != srcTarget[1]) {
    moves++
    document.querySelector('.header__score-moves').textContent = moves
    target.forEach((e) => {
      e.style.pointerEvents = 'none';
    })

    setTimeout(() => {
      target.forEach((e) => {
        e.style.pointerEvents = 'auto';
        resetCount()
    })
    }, 1000)
  }
}

function resetScore() {
  moves = 0
  success = 0
  srcTarget = [];
  cardTarget = [];
  document.querySelector('.header__score-moves').textContent = moves;
  document.querySelector('.header__score-success').textContent = `${success}/8`;
}

heroList.addEventListener('click', (event) => {
  const img = document.querySelectorAll('.hero__img');
  if (event.target.classList.value === 'hero__img') {
    count++
    
    srcTarget.push(event.target.src);
    cardTarget.push(event.target)
    event.target.classList.toggle('active')
    
    checkCount(img)
  }
})


///////////////Click on Btn//////////////////////////


headerBtnNew.addEventListener('click', () => {
  const heroCard = document.querySelectorAll('.hero__card')
  heroCard.forEach((e) => {
    e.remove()
  })
  resetScore()
  resetCount()
  generateCards()
});

modalBtnClose.addEventListener('click', () => {
  body.classList.remove('active');
  modal.classList.remove('active')
})

modalBtnNew.addEventListener('click', () => {
  const heroCard = document.querySelectorAll('.hero__card')
  heroCard.forEach((e) => {
    e.remove()
  })
  body.classList.remove('active');
  modal.classList.remove('active')
  resetScore()
  resetCount()
  generateCards()
})