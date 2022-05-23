import React from 'react';
import styles from './ExerciseTypeToggle.module.scss';
let exercise_types = ['Chest', 'Back', 'Arms', 'Shoulders', 'Legs', 'Core', 'Cardio'];

const ExerciseTypeToggle = ({ exerciseData, setExerciseData }) => {
  const handleOnClick = (event, type) => {
    event.preventDefault();
    let data = { ...exerciseData, exercise_type: type };
    if (type === 'Cardio') {
      data.exercise_rep_measurement = '';
    } else {
      data.cardio_settings = [];
    }
    setExerciseData(data);
  };
  return (
    <section>
      <p className={styles.label}>Type</p>
      <div className={styles.days_container}>
        {exercise_types.map((type, idx) => {
          return (
            <button
              key={idx}
              onClick={(event) => handleOnClick(event, type)}
              className={`${styles.type} ${exerciseData.exercise_type === type ? styles.active : ''}`}
            >
              {type}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ExerciseTypeToggle;
