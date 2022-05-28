import React, { useState, useEffect } from 'react';
import { query } from '../../util';
import EntryForm from './EntryForm';
import PastEntries from './PastEntries';
import styles from './Entry.module.scss';

const Entry = ({ exercise, currDate, setTriggerReload }) => {
  const { exercise_type, exercise_name, is_completed_today } = exercise;
  const exercise_id = exercise._id;

  const [showDetail, setShowDetail] = useState(false);
  const [pastValues, setPastValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pastEntries, setPastEntries] = useState([{}]);

  useEffect(() => {
    setLoading(true);
  }, [exercise]);

  useEffect(() => {
    (async () => {
      let res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/entry/past/${currDate}/${exercise_id}/5`,
        true,
        { date: currDate }
      );
      if (res.data.result.length) {
        let first_value = res.data.result[0];
        if (exercise_type === 'Cardio') {
          setPastValues(first_value.cardio_values);
        } else {
          setPastValues(first_value.entry_values);
        }
      } else {
        setPastValues(null);
      }
      setPastEntries(res.data.result);
      setLoading(false);
    })();
  }, [currDate, exercise]);

  return (
    <section className={styles.container}>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <button
            onClick={() => setShowDetail(!showDetail)}
            className={`${styles.name_btn} ${is_completed_today && styles.completed}`}
          >
            <span>{exercise_name}</span>
            {pastValues && (
              <>
                {exercise_type === 'Cardio' ? (
                  <span className={`${styles.set_rep} ${is_completed_today && styles.completed}`}>
                    {Object.values(pastValues).map((value, idx) => {
                      return <span key={idx}>{value}</span>;
                    })}
                  </span>
                ) : (
                  <span className={`${styles.set_rep} ${is_completed_today && styles.completed}`}>
                    <span>{pastValues.set}</span>
                    <span>{pastValues.rep}</span>
                  </span>
                )}
              </>
            )}
          </button>
          {showDetail && (
            <div className={styles.inner_container}>
              <PastEntries exercise={exercise} currDate={currDate} pastEntries={pastEntries} />
              <EntryForm
                exercise={exercise}
                currDate={currDate}
                pastValues={pastValues}
                setShowDetail={setShowDetail}
                setTriggerReload={setTriggerReload}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Entry;
