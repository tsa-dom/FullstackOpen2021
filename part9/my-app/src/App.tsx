import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Title = ({ name, count }: { name: string, count: number }) => <div style={{ fontWeight: 'bold' }}>{name} {count}</div>
const Description = ({ description }: { description: string}) => <div style={{ fontStyle: 'italic' }}>{description}</div>

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <Title name={part.name} count={part.exerciseCount} />
          <Description description={part.description} />
          <p></p>
        </div>
      )
    case 'groupProject':
      return (
        <div>
          <Title name={part.name} count={part.exerciseCount} />
          <div>project exercises {part.groupProjectCount}</div>
          <p></p>
        </div>
      )
    case 'submission':
      return (
        <div>
          <Title name={part.name} count={part.exerciseCount} />
          <Description description={part.description} />
          <div>submit to {part.exerciseSubmissionLink}</div>
          <p></p>
        </div>
      )
    case 'special':
      return (
        <div>
          <Title name={part.name} count={part.exerciseCount} />
          <Description description={part.description} />
          <div>required skils: {part.requirements.join(', ')}</div>
          <p></p>
        </div>
      )
    default:
      return (
        <div></div>
      )
  }
}

const Header = ({ courseName }: { courseName: string }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  )
}

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {courseParts.map(part => <Part key={part.name} part={part} />)}
    </div>
  )
}

const Total = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;