export class LocalStore {
  constructor() {
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
  }

  getFromLocalStorage() {
    const ls = JSON.parse(localStorage.getItem('selectedBeers'));

    if (ls && ls.length) {
      return ls
    }
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

    const index = ls.findIndex(item => item === id);

    if (index !== -1) {
      ls.splice(index, 1);
      localStorage.setItem('selectedBeers', JSON.stringify(ls));
    }
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
