import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isDupeEntry()) {
      setPersons(
        [...persons].concat({
          name: newName,
          number: newNumber,
          id: persons[persons.length - 1].id + 1,
        }),
      );
    } else {
      alert(`${newName} is already in the phonebook.`);
    }
  };

  const isDupeEntry = () => {
    return persons.some((entry) => {
      return entry.name.toLowerCase() === newName.toLowerCase();
    });
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const filterEntries = (e) => {
    setFilterValue(e.target.value);
    // Must make a new filtered array
    const filteredPersons = persons.filter((person) => {
      person;
    });
    return filteredPersons;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter with <input onChange={filterEntries} />
      </div>
      <form>
        <h2>Add an entry</h2>
        <div>
          name: <input onChange={handleNameInput} />
        </div>
        <div>
          number: <input onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Entries</h2>
      {filterValue !== "" ? (
        <p>Test</p>
      ) : (
        persons.map((person) => (
          <p key={person.id}>
            {person.name}, {person.number}
          </p>
        ))
      )}
    </div>
  );
}

export default App;
