import {Modal} from './Modal.js';
import {CardList} from './CardList.js';
import {LocalStore} from './LocalStore.js';

const modalSignin = new Modal('#modalSignin');
const modalSignup = new Modal('#modalSignup');
const cardList = new CardList('#cardList');
const localStore = new LocalStore();
const config = {
  page: 0,
  order: -1,
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
      cardList.clearCardList();
      cardList.renderCardList(beers);
    });

  document.getElementById('alcoholFilter')
    .addEventListener('click', e => {
      const ids = localStore.getFromLocalStorage();
      e.preventDefault();
      sortInOrder('abv');
      localStore.setIsSelected(ids);
      cardList.clearCardList();
      cardList.renderCardList(beers);
    });

  document.getElementById('numberFilter')
    .addEventListener('click', e => {
      const ids = localStore.getFromLocalStorage();
      e.preventDefault();
      sortInOrder('id');
      localStore.setIsSelected(ids);
      cardList.clearCardList();
      cardList.renderCardList(beers);
    });

  document.getElementById('closeHeeader')
    .addEventListener('click', () => {
      document.querySelector('.header').style.display = 'none';
    });
}

addListeners();

async function getData(url) {
  let response = await fetch(url);
  let result = await response.json();

  return result;
}

function loadGoods() {
  config.page++;
  getData(`https://api.punkapi.com/v2/beers?page=${config.page}&per_page=${config.per_page}`)
    .then(res => {
      const ids = localStore.getFromLocalStorage();
      const newBeers = res.map(obj => ({data: obj, isSelected: false}));
      beers.push(...newBeers);
      localStore.setIsSelected(ids);
      cardList.renderCardList(newBeers);
    });
}


function sortInOrder(key) {
  if (!beers || !beers.length) {
    return
  }

  beers.sort((a, b) => a.data[key] > b.data[key] ? config.order : -config.order);
  config.order = -config.order;
}
