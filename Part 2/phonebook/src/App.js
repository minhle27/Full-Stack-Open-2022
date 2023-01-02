import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567' 
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNum] = useState('')

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNum = (event) => {
    setNum(event.target.value)
  }

  const nameArr = persons.map(person => person.name)
  const addNew = (event) => {
    event.preventDefault()
    if (nameArr.find(each => each === newName) !== undefined){
      alert(`${newName} is already added to the phonebook`)
    }
    else{
      const newDude = {name: newName, number: newNum}
      setPersons(persons.concat(newDude))
      setNewName('')
      setNum('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App