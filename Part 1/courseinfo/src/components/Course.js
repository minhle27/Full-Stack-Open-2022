const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <h3>total of {sum} exercises</h3>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
      <Part key={part.id} part={part}/>
    )}
  </>

const Course = ({courses}) => {
    return (
      <>
        {courses.map(each => {
          const total = each.parts.reduce((sum, order) => sum + order.exercises, 0)
          return(
            <div key={each.id}>
              <Header course={each.name} />
              <Content parts={each.parts}/>
              <Total sum={total} />
            </div>
          )
        })}
      </>
    )
  }

  
export default Course