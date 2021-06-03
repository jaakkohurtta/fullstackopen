export const PersonForm = ({ handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>add</button>
      </div>
  </form>
  )
}

export default PersonForm
