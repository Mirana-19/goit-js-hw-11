export default function createMarkupMultipleCountries(country) {
  return `<li>
        <img
          src="${country.flags.svg}"
          alt="flag of ${country.name}"
          width="50px"
        />
        <p>${country.name.official}</p>
      </li>`;
}
