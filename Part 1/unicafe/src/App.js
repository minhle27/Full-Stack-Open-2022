import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, data}) => {
  if (text === 'positive') {
    return (
      <>
        <p>{text} {data} %</p>
      </>
    )
  }
  return (
    <>
      <p>{text} {data}</p>
    </>
  )
}

const Statistics = (props) => {
  if (props.all === 0){
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" data={props.good} />
      <StatisticLine text="neutral" data={props.neutral} />
      <StatisticLine text="bad" data={props.bad} />
      <StatisticLine text="all" data={props.all} />
      <StatisticLine text="average" data={props.avg} />
      <StatisticLine text="positive" data={props.pos} /> 
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const avg = (good - bad) / all
  const pos = (good / all) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} pos={pos}/>
    </div>
  )
}

export default App