import axios from 'axios'
import { useEffect, useState } from 'react'

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


const Persons = ({persons, checkSearch}) => 
  <ul>
    {persons.filter((person) => checkSearch(person)).map(person => <li key={person.id}>{person.name} {person.number}</li>)}
  </ul>


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNum] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
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
      const newDude = {name: newName, number: newNum, id: nameArr.length + 1}
      setPersons(persons.concat(newDude))
      setNewName('')
      setNum('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter search={search} handleSearch={handleSearch} />

      <h3>add a new</h3>

      <PersonForm newName={newName} newNum={newNum} handleChangeName={handleChangeName} handleChangeNum={handleChangeNum} addNew={addNew} />

      <h3>Numbers</h3>

      <Persons persons={persons} checkSearch={checkSearch} />
    </div>
  )
}

export default App