import {ElementFabric} from './ElementFabric.js';
const elementFabric = new ElementFabric();

export class CardList {
  constructor(selector) {
    this.$root = document.querySelector(selector);
  }

  renderCardList() {
    while (this.$root.children[1]) {
      this.$root.lastElementChild.remove();
    }

    beers.forEach(({data, isSelected}) => {
      const beersData = {
        id: data.id,
        image_url: data.image_url,
        name: data.name,
        food_pairing: data.food_pairing,
        abv: data.abv,        
      };

      const $card = elementFabric.createEl('li',
                                           {
                                             id: beersData.id,
                                             className: ['card-list__item', 'content-list', 'd-tr'],
                                           });

      for(let key in beersData) {
        let $img = '';

        if (key == 'image_url') {
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
      const $listItem = elementFabric.createEl('li', {
                                                  className: ['content-list__item', 'd-td']
                                                },
                                                $link
                                              );

      $card.append($listItem);
      this.$root.append($card);
    });
  }
}
