import {ElementFabric} from './ElementFabric.js';
const elementFabric = new ElementFabric();

export class CardList {
  constructor(selector) {
    this.$root = document.querySelector(selector);
  }

  renderCardList() {
    beers.forEach(beer => {
      const $card = elementFabric.createEl('li', {
                                          className: ['card-list__item']
                                        });

      const $list = elementFabric.createEl('ul', {
                                          className: ['content-list']
                                        });
      const {isSelected} = beer;
      const data = {};
      data.id = beer.data.id;
      data.image_url = beer.data.image_url;
      data.name = beer.data.name;
      data.abv = beer.data.abv;

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
      console.log(this.$root);
      this.$root.append($card);
    });
  }
}
