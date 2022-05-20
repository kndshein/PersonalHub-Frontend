import React from 'react';
let exercise_types = ['Chest', 'Back', 'Arms', 'Shoulders', 'Legs', 'Core', 'Cardio'];

const ExerciseTypeToggle = ({ exerciseData, setExerciseData }) => {
  const handleOnClick = (event, type) => {
    event.preventDefault();
    let data = { ...exerciseData };
    if (type === 'Cardio') {
      data.exercise_rep_measurement = '';
    } else {
      data.cardio_settings = [];
    }
    setExerciseData(data);
  };
  return (
    <>
      {exercise_types.map((type, idx) => {
        return (
          <button key={idx} onClick={(event) => handleOnClick(event, type)}>
            {type}
          </button>
        );
      })}
    </>
  );
};

export default ExerciseTypeToggle;
