import {Modal} from './Modal.js';
import {CardList} from './CardList.js';
import {LocalStore} from './LocalStore.js';

const modalSignin = new Modal('#modalSignin');
const modalSignup = new Modal('#modalSignup');
const cardList = new CardList('#cardList');
const localStore = new LocalStore();
const config = {
  page: 1,
  order: 1,
  per_page: 15
};
window.beers = [];

function addListeners() {
  document.getElementById('btnSignin')
    .addEventListener('click', modalSignin.showModal);

  document.getElementById('btnSignup')
    .addEventListener('click', modalSignup.showModal);

  document.getElementById('loadMore')
    .addEventListener('click',loadGoods);

  document.getElementById('showSelected')
    .addEventListener('click',() => localStore.showSelectedGoods('#cardList'));

  document.getElementById('clearSelected')
    .addEventListener('click',() => localStore.clearSelectedGoods('#cardList'));

  document.getElementById('nameFilter')
    .addEventListener('click', e => {
      const ids = localStore.getFromLocalStorage();
      e.preventDefault();
      sortInOrder('name');      
      localStore.setIsSelected(ids);
      cardList.renderCardList();
    });

  document.getElementById('alcoholFilter')
    .addEventListener('click', e => {
      const ids = localStore.getFromLocalStorage();
      e.preventDefault();
      sortInOrder('abv');
      localStore.setIsSelected(ids);
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
  getData(`https://api.punkapi.com/v2/beers?page=${config.page}&per_page=${config.per_page}`)
    .then(res => {
      const ids = localStore.getFromLocalStorage();
      beers.push(...res.map(obj => ({data: obj, isSelected: false})) );
      localStore.setIsSelected(ids);
      cardList.renderCardList();
      config.page++;
    });
}


function sortInOrder(key) {
  if (!beers || !beers.length) {
    return
  }

  beers.sort((a, b) => a.data[key] > b.data[key] ? config.order : -config.order);
  config.order = -config.order;
}
