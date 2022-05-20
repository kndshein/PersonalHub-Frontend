import React from 'react';

const ExerciseList = ({ exercise }) => {
  const { exercise_name, exercise_days, exercise_type, exercise_rep_measurement, cardio_settings } = exercise;
  return (
    <div>
      <div>{exercise_name}</div>
      <div>{exercise_days}</div>
      <div>{exercise_type}</div>
      {exercise_rep_measurement && <div>{exercise_rep_measurement}</div>}
      {cardio_settings && <div>{cardio_settings}</div>}
    </div>
  );
};

export default ExerciseList;
