import React from 'react';
import styles from './PastEntries.module.scss';
import { getShortDateFromDate } from '../../util';

const PastEntries = ({ exercise, pastEntries }) => {
  const { exercise_type, exercise_settings, is_completed_today } = exercise;

  return (
    <ul className={styles.past_list}>
      {pastEntries.map((entry) => {
        return (
          <li key={entry._id} className={`${styles.entry} ${is_completed_today && styles.completed}`}>
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
                  {entry.entry_values.set} x {entry.entry_values.rep} {exercise_settings.rep_unit}
                </span>
                <span className={styles.entry_values}>
                  {entry.entry_values.quantity} {exercise_settings.quantity_unit}
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
