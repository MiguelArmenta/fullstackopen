const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <b>Number of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part=>
      <Part key={part.id} part={part} />
    )}
  </>

const Course = ({course}) =>
  <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        0,
      )} />
    </div>

export default Course