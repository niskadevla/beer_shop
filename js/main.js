import {Modal} from './Modal.js';

const modalSignin = new Modal('#modalSignin');
const modalSignup = new Modal('#modalSignup');
// const beers = [
//   {
//     data: {
//       id: 1,
//       name: '',
//       abv: 4,
//     },
//     isSelected: false
//   },
// ]

function addListeners() {
  document.getElementById('btnSignin')
    .addEventListener('click', modalSignin.showModal);

  document.getElementById('btnSignup')
    .addEventListener('click', modalSignup.showModal);
}

addListeners();
