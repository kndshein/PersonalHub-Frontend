import React from 'react';
let exercise_types = ['Chest', 'Back', 'Arms', 'Shoulders', 'Legs', 'Core', 'Cardio'];

const ExerciseTypeToggle = ({ exerciseData, setExerciseData }) => {
  handleOnClick = (type) => {
    let data = { ...exerciseData };
    if (type == 'Cardio') {
      data.exercise_rep_measurement = null;
    } else {
      data.cardio_settings = null;
    }
    setExerciseData(data);
  };
  return (
    <>
      {exercise_types.map((type) => {
        return (
          <button key={idx} onClick={() => handleOnClick(type)}>
            {type}
          </button>
        );
      })}
    </>
  );
};

export default ExerciseTypeToggle;
