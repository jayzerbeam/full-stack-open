import { useState } from "react";
import Filter from "./Filter";
import Persons from "./Persons";
import PersonForm from "./PersonForm";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");

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

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>Add an entry</h2>
      <PersonForm
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        handleSubmit={handleSubmit}
      />
      <h2>Entries</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  );
}

export default App;