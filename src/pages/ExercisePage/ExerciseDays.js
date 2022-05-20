import React from 'react';
let exercise_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ExerciseDays = ({ exerciseData, setExerciseData }) => {
  const handleClick = (event, day) => {
    event.preventDefault();
    let data = [...exerciseData.exercise_days];
    if (data.includes(day)) {
      data = data.filter((item) => item !== day);
    } else {
      data.push(day);
    }
    setExerciseData({ ...exerciseData, exercise_days: data });
  };

  return (
    <div>
      {exercise_days.map((day, idx) => {
        return (
          <button key={idx} onClick={(event) => handleClick(event, day)}>
            {day}
          </button>
        );
      })}
    </div>
  );
};

export default ExerciseDays;
