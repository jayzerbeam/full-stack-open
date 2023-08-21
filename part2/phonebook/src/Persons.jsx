function Persons({ filter, persons }) {
  return (
    <div>
      {filter !== ""
        ? persons
            .filter((person) =>
              person.name.toLowerCase().includes(filter.toLowerCase()),
            )
            .map((person) => (
              <p key={person.id}>
                {person.name}, {person.number}
              </p>
            ))
        : persons.map((person) => (
            <p key={person.id}>
              {person.name}, {person.number}
            </p>
          ))}
    </div>
  );
}
export default Persons;
