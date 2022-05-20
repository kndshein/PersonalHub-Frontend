import React, { useState } from 'react';
import ExerciseTypeToggle from './ExerciseTypeToggle';

const ExerciseForm = () => {
  let exercise_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let [exerciseData, setExerciseData] = useState({
    exercise_name: '',
    exercise_days: [],
    exercise_type: '',
    exercise_rep_measurement: '',
    cardio_settings: null,
  });

  let handleChange = (event) => {
    setExerciseData({ ...exerciseData, [event.target.name]: event.target.value });
  };

  let handleSubmit = () => {};

  return (
    <div>
      <form className="form-body" autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          name="exercise_name"
          id="exercise_name"
          value={exerciseData.exercise_name}
          placeholder="Exercise Name"
          onChange={handleChange}
        />
        <div>
          {exercise_days.map((day, idx) => {
            return (
              <React.Fragment key={idx}>
                <label>{day}</label>
                <input type="checkbox" name={day} id={day} value={day} />
              </React.Fragment>
            );
          })}
        </div>
        <ExerciseTypeToggle exerciseData={exerciseData} setExerciseData={setExerciseData} />
        <input
          type="text"
          name="exercise_rep_measurement"
          id="exercise_rep_measurement"
          value={exerciseData.exercise_rep_measurement}
          placeholder="Exercise Rep Measurement"
          onChange={handleChange}
        />
        <input className="form-submit" type="submit" value="Add Exercise" />
      </form>
    </div>
  );
};

export default ExerciseForm;
