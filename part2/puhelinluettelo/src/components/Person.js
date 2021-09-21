const Person = ({ person, onClick }) => {
  return (
    <tr>
      <td className="flex-2">{person.name}</td>
      <td className="flex-1">{person.number}</td>
      <td className="flex-2 fpull-right"><button className="delete-btn" onClick={() => onClick(person.id)}>X</button></td>
    </tr>
  )
}

export default Person