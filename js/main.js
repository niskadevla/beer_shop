import {Modal} from './Modal.js';
import {CardList} from './CardList.js';
import {Bag} from './Bag.js';

const modalSignin = new Modal('#modalSignin');
const modalSignup = new Modal('#modalSignup');
const cardList = new CardList('#cardList');
const bag = new Bag('#modalBag');
let page = 1;
let order = 1;
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

  document.getElementById('showSelected')
    .addEventListener('click',showSelectedGoods);

  document.getElementById('clearSelected')
    .addEventListener('click',clearSelectedGoods);

  document.getElementById('nameFilter')
    .addEventListener('click', e => {
      e.preventDefault();
      sortInOrder();
      cardList.renderCardList();
    });

  document.getElementById('alcoholFilter')
    .addEventListener('click', e => {
      e.preventDefault();
      sortInOrder();
      cardList.renderCardList();
    });
}

addListeners();

async function getData(url) {
  let response = await fetch(url);
  let result = await response.json();

  return result;
}

function loadGoods() {
  getData(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${PER_PAGE}`)
    .then(res => {
      beers.push(...res.map(obj => ({data: obj, isSelected: false})) );
      setIsSelected(getLS());
      cardList.renderCardList();
      page++;
    });
}

function getLS() {
  return JSON.parse(localStorage.getItem('selectedBeers'));
}

function saveToLS(arr) {
  const ls = getLS();

  if (ls) {
    arr.push(...ls);
  }

  localStorage.setItem('selectedBeers', JSON.stringify(arr));
}

function findSelectedGoods(selector) {
  const $cardList = document.querySelector(selector);
  const $selectedItems = [...$cardList.children].filter(child => child.querySelector('input').checked);
  const selectedGoods = $selectedItems.map($item => beers.find(beer => beer.data.id === +$item.id));

  return selectedGoods;
}

function setIsSelected(selectedGoods) {
  if (!selectedGoods) {
    return
  }

  selectedGoods.forEach( item => beers.forEach(beer => {
    if (item.data.id === beer.data.id) {
      item.isSelected = true;
      beer.isSelected = true;
    }
  }));
}

function showSelectedGoods() {
  const selectedGoods = findSelectedGoods('#cardList');

  setIsSelected(selectedGoods);
  saveToLS(selectedGoods);

  let ls = getLS();

  if (!ls || !ls.length) {
    return
  }

  bag.renderBag(ls);
  bag.showModal();
}

function clearSelectedGoods() {
  localStorage.clear();
}

function sortInOrder() {
  if (!beers || !beers.length) {
    return
  }

  beers.sort((a, b) => a.data.name > b.data.name ? order : -order);
  order = -order;
}
