import { useEffect, useState } from "react";
import dbService from "./services/database.js";
import Filter from "./Filter";
import Persons from "./Persons";
import PersonForm from "./PersonForm";

function App() {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dbService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    const entry = persons.find((person) => person.id === id);

    if (window.confirm(`Are you sure you want to delete '${entry.name}'?`)) {
      dbService.remove(id).then(() => {
        setPersons(
          persons.filter((person) => {
            return person.id !== id;
          }),
        );
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: newName,
      number: newNumber,
    };

    if (!isDupeEntry()) {
      dbService.create(data).then((response) => {
        setPersons(persons.concat(response.data));
      });
    } else {
      const entry = persons.find((person) => person.name === newName);

      if (window.confirm(`${newName} is in the database. Update number?`)) {
        dbService.updateNumber(entry.id, data).then(() => {
          dbService.getAll().then((response) => {
            setPersons(response.data);
          });
        });
      }
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
      <Persons filter={filter} persons={persons} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
