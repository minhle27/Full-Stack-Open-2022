import { useEffect, useState } from 'react'
import personService from './services/persons'

const Filter = ({search, handleSearch}) => {
  return (
    <div>
      filter shown with
      <input value={search} onChange={handleSearch} />
    </div>
  )
}

const PersonForm = ({newName, newNum, handleChangeName, handleChangeNum, addNew}) => 
  <form onSubmit={addNew}>
    <div>
      name: <input value={newName} onChange={handleChangeName} />
    </div>
    <div>
      number: <input value={newNum} onChange={handleChangeNum} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>


const Persons = ({persons, checkSearch, setPersons}) => {
  const handleDelete = (person) => {
    if (window.confirm(`Do you really want to delete this phone number: ${person.number} -- ${person.name}?`)) {
      personService
        .letDelete(person.id)
        .then(() => {
          personService.getAll().then(modifiedPersons => setPersons(modifiedPersons))
        })
    }
  }

  return (
    <ul>
      {persons.filter((person) => checkSearch(person)).map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>Delete</button></li>)}
    </ul>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNum] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => setPersons(initialPerson))
  }, [])

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNum = (event) => {
    setNum(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const checkSearch = (person) => person.name.toLowerCase().includes(search.toLowerCase())

  const nameArr = persons.map(person => person.name)
  const addNew = (event) => {
    event.preventDefault()
    if (nameArr.find(each => each === newName) !== undefined){
      alert(`${newName} is already added to the phonebook`)
    }
    else{
      const newDude = {
        name: newName, 
        number: newNum, 
      }

      personService
        .create(newDude)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNum('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter search={search} handleSearch={handleSearch} />

      <h3>add a new</h3>

      <PersonForm newName={newName} newNum={newNum} handleChangeName={handleChangeName} handleChangeNum={handleChangeNum} addNew={addNew} />

      <h3>Numbers</h3>

      <Persons persons={persons} checkSearch={checkSearch} setPersons={setPersons} />
    </div>
  )
}

export default App