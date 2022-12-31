import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Title = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(7).fill(0))

  const nextAnecdote = () => {
    const id = Math.floor(Math.random() * 7)
    setSelected(id)
  }

  const voteClick = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  }

  const findMaxID = (vote) => {
    const mostVotes = Math.max(...vote)
    console.log(mostVotes)
    for (let i = 0; i < vote.length; i++){
      if (vote[i] === mostVotes){
        return i;
      }
    }
  }

  console.log(vote)
  return (
    <div>
      <Title text="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={voteClick} text="vote"/>
      <Button handleClick={nextAnecdote} text="next anecdote"/>
      <Title text="Anecdote with most votes"/>
      <p>{anecdotes[findMaxID(vote)]}</p>
    </div>
  )
}

export default App