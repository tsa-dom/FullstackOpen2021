import React from 'react'

const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

const Content = ({ parts }) => {
  return (
    <div>
      { parts.map(part => <Part key={part.id} part={part}/>) }
    </div>
  )
}

const Total = ({ parts }) => <b> total of { parts.reduce((total, part) => total + part.exercises, 0) } exercises </b>

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course