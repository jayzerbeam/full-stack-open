import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div>
      <form>
        <input type="text" onChange={handleChange} />
        {searchResults.length <= 0 ? (
          <p>No results from your search</p>
        ) : (
          <ul>
            {searchResults.map((country) => (
              <li key={country.name.common}>{country.name.common}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default App;
