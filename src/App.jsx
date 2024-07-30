import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Autocomplete,
  Typography,
  Box,
  Grid,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const universityCourses = {
    'Hochschule Darmstadt': [
      { name: 'Einführung in die Wirtschaftsinformatik', grade: '', ects: '5' },
      { name: 'Grundlagen der diskreten Mathematik', grade: '', ects: '5' },
      { name: 'IT-Sicherheit', grade: '', ects: '5' },
      { name: 'Programmieren / Algorithmen und Datenstrukturen 1', grade: '', ects: '7.5' },
      { name: 'Technische Grundlagen der Informatik', grade: '', ects: '5' },
      { name: 'IT-Recht und Datenschutz', grade: '', ects: '2.5' },
      { name: 'Lineare Algebra und Wahrscheinlichkeitsrechnung', grade: '', ects: '5' },
      { name: 'Netzwerke', grade: '', ects: '5' },
      { name: 'Objektorientierte Analyse und Design', grade: '', ects: '5' },
      { name: 'Programmieren / Algorithmen und Datenstrukturen 2', grade: '', ects: '7.5' },
      { name: 'Rechnerarchitektur', grade: '', ects: '5' },
      { name: 'Betriebssysteme', grade: '', ects: '5' },
      { name: 'Datenbanken 1', grade: '', ects: '5' },
      { name: 'Grundlagen der Analysis', grade: '', ects: '2.5' },
      { name: 'Mikroprozessorsysteme', grade: '', ects: '5' },
      { name: 'Nutzerzentrierte Softwareentwicklung', grade: '', ects: '5' },
      { name: 'Software Engineering', grade: '', ects: '5' },
      { name: 'Wissenschaftliches Arbeiten in der Informatik 1', grade: '', ects: '2.5' },
      { name: 'Datenbanken 2', grade: '', ects: '2.5' },
      { name: 'Entwicklung webbasierter Anwendungen', grade: '', ects: '5' },
      { name: 'Graphische Datenverarbeitung', grade: '', ects: '5' },
      { name: 'Informatik und Gesellschaft', grade: '', ects: '2.5' },
      { name: 'Projektmanagement', grade: '', ects: '2.5' },
      { name: 'Theoretische Informatik', grade: '', ects: '7.5' },
      { name: 'Verteilte Systeme', grade: '', ects: '5' },
      { name: 'Projekt Systementwicklung', grade: '', ects: '7.5' },
      { name: 'Wissenschaftliches Arbeiten in der Informatik 2', grade: '', ects: '2.5' },
      { name: 'Praxismodul', grade: '', ects: '15' },
      { name: 'Bachelormodul', grade: '', ects: '15' },
      { name: 'Technikfolgenabschätzung in der Produ', grade: '', ects: '2.5' },
      { name: 'Penetration Testing', grade: '', ects: '5' },
      { name: 'Introduction to Artificial Intelligence', grade: '', ects: '5' },
      { name: 'Softwareentwicklung für HMI-Systeme', grade: '', ects: '5' },
      { name: 'Netzwerksicherheit', grade: '', ects: '5' },
      { name: 'Unix for Software Developers', grade: '', ects: '5' },
      { name: 'Data Warehouse Technologien', grade: '', ects: '5' },
    ],
    UniversityB: [
      { name: 'Fundamentals of Algorithms', grade: '', ects: '3' },
      // More courses specific to University B
    ],
    // Additional universities with their course lists
  };

  const [courses, setCourses] = useState([]);
  const [average, setAverage] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState('Hochschule Darmstadt'); // Default selection

  useEffect(() => {
    setCourses(universityCourses[selectedUniversity] || []);
  }, [selectedUniversity]);

  const handleInputChange = (index, event) => {
    const values = [...courses];
    values[index][event.target.name] = event.target.value;
    setCourses(values);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { name: '', grade: '', ects: '' }]);
  };

  const handleRemoveCourse = (index) => {
    const values = [...courses];
    values.splice(index, 1);
    setCourses(values);
  };

  const handleCalculateAverage = () => {
    const totalEcts = courses.reduce((acc, course) => acc + parseFloat(course.ects || 0), 0);
    const weightedSum = courses.reduce((acc, course) => acc + (parseFloat(course.grade || 0) * parseFloat(course.ects || 0)), 0);
    const weightedAverage = weightedSum / totalEcts;
    setAverage(weightedAverage.toFixed(2));
  };

  const handleUniversityChange = (event, value) => {
    if (value && universityCourses[value]) {
      setSelectedUniversity(value);
    } else {
      setSelectedUniversity('');
      setCourses([]);
    }
  };

  return (
    <Container className="App" sx={{ maxHeight:"95vh", display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 0 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Grade Calculator
        </Typography>
        <br />
        <Autocomplete
          sx={{ marginBottom: '25px' }}
          value={selectedUniversity}
          onChange={handleUniversityChange}
          options={Object.keys(universityCourses)}
          renderInput={(params) => <TextField {...params} label="Select University" variant="outlined" />}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {courses.map((course, index) => (
          <Grid container spacing={2} key={index} sx={{ marginTop:'4px', alignItems: 'center' }}>
            <Grid item xs>
              <TextField
                fullWidth
                label="Course Name"
                name="name"
                value={course.name}
                onChange={(event) => handleInputChange(index, event)}
                variant="outlined"
              />
            </Grid>
            <Grid item width={120}>
              <TextField
                fullWidth
                label="Grade"
                name="grade"
                value={course.grade}
                onChange={(event) => handleInputChange(index, event)}
                variant="outlined"
                type="number"
                step="0.1"
                min="1"
                max="4"
              />
            </Grid>
            <Grid item width={120}>
              <TextField
                fullWidth
                label="ECTS"
                name="ects"
                value={course.ects}
                onChange={(event) => handleInputChange(index, event)}
                variant="outlined"
                type="number"
                step="1"
                min="0"
              />
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleRemoveCourse(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Box sx={{ flexGrow: 0, mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddCourse}>
          Add Course
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCalculateAverage} sx={{ ml: 2 }}>
          Calculate Average
        </Button>
      </Box>
      {average !== null && (
        <Box className="result" sx={{ mt: 4 }}>
          <Typography variant="h5">Weighted Average Grade: {average}</Typography>
        </Box>
      )}
    </Container>
  );
}

export default App;
