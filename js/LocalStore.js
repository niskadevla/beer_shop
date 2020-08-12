import {Bag} from './Bag.js';
const bag = new Bag('#modalBag');

export class LocalStore {
  constructor() {
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
  }

  getFromLocalStorage() {
    const ls = JSON.parse(localStorage.getItem('selectedBeers'));

    if (!ls || !ls.length) {
      return
    }

    return ls;
  }

  saveToLocalStorage(ids) {
    const ls = this.getFromLocalStorage();

    if (ls) {
      ids.push(...ls);
      ids = [...new Set(ids)];
    }

    localStorage.setItem('selectedBeers', JSON.stringify(ids));
  }

  removeFromLocalStorage(id) {
    const ls = this.getFromLocalStorage();

    if (!ls || !ls.length) {
      return
    }

    const index = ls.findIndex(item => item == id);

    if (~index) {
      console.log('remove');
      ls.splice(index, 1);
      localStorage.setItem('selectedBeers', JSON.stringify(ls));
    }
  }

  _findSelectedIDs(selector) {
    const $cardList = document.querySelector(selector);
    const $selectedItems = [...$cardList.children]
                              .filter(child => child.querySelector('input')?.checked);

    const selectedIds = $selectedItems.map($item => +$item.id);
    return selectedIds;
  }

  setIsSelected(selectedIDs) {
    if (!selectedIDs || !selectedIDs.length) {
      return
    }

    selectedIDs.forEach( id => beers.forEach(beer => {
      if (id == beer.data.id) {
        beer.isSelected = true;
      }
    }));

  }

  showSelectedGoods(selector) {
    const selectedIDs = this._findSelectedIDs(selector);

    this.saveToLocalStorage(selectedIDs);
    let ls = this.getFromLocalStorage();

    if (!ls || !ls.length) {
      return
    }

    bag.renderBag(ls);
    bag.showModal();
  }

  clearSelectedGoods(selector) {
    const $root = document.querySelector(selector);

    localStorage.clear();
    beers.forEach(beer => beer.isSelected = false);

    [...$root.children].forEach(child => {
      const $input = child.querySelector('input');

      if ($input) {
        $input.checked = false;
      }
    });
  }
}
