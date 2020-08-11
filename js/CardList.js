import {ElementFabric} from './ElementFabric.js';
const elementFabric = new ElementFabric();

export class CardList {
  constructor(selector) {
    this.$root = document.querySelector(selector);
  }

  renderCardList() {
    this.$root.innerHTML = '';
    beers.forEach(beer => {
      const {isSelected} = beer;
      const data = {};
      data.id = beer.data.id;
      data.image_url = beer.data.image_url;
      data.name = beer.data.name;
      data.abv = beer.data.abv;
      const $card = elementFabric.createEl('li', {
                                          id: data.id,
                                          className: ['card-list__item'],
                                        });

      const $list = elementFabric.createEl('ul', {
                                          className: ['content-list']
                                        });

      for(let key in data) {
        let $img = '';

        if (key == 'image_url') {
          $img = elementFabric.createEl('img', {
                                              width: '25',
                                              height: '50',
                                              src: `${data[key]}`,
                                              alt: `${data.name}`
                                            });
        }

        const $link = elementFabric.createEl('a', {
                                              className: ['content-list__link']
                                            },
                                            $img || data[key]);
        const $listItem = elementFabric.createEl('li', {
                                                  className: ['content-list__item']
                                                },
                                                $link);

        $list.append($listItem);
      }

      const $checkbox = elementFabric.createEl('input', {
                                          type: 'checkbox',
                                          checked: beer.isSelected
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
