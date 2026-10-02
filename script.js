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
  const headerScoreValue = document.createElement('span');

  if(i === 1) {
    headerScoreLabel.textContent = 'Moves';
    headerScoreValue.textContent = '0'
  } else {
    headerScoreLabel.textContent = 'Attempts';
    headerScoreValue.textContent = '0'
  }

  headerScoreItem.classList.add('header__score-item');
  headerScoreLabel.classList.add('header__score-label');
  headerScoreValue.classList.add('header__score-value');

  headerScoreItem.append(headerScoreLabel);
  headerScoreItem.append(headerScoreValue)
  headerScore.prepend(headerScoreItem);
}

document.body.append(main);
main.append(hero)
hero.append(heroContainer);
heroContainer.append(heroList);

for (let i = 0; i < 16; i++) {
  const heroCard = document.createElement('li');

  heroCard.classList.add('hero__card');

  heroList.append(heroCard);
}

document.body.append(footer);
footer.append(footerContainer);