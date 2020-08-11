import {Modal} from './Modal.js';
import {CardList} from './CardList.js';

const modalSignin = new Modal('#modalSignin');
const modalSignup = new Modal('#modalSignup');
const cardList = new CardList('#cardList');

window.beers = [
  {
    data: {
      id: 1,
      img: 'https://images.punkapi.com/v2/keg.png',
      name: 'Buzz',
      abv: 4,
    },
    isSelected: false
  },
]

function addListeners() {
  document.getElementById('btnSignin')
    .addEventListener('click', modalSignin.showModal);

  document.getElementById('btnSignup')
    .addEventListener('click', modalSignup.showModal);
}

addListeners();

cardList.renderCardList();
