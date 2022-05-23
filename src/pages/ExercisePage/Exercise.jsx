import React from 'react';
import { days_index } from '../../util';
import styles from './Exercise.module.scss';

const Exercise = ({ exercise }) => {
  const { exercise_name, exercise_days, exercise_type, exercise_rep_measurement, cardio_settings } = exercise;
  return (
    <section className={`${styles.exercise} ${exercise_type === 'Cardio' ? styles.cardio : ''}`}>
      <div className={styles.group}>
        <p className={styles.label}>Name</p>
        <p>{exercise_name}</p>
      </div>
      <div className={styles.group}>
        <p className={styles.label}>Type</p>
        <p>{exercise_type}</p>
      </div>
      <div className={styles.group}>
        <p className={styles.label}>Days</p>
        <ul className={styles.days_list}>
          {exercise_days.map((day, idx) => {
            return <li key={idx}>{days_index[day]}</li>;
          })}
        </ul>
      </div>
      {exercise_type === 'Cardio' ? (
        <div className={styles.group}>
          <p className={styles.label}>Measurement</p>
          <ul className={styles.settings_list}>
            {cardio_settings.map((setting, idx) => {
              return <li key={idx}>{setting}</li>;
            })}
          </ul>
        </div>
      ) : (
        <div className={styles.group}>
          <p className={styles.label}>Measurement</p>
          <p>{exercise_rep_measurement}</p>
        </div>
      )}
    </section>
  );
};

export default Exercise;
