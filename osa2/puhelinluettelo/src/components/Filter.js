const Filter = ({ handleFilterChange }) => {
  return (
    <div className="mt-5 mb-5">
      <input type="text" className="filter-input" placeholder="find a person.." onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
