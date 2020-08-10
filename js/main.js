import {Modal} from './Modal.js';

const modalSignin = new Modal('#modalSignin');


function addListeners() {
  document.getElementById('btnSignin')
    .addEventListener('click', modalSignin.showModal);

  document.getElementById('btnSignup')
    .addEventListener('click', modalSignin.showModal);
}

addListeners();
