import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./Country";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setAllCountries(response.data);
    });
  }, []);

  if (!allCountries) return null;

  const handleChange = (event) => {
    let searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setSearchResults(
      allCountries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }),
    );
  };

  const searchResultOutput = () => {
    if (searchResults.length === 1) {
      return (
        <>
          {searchResults.map((country) => (
            <Country country={country} />
          ))}
        </>
      );
    } else if (searchResults.length <= 0) {
      return <p>No results from your search.</p>;
    } else if (searchResults.length >= 10) {
      return <p>Too many results. Specify another filter</p>;
    } else {
      return (
        <ul>
          {searchResults.map((country, idx) => (
            <li key={country.name.common}>
              <span>{country.name.common}&nbsp;</span>
              <button onClick={() => getCountryDetails(idx)}>
                show details
              </button>
            </li>
          ))}
        </ul>
      );
    }
  };

  const getCountryDetails = (idx) => {
    const countryDetails = searchResults[idx];
    console.log("details: ", countryDetails);
  };

  return (
    <div>
      <form>
        <input type="text" onChange={handleChange} />
      </form>
      <div>{searchResultOutput()}</div>
    </div>
  );
}

export default App;
