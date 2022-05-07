import './css/styles.css';
import fetchCountries from './components/fetchCountries';
import createMarkupMultipleCountries from './components/multipleCountriesMarkup';
import createMarkupOneCountry from './components/singleCountryMarkup';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 500;
const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');

inputRef.addEventListener(
  'input',
  debounce(event => handleInput(event), DEBOUNCE_DELAY),
);

function handleInput(event) {
  if (!event.target.value) {
    return clearMarkup();
  }

  fetchCountries(event.target.value)
    .then(renderCountriesList)
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      clearMarkup();
    });
}

function renderCountriesList(countries) {
  if (countries.length > 10) {
    clearMarkup();

    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.',
    );
  }

  countries.length > 1
    ? (countryListRef.innerHTML = countries
        .map(createMarkupMultipleCountries)
        .join(''))
    : (countryListRef.innerHTML = createMarkupOneCountry(countries[0]));
}

const clearMarkup = () => (countryListRef.innerHTML = '');
