import React from 'react';
import { days_index } from '../../util';
import styles from './ExerciseDays.module.scss';

const ExerciseDays = ({ exerciseData, setExerciseData }) => {
  const handleClick = (event, idx) => {
    event.preventDefault();
    let data = [...exerciseData.exercise_settings.days];
    if (data.includes(idx)) {
      data = data.filter((item) => item !== idx);
    } else {
      data.push(idx);
    }
    setExerciseData({
      ...exerciseData,
      exercise_settings: { ...exerciseData.exercise_settings, days: data },
    });
  };

  return (
    <section>
      <p className={styles.label}>Days</p>
      <div className={styles.days_container}>
        {days_index.map((day, idx) => {
          return (
            <button
              key={idx}
              onClick={(event) => handleClick(event, idx)}
              className={`${styles.day} ${
                exerciseData.exercise_settings.days.includes(idx) ? styles.active : ''
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ExerciseDays;
