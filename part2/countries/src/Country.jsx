function Country({ country }) {
  const languages = Object.values(country.languages);
  return (
    <div key={country.name.common}>
      <h2>{country.name.common}</h2>
      <p>capitol: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <h3>languages: </h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img width="200" height="200" src={country.flags.png} />
    </div>
  );
}

export default Country;
