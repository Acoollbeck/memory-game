///////////// DOM tree generate //////////////////////////////

const header = document.createElement('header');
const headerContainer = document.createElement('div');
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




header.classList.add('header');
headerContainer.classList.add('header__container', 'container');
headerScore.classList.add('header__score');
main.classList.add('main');
hero.classList.add('hero')
heroContainer.classList.add('hero__container', 'container');
heroList.classList.add('hero__list');
footer.classList.add('footer');
footerContainer.classList.add('footer__container', 'container')


document.body.append(header);
header.append(headerContainer);
headerContainer.append(headerScore);

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

const cards = [];

for (let i = 1; i <= 8; i++) {
  cards.push(i, i);
}

const newCards = []

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
  heroCard.append(heroImage);
  heroImage.src = `cards/${[newCards[i]]}.jpg`;
  heroList.append(heroCard);
}

document.body.append(footer);
footer.append(footerContainer);


/////////////////// Main functional ////////////////////////
let count = 0
let srcTarget = [];
let cardTarget = []
heroList.addEventListener('click', (event) => {
  const img = document.querySelectorAll('.hero__img');
  if (event.target.classList.value === 'hero__img') {
    if (count === 2) {
      if (srcTarget[0] === srcTarget[1]) {
        success++
        document.querySelector('.header__score-success').innerHTML = `${success}/8`
        count = 0;
        srcTarget = [];
        cardTarget = [];
        return
      } else {
        console.log(srcTarget)
        count = 0;
        srcTarget = []
        cardTarget.forEach((e) => {
          e.classList.remove('active')
        })
        cardTarget = [];
        return
      }
    }
    moves++
    document.querySelector('.header__score-moves').innerHTML = moves
    srcTarget.push(event.target.src);
    cardTarget.push(event.target)
    count++
    event.target.classList.toggle('active')
    
  }


})