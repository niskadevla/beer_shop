import {ElementFabric} from './ElementFabric.js';
import {LocalStore} from './LocalStore.js'
const elementFabric = new ElementFabric();
const localStore = new LocalStore();

export class CardList {
  constructor(selector) {
    this.$root = document.querySelector(selector);
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

  handlerForInput() {
    const id = +this.closest('.card-list__item').id;

    if (this.checked) {
      localStore.saveToLocalStorage([id]);
    } else {
      localStore.removeFromLocalStorage(id);
    }
  }

  clearCardList() {
    while (this.$root.children[1]) {
      this.$root.lastElementChild.remove();
    }
  }

  renderCardList(beers) {

    beers.forEach(({data, isSelected}) => {
      const beersData = {
        id: data.id,
        image_url: data.image_url,
        name: data.name,
        food_pairing: data.food_pairing.join(', '),
        abv: data.abv,
      };

      const $card = elementFabric.createEl('li',
                                           {
                                             id: beersData.id,
                                             className: ['card-list__item', 'content-list', 'd-tr'],
                                           });

      for(let key in beersData) {
        let $img = '';

        if (key === 'image_url') {
          $img = elementFabric.createEl('img',
                                        {
                                          width: '25',
                                          height: '50',
                                          src: `${beersData[key]}`,
                                          alt: `${beersData.name}`,
                                        });
        }

        const $link = elementFabric.createEl('a',
                                             {className: ['content-list__link']},
                                             $img || beersData[key]);
        const $listItem = elementFabric.createEl('div',
                                                 {className: ['content-list__item', 'd-td']},
                                                 $link);

        $card.append($listItem);
      }

      const $checkbox = elementFabric.createEl('input', {
                                          type: 'checkbox',
                                          checked: isSelected
                                        });
      const $link = elementFabric.createEl('a', {
                                              className: ['content-list__link']
                                          },
                                          $checkbox);
      const $listItem = elementFabric.createEl('label', {
                                                  className: ['content-list__item', 'd-td']
                                                },
                                                $link
                                              );

      $checkbox.addEventListener('change', this.handlerForInput);

      $card.append($listItem);
      this.$root.append($card);
    });
  }
}
