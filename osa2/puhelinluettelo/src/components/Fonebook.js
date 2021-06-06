import Person from "./Person"

const Fonebook = ({ phonebook, filter, onClick }) => {
  return (
    <div className="mt-5 mb-5">
      <table>
        <tbody>
          {phonebook.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => (
            <Person key={person.name} person={person} onClick={onClick} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Fonebook