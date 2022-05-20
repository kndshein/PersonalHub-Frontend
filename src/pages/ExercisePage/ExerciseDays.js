import React from 'react';
let exercise_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ExerciseDays = ({ exerciseData, setExerciseData }) => {
  const handleClick = (event, day) => {
    event.preventDefault();
    let data = [...exerciseData.exercise_days];
    let idx = exercise_days.indexOf(day);
    if (data.includes(day)) {
      data = data.filter((item) => item !== idx);
    } else {
      data.push(idx);
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
