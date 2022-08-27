import { ICourseInfo } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const Header = ({ courseName }: { courseName: string }) => (
    <h1>{courseName}</h1>
  );

  const Content = ({ courses }: { courses: Array<ICourseInfo> }) => {
    return (
      <div>
        {courses.map(course => (
          <p key={course.name}>
            {course.name} {course.exerciseCount}
          </p>
        ))}
      </div>
    )
  }

  const Total = ({ courses }: { courses: Array<ICourseInfo> }) => {
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