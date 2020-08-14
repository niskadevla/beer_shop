import {ElementFabric} from './ElementFabric.js';
import {Modal} from './Modal.js';
const elementFabric = new ElementFabric();

export class Bag extends Modal {
  constructor(selector) {
    super(selector);
    this.$root = document.querySelector(selector);
  }

  renderBag(ids) {
    if (!ids || !ids.length) {
      return
    }

    const $button = elementFabric.createEl('button',
                                           {
                                             className: ['btn', 'btn-close'],
                                             type: 'button'
                                           },
                                           'X');

    const $cardList = this.$root.querySelector('.card-list');

    while ($cardList.children[1]) {
      $cardList.lastElementChild.remove();
    }

    const beersFromBag = ids.map(id => beers.find( ({data}) => data.id === id))
                            .filter(data => !!data);

    if (!beersFromBag.length) {
      return
    }

    beersFromBag.forEach(({data}) => {
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

        if (key === 'image_url') {
          $img = elementFabric.createEl('img',
                                        {
                                          width: '25',
                                          height: '50',
                                          src: `${beersData[key]}`,
                                          alt: `${beersData.name}`
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

      $cardList.append($card);
    });

    this.$root.querySelector('.modal__dialog').append($cardList);

    return true;
  }
}
