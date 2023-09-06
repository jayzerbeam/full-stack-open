import Person from "./Person";

function Persons({ filter, persons, handleDelete }) {
  return (
    <div>
      {filter !== ""
        ? persons
            .filter((person) =>
              person.name.toLowerCase().includes(filter.toLowerCase()),
            )
            .map((person) => (
              <Person
                key={person.id}
                person={person}
                handleDelete={handleDelete}
              />
            ))
        : persons.map((person) => (
            <Person
              key={person.id}
              person={person}
              handleDelete={handleDelete}
            />
          ))}
    </div>
  );
}
export default Persons;
