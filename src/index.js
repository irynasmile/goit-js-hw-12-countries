import debounce from 'lodash.debounce';
import countryes from './templates/markup_countryes.hbs';
// console.log('countryes:', countryes);
import country from './templates/markup_country.hbs';
// console.log('country:', country());
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotify from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import './sass/main.scss';

const refs = {
  input: document.querySelector('.input'),
  cardContainer: document.querySelector('.card-container'),
};

function fetchCountries(countrySearch) {
  return fetch(`https://restcountries.eu/rest/v2/name/${countrySearch}`)
    .then(response => {
      // console.log(response);
      if (!response.ok) {
        alert('Bad Request!!!');
        throw new Error('Bad Request!!!');
      } else {
        return response.json();
      }
    })
    .then(showCountry)
    .catch(console.error())
    .finally(() => (refs.input.value = ''));
}

refs.input.addEventListener(
  'input',
  debounce(() => {
    let countrySearch = refs.input.value;
    // console.log('countrySearch', countrySearch);
    if (!countrySearch) return;
    fetchCountries(countrySearch);
  }, 500),
);

function showCountry(data) {
  console.log('data :', data);
  if (data.length === 1) {
    refs.cardContainer.innerHTML = country(data);
  } else if (data.length > 1 && data.length <= 10) {
    refs.cardContainer.innerHTML = countryes(data);
  } else if (data.length > 10) {
    err();
  }
}

function err() {
  PNotify.error({
    title: 'Oh No!',
    text: 'Too many mathes found. please enter a more specific query!',
  });
}
