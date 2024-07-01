import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <div>
      <table>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.good + props.neutral + props.bad} />
        <StatisticLine text="average" value ={((props.good - props.bad) / (props.good + props.neutral + props.bad)).toString() + ' %'} />
        <StatisticLine text="positive" value ={(props.good / (props.good + props.neutral + props.bad)).toString() + ' %'} />
      </table>
    </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button handleClick={()=>{setGood(good+1)}} text={'Good'} />
      <Button handleClick={()=>{setNeutral(neutral+1)}} text={'Neutral'} />
      <Button handleClick={()=>{setBad(bad+1)}} text={'Bad'} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App