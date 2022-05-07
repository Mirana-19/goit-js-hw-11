const BASE_URL = 'https://restcountries.com/v3.1/name/';
const parameters = '?fields=name,capital,population,flags,languages';

export default function fetchCountries(country) {
  return fetch(`${BASE_URL}${country.trim()}${parameters}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
