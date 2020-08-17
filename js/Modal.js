export class Modal {
  constructor(selector) {
    this.$modal = document.querySelector(selector);
    this.showModal = this.showModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._addHandlerForForm = this._addHandlerForForm.bind(this);
  }

  showModal() {
    this.$modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    this._addHandlerForClose();
    this._addHandlerForForm();
  }

  _closeModal() {
    this.$modal.style.display = '';
    document.body.style.overflow = '';
  }

  _addHandlerForClose() {
    const $button = this.$modal.querySelector('.btn-close');

    $button && $button.addEventListener('click', this._closeModal);
  }

  _addHandlerForForm() {
    const $form = this.$modal.querySelector('form');

    if (!$form) {
      return
    }

    $form.addEventListener('submit', e => {
      e.preventDefault();
      this._closeModal();
    });
  }
}
