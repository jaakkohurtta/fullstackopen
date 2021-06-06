export const PersonForm = ({ handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <div className="mt-5 mb-5">
      <h3>Add new</h3>
      <form>
        <div className="row">
        <span className="flex-1 input-group">
          <input id="nameInputField" className="person-form-input" type="text" placeholder="name.." onChange={handleNameChange} />
        </span>
        <span className="flex-1 input-group">
          <input id="numberInputField" className="person-form-input" type="text" placeholder="number.." onChange={handleNumberChange} />
        </span>
        <button className="flex-1 add-btn" type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      </div>
  )
}

export default PersonForm
