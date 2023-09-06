function PersonForm({ handleNameInput, handleNumberInput, handleSubmit }) {
  return (
    <form>
      <div>
        name: <input onChange={handleNameInput} />
      </div>
      <div>
        number: <input onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add entry
        </button>
      </div>
    </form>
  );
}

export default PersonForm;
