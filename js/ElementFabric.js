export class ElementFabric {

  createEl(el = '', props = {}, child) {
    const $el = document.createElement(el);

    for (let prop in props) {
      if (Array.isArray(props[prop])) {
        $el[prop] = props[prop].join(' ');
      } else {
        $el[prop] = props[prop]
      }
    }

    if (child) {
      $el.append(child);
    }

    return $el;
  }
}
