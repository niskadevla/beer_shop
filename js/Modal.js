export class Modal {
  constructor(selector) {
    this.$modal = document.querySelector(selector);
    this.showModal = this.showModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._addHandlerForClose();
  }

  showModal() {
    this.$modal.style.display = 'block';
  }

  _closeModal() {
    this.$modal.style.display = ''
  }

  _addHandlerForClose() {
    this.$modal.querySelector('.btn-close')
      .addEventListener('click', this._closeModal);
  }
}
