import {Modal} from './Modal.js';

const modalSignin = new Modal('#modalSignin');
const modalSignup = new Modal('#modalSignup');


function addListeners() {
  document.getElementById('btnSignin')
    .addEventListener('click', modalSignin.showModal);

  document.getElementById('btnSignup')
    .addEventListener('click', modalSignup.showModal);
}

addListeners();
