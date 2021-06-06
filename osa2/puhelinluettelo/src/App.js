import React, { useState, useEffect } from 'react'
import fonebookService from "./services/fonebookService"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Fonebook from "./components/Fonebook"
import InfoMessage from "./components/InfoMessage"

const App = () => {
  const [ phonebook, setPhonebook ] = useState([]) 
  const [ newName, setNewName ] = useState("")
  const [ newNumber, setNewNumber ] = useState("")
  const [ filter, setFilter ] = useState("")
  const [ infoMessage, setInfoMessage ] = useState({ content: null, type: null })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { 
    fonebookService.read()
      .then(phonebookData => { 
        setPhonebook(phonebookData)
        console.log("Fonebook database loaded.")
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  // Add / Update person to fonebook
  const addPerson = (e) => {
    e.preventDefault()

    let confirmUpdate
    const newPerson = { name: newName, number: newNumber }
    const personExists = phonebook.find(person => person.name === newPerson.name)
    // console.log(personExists)

    // if person exists prompt for update
    if(personExists) {
      confirmUpdate = window.confirm(`${newPerson.name} already exists in Fonebook, update the old number with new one?`)
    }
    
    if(confirmUpdate) {
      const id = phonebook.find(person => person.name === newPerson.name).id
      fonebookService.update(id, newPerson)
        .then(updatedPerson => {
          setPhonebook(phonebook.map(person => person.id !== id ? person : updatedPerson))

          // logs
          displayInfoMessage(`${updatedPerson.name} number updated.`, "msg-info")
          console.log(`${updatedPerson.name} number updated.`)
          clearInputState()
        })
        .catch(err => {
          displayInfoMessage(`No ${phonebook.find(person => person.id === id).name} found on Fonebook.`, "msg-alert")
          setPhonebook(phonebook.filter(person => person.id !== id))
          console.log(err)
        })
    } else {
      fonebookService.create(newPerson)
        .then(returnedPerson => {
          setPhonebook(phonebook.concat(returnedPerson))

          // logs
          console.log(`${returnedPerson.name} added to Fonebook`)
          displayInfoMessage(`${returnedPerson.name} added to Fonebook.`, "msg-info")
          clearInputState()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  // Delete person from fonebook
  const deletePerson = (id) => {
    // console.log(id)
    const deletedPerson = phonebook.find(person => person.id === id).name
    let confirm = window.confirm(`Delete ${deletedPerson} from Fonebook?`) 
    
    if(confirm) {
      fonebookService.del(id)
      .then(() => {
        setPhonebook(phonebook.filter(person => person.name !== deletedPerson))

        // logs
        displayInfoMessage(`${deletedPerson} was removed from Fonebook.`, "msg-info")
        console.log(`${deletedPerson} was removed from Fonebook.`)
      })
      .catch(err => {
        console.log(err)
        displayInfoMessage(`No ${deletedPerson} found on Fonebook.`, "msg-alert")
        setPhonebook(phonebook.filter(person => person.id !== id))
      })
    } else {
      displayInfoMessage(`Deletion cancelled by user.`, "msg-info")
      console.log("Deletion cancelled by user.")
    }
  }

  // Helpers
  const clearInputState = () => {
    document.getElementById("nameInputField").value = ""
    document.getElementById("numberInputField").value = ""
  }

  const displayInfoMessage = (content, type) => {
    setInfoMessage({ content, type })

    setTimeout(() => {
      setInfoMessage({ content:null, type:null })
    }, 3000)
  }  

  return (
    <div className="container">
      <h2>Fonebook</h2>
      <InfoMessage message={infoMessage} />
      <PersonForm   
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson} 
        />
      <hr className="mt-10 mb-10"></hr>
      <Filter 
        handleFilterChange={handleFilterChange} 
        />
      <Fonebook 
        phonebook={phonebook}
        filter={filter}
        onClick={deletePerson}
        />
    </div>
  )
}

export default App