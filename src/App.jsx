import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Autocomplete, Typography, Box, Grid, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [courses, setCourses] = useState([]);
  const [average, setAverage] = useState(null);
  const defaultUniversity = 'Hochschule Darmstadt Informatik SPO 2014';
  const [selectedUniversity, setSelectedUniversity] = useState(defaultUniversity);
  const [universities, setUniversities] = useState([defaultUniversity]);

  useEffect(() => {
    fetch('http://localhost:3000/api/universities')
      .then(response => response.json())
      .then(data => {
        const universityNames = data.map(u => u.name);
        if (!universityNames.includes(defaultUniversity)) {
          universityNames.push(defaultUniversity);
        }
        universityNames.push('New University');
        setUniversities(universityNames);
      })
      .catch(error => console.error('Error fetching universities:', error));
  }, []);

  useEffect(() => {
    if (selectedUniversity && selectedUniversity !== 'New University') {
      fetch(`http://localhost:3000/api/courses/${encodeURIComponent(selectedUniversity)}`)
        .then(response => response.json())
        .then(data => setCourses(data))
        .catch(error => console.error('Error fetching courses:', error));
    } else {
      setCourses([]);
    }
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
    setSelectedUniversity(value);
  };

  const generateRandomSessionId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleCreateSession = () => {
    const sessionId = generateRandomSessionId();
    const sessionData = {
      sessionId,
      courses
    };

    fetch('http://localhost:3000/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sessionData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Session created successfully:', data);
      })
      .catch(error => console.error('Error creating session:', error));
  };

  return (
    <Container className="App" sx={{ maxHeight: "98vh", display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 0 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Grade Calculator
        </Typography>
        <br />
        <Autocomplete
          sx={{ marginBottom: '25px' }}
          value={selectedUniversity}
          onChange={handleUniversityChange}
          options={universities}
          renderInput={(params) => <TextField {...params} label="Select University" variant="outlined" />}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {courses.map((course, index) => (
          <Grid container spacing={2} key={index} sx={{ marginTop: '4px', alignItems: 'center' }}>
            <Grid item xs={12} sm>
              <TextField
                fullWidth
                label="Course Name"
                name="name"
                value={course.name}
                onChange={(event) => handleInputChange(index, event)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm="auto" width={120}>
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
            <Grid item xs={12} sm="auto" width={120}>
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
            <Grid item xs="auto">
              <IconButton onClick={() => handleRemoveCourse(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddCourse}>
          Add Course
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCalculateAverage} sx={{ ml: 2 }}>
          Calculate Average
        </Button>
        {average !== null && (
          <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>
            Weighted Grade: {average}
          </Typography>
        )}
        <Button variant="contained" color="success" sx={{ ml: 2 }} onClick={handleCreateSession}>
          Create Session
        </Button>
      </Box>
    </Container>
  );
}

export default App;
