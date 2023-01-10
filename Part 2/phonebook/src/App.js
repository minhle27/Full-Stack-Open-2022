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

const PersonForm = ({newName, newNum, handleChangeName, handleChangeNum, persons, setPersons, setNewName, setNum, setSuccessMessage}) => {

  const addNew = (event) => {
    event.preventDefault()
    const target = persons.find(each => each.name === newName)

    if (target !== undefined){
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)){
        const changedNum = {...target, number: newNum}

        personService
          .update(target.id, changedNum)
          .then(returnedNum => {
            setPersons(persons.map(person => person.id !== target.id ? person : returnedNum))
            setSuccessMessage(`Updated number: ${newNum} for '${newName}'`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setNewName('')
            setNum('')
          })
      }
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
          setSuccessMessage(`Added '${newName}'`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName('')
          setNum('')
        })
    }
  }

  return (
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
  )
}


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

const Notification = ({ message }) => {
  if (message === null){
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNum] = useState('')
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

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


  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={successMessage} />

      <Filter search={search} handleSearch={handleSearch} />

      <h3>add a new</h3>

      <PersonForm newName={newName} newNum={newNum} handleChangeName={handleChangeName} handleChangeNum={handleChangeNum} persons={persons} setPersons={setPersons} setNewName={setNewName} setNum={setNum} setSuccessMessage={setSuccessMessage} />

      <h3>Numbers</h3>

      <Persons persons={persons} checkSearch={checkSearch} setPersons={setPersons} />
    </div>
  )
}

export default App