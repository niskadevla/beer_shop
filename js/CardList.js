import {ElementFabric} from './ElementFabric.js';
const elementFabric = new ElementFabric();

export class CardList {
  constructor(selector) {
    this.$root = document.querySelector(selector);
  }

  renderCardList() {
    this.$root.innerHTML = '';
    beers.forEach(({data, isSelected}) => {
      const beersData = {
        id: data.id,
        image_url: data.image_url,
        name: data.name,
        abv: data.abv,
      };

      const $card = elementFabric.createEl('li',
                                           {
                                             id: beersData.id,
                                             className: ['card-list__item'],
                                           });

      const $list = elementFabric.createEl('ul', {className: ['content-list']});

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
        const $listItem = elementFabric.createEl('li',
                                                 {className: ['content-list__item']},
                                                 $link);

        $list.append($listItem);
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
                                                  className: ['content-list__item']
                                                },
                                                $link
                                              );

      $list.append($listItem);
      $card.append($list);
      this.$root.append($card);
    });
  }
}
