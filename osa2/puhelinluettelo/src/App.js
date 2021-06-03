import React, { useState, useEffect } from 'react'
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState("")
  const [ newNumber, setNewNumber ] = useState("")
  const [ filter, setFilter ] = useState("")

  useEffect(() => {
    console.log("inside useEffect")
    axios
      .get("http://localhost:3001/persons")
      .then(res => {
        console.log(res.data)
        setPersons(res.data)
      })
  }, [])

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const addPerson = (e) => {
    e.preventDefault()
    let found = false

    persons.forEach(person => {
      if(person.name === newName) {
        found = true
      }
    })

    if(found) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = [ ...persons ]
      newPersons.push({ name: newName, number: newNumber })
  
      setPersons(newPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        handleFilterChange={handleFilterChange} 
        />
      <h3>Add new</h3>
      <PersonForm   
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson} 
        />
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        filter={filter}
        />
    </div>
  )
}

export default App