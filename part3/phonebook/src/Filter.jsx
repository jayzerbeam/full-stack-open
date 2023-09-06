function Filter({ handleFilter }) {
  return (
    <div>
      Filter by: <input onChange={handleFilter} />
    </div>
  );
}

export default Filter;
