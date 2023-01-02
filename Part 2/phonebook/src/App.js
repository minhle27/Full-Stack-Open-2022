import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNum] = useState('')
  const [search, setSearch] = useState('')

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
      <div>
        filter shown with
        <input value={search} onChange={handleSearch} />
      </div>
      <h3>add a new</h3>
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
      <h2>Numbers</h2>
      <ul>
        {persons.filter((person) => checkSearch(person)).map(person => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App