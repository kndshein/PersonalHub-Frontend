import React, { useState } from 'react';
import ExerciseDays from './ExerciseDays';
import ExerciseTypeToggle from './ExerciseTypeToggle';
import CardioSettingsForm from './CardioSettingsForm';
import { query } from '../../util';

const ExerciseForm = ({ setTriggerReload }) => {
  const defaultVal = {
    exercise_name: '',
    exercise_days: [],
    exercise_type: '',
    exercise_rep_measurement: '',
    cardio_settings: [],
  };
  const [exerciseData, setExerciseData] = useState(defaultVal);

  let handleChange = (event) => {
    setExerciseData({ ...exerciseData, [event.target.name]: event.target.value });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    let data = { ...exerciseData };
    if (data.exercise_type === 'Cardio') {
      delete data.exercise_rep_measurement;
    } else {
      delete data.cardio_settings;
    }
    let res = await query(
      'POST',
      `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise`,
      true,
      data
    );
    if (res.status === 200) {
      setExerciseData(defaultVal);
      setTriggerReload(true);
    }
  };

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
        <ExerciseDays exerciseData={exerciseData} setExerciseData={setExerciseData} />
        <ExerciseTypeToggle exerciseData={exerciseData} setExerciseData={setExerciseData} />
        {exerciseData.exercise_type === 'Cardio' ? (
          <CardioSettingsForm exerciseData={exerciseData} setExerciseData={setExerciseData} />
        ) : (
          <input
            type="text"
            name="exercise_rep_measurement"
            id="exercise_rep_measurement"
            value={exerciseData.exercise_rep_measurement}
            placeholder="Exercise Rep Measurement"
            onChange={handleChange}
          />
        )}
        <input className="form-submit" type="submit" value="Add Exercise" />
      </form>
    </div>
  );
};

export default ExerciseForm;
