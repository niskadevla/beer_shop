import {Modal} from './Modal.js';
import {CardList} from './CardList.js';

const modalSignin = new Modal('#modalSignin');
const modalSignup = new Modal('#modalSignup');
const cardList = new CardList('#cardList');
let page = 1;
const PER_PAGE = 15;
window.beers = [];
// window.beers = [
//   {
//     data: {
//       id: 1,
//       image_url: 'https://images.punkapi.com/v2/keg.png',
//       name: 'Buzz',
//       abv: 4,
//     },
//     isSelected: false
//   },
// ]

function addListeners() {
  document.getElementById('btnSignin')
    .addEventListener('click', modalSignin.showModal);

  document.getElementById('btnSignup')
    .addEventListener('click', modalSignup.showModal);

  document.getElementById('loadMore')
    .addEventListener('click',loadGoods);
}

addListeners();

// cardList.renderCardList();

async function getDate(url) {
  let response = await fetch(url);
  let result = await response.json();

  return result;
}

function loadGoods() {
  getDate(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${PER_PAGE}`)
    .then(res => {
      beers = res.map(obj => Object.assign({}, {data: obj, isSelected: false}))
      cardList.renderCardList();
      page++;
    });
}
