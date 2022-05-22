import React from 'react';
import { days_index } from '../../util';

const ExerciseDays = ({ exerciseData, setExerciseData }) => {
  const handleClick = (event, day) => {
    event.preventDefault();
    let data = [...exerciseData.exercise_days];
    let idx = days_index.indexOf(day);
    console.log(data, idx);
    if (data.includes(idx)) {
      data = data.filter((item) => item !== idx);
    } else {
      data.push(idx);
    }
    setExerciseData({ ...exerciseData, exercise_days: data });
  };

  return (
    <div>
      {days_index.map((day, idx) => {
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
