import React from 'react';
import styles from './PastEntries.module.scss';
import { getShortDateFromDate } from '../../util';

const PastEntries = ({ exercise, pastEntries }) => {
  const { exercise_type, exercise_rep_measurement } = exercise;

  return (
    <ul className={styles.past_list}>
      {pastEntries.map((entry) => {
        return (
          <li key={entry._id} className={styles.entry}>
            <span className={styles.entry_values}>{getShortDateFromDate(entry.entry_date)}</span>
            {exercise_type === 'Cardio' ? (
              <>
                {Object.keys(entry.cardio_values).map((key, idx) => {
                  return (
                    <div key={idx}>
                      <span>{key}</span> - <span>{entry.cardio_values[key]}</span>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <span className={styles.entry_values}>
                  {entry.entry_set} x {entry.entry_rep}
                </span>
                <span className={styles.entry_values}>
                  {entry.entry_measurement} {exercise.exercise_rep_measurement}
                </span>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default PastEntries;
