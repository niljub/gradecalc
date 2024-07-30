import React, { useState } from 'react';
import './App.css';

function App() {
  const [courses, setCourses] = useState([
    { name: 'Mathematics', grade: '3.5', ects: '5' },
    { name: 'Physics', grade: '2.7', ects: '4' },
  ]);
  const [average, setAverage] = useState(null);

  const handleInputChange = (index, event) => {
    const values = [...courses];
    values[index][event.target.name] = event.target.value;
    setCourses(values);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { name: '', grade: '', ects: '' }]);
  };

  const handleCalculateAverage = () => {
    const totalEcts = courses.reduce((acc, course) => acc + parseFloat(course.ects || 0), 0);
    const weightedSum = courses.reduce((acc, course) => acc + (parseFloat(course.grade || 0) * parseFloat(course.ects || 0)), 0);
    const weightedAverage = weightedSum / totalEcts;
    setAverage(weightedAverage.toFixed(2));
  };

  return (
    <div className="App">
      <div className="calculator">
        <h1>College Grade Calculator</h1>
        {courses.map((course, index) => (
          <div key={index} className="course">
            <input
              type="text"
              name="name"
              placeholder="Course Name"
              value={course.name}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="number"
              name="grade"
              placeholder="Grade"
              value={course.grade}
              onChange={(event) => handleInputChange(index, event)}
              step="0.1"
              min="1"
              max="4"
            />
            <input
              type="number"
              name="ects"
              placeholder="ECTS"
              value={course.ects}
              onChange={(event) => handleInputChange(index, event)}
              step="0.1"
              min="0"
            />
          </div>
        ))}
        <button onClick={handleAddCourse}>Add Course</button>
        <button onClick={handleCalculateAverage}>Calculate Average</button>
        {average !== null && (
          <div className="result">
            <h2>Weighted Average Grade: {average}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
