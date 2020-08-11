import {ElementFabric} from './ElementFabric.js';
import {Modal} from './Modal.js';
const elementFabric = new ElementFabric();

export class Bag extends Modal {
  constructor(selector) {
    super(selector);
    this.$root = document.querySelector(selector);
  }

  renderBag(beers) {
    if (!beers || !beers.length) {
      return
    }

    this.$root.innerHTML = '';
    console.log(this.$root);
    const $div = elementFabric.createEl('div', {
                                        className: ['modal__dialog'],
                                      });
    const $button = elementFabric.createEl('button', {
                                            className: ['btn', 'btn-close'],
                                            type: 'button'
                                          },
                                        'X');
    const $cardList = elementFabric.createEl('ul', {
                                          className: ['card-list']
                                        });

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

      $card.append($list);
      $cardList.append($card);
    });

    $div.append($cardList);
    $div.append($button);
    this.$root.append($div);
  }
}
