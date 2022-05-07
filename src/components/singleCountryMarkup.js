export default function createMarkupOneCountry(country) {
  return `<li>
        <img
          src="${country.flags.svg}"
          alt="flag of ${country.name}"
          width="50px"
        />
        <p>${country.name.official}</p>
      </li>
      <li>
        <p>Capital: ${country.capital}</p>
      </li>
      <li>
        <p>Population: ${country.population}</p>
      </li>
      <li>
        <p>Languages: ${[Object.values(country.languages)]}</p>
      </li>`;
}
