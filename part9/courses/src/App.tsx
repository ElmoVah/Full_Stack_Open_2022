const App = () => {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartDescription {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
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
    }
  ]

  const Header = ({ courseName }: { courseName: string }) => (
    <h1>{courseName}</h1>
  );

  const Content = ({ courses }: { courses: Array<CoursePart> }) => {
    return (
      <div>
        {courses.map(course => (
          <Part key={course.name} course={course} />
        ))}
      </div>
    )
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Part = ({ course }: { course: CoursePart }) => {
    switch (course.type) {
      case 'normal': {
        return (
          <div>
            <p>
              <strong>{course.name} {course.exerciseCount}</strong> <br></br>
              {course.description}
            </p>
          </div>
        )
      }
      case 'groupProject': {
        return (
          <div>
            <p>
              <strong>{course.name} {course.exerciseCount}</strong> <br></br>
              project exercises {course.groupProjectCount}
            </p>
          </div>
        )
      }
      case 'submission': {
        return (
          <div>
            <p>
              <strong>{course.name} {course.exerciseCount}</strong><br></br>
              {course.description}<br></br>
              submit to {course.exerciseSubmissionLink}<br></br>
            </p>
          </div>
        )
      }
      default:
        return assertNever(course);
    }
  }


  const Total = ({ courses }: { courses: Array<CoursePart> }) => {
    return (
      <div>
        <p>
          Number of exercises{" "}
          {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
      </div>
    )
  }

  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;