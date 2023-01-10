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

const PersonForm = ({newName, newNum, handleChangeName, handleChangeNum, persons, setPersons, setNewName, setNum, setMessage}) => {

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

            setMessage({
              text: `Updated number: ${newNum} for '${newName}'`,
              flag: true
            })

            setTimeout(() => {
              setMessage({text: null, flag: true})
            }, 5000)

            setNewName('')
            setNum('')
          })
          .catch(error => {
            setMessage({
              text: `${newName} was already deleted from the server, adding new...`,
              flag: false
            })
  
            setTimeout(() => {
              setMessage({text: null, flag: true})
            }, 5000)
            
            personService
            .create({...target, number: newNum})
            .then(() => {
              personService.getAll().then(modifiedPersons => setPersons(modifiedPersons))
              setNewName('')
              setNum('')
            })
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

          setMessage({
            text: `Added '${newName}'`,
            flag: true
          })

          setTimeout(() => {
            setMessage({text: null, flag: true})
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


const Persons = ({persons, checkSearch, setPersons, setMessage}) => {
  const handleDelete = (person) => {
    if (window.confirm(`Do you really want to delete this phone number: ${person.number} -- ${person.name}?`)) {
      personService
        .letDelete(person.id)
        .then(() => {
          //personService.getAll().then(modifiedPersons => setPersons(modifiedPersons))
          setMessage({
            text: `Deleted '${person.name}'`,
            flag: true
          })

          setTimeout(() => {
            setMessage({text: null, flag: true})
          }, 5000)

          setPersons(persons.filter((each) => each.id !== person.id))
        })
        .catch(error => {
          setMessage({
            text: `${person.name} -- ${person.number} was already deleted from the server`,
            flag: false
          })

          setTimeout(() => {
            setMessage({text: null, flag: true})
          }, 5000)

          setPersons(persons.filter((each) => each.id !== person.id))
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
  if (message.text === null){
    return null
  }

  else if (message.flag){
    return (
      <div className='success'>
        {message.text}
      </div>
    )
  }

  return (
    <div className='error'>
      {message.text}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNum] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState({text: null, flag: true})

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
      
      <Notification message={message} />

      <Filter search={search} handleSearch={handleSearch} />

      <h3>add a new</h3>

      <PersonForm newName={newName} newNum={newNum} handleChangeName={handleChangeName} handleChangeNum={handleChangeNum} persons={persons} setPersons={setPersons} setNewName={setNewName} setNum={setNum} setMessage={setMessage} />

      <h3>Numbers</h3>

      <Persons persons={persons} checkSearch={checkSearch} setPersons={setPersons} setMessage={setMessage} />
    </div>
  )
}

export default App