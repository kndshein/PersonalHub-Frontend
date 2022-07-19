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
  const [isCompleted, setIsCompleted] = useState(is_completed_today);
  const [triggerEntryReload, setTriggerEntryReload] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [exercise]);

  useEffect(() => {
    setTriggerEntryReload(false);
  }, [triggerEntryReload]);

  useEffect(() => {
    (async () => {
      let res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/entry/past/${currDate}/${exercise_id}/4`,
        true,
        { date: currDate }
      );
      if (res.data.result.length) {
        let first_value;
        if (isCompleted) {
          first_value = res.data.result.shift();
        } else {
          first_value = res.data.result[0];
          if (res.data.result.length > 3) res.data.result.pop();
        }
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
  }, [currDate, exercise, triggerEntryReload]);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <button
            onClick={() => setShowDetail(!showDetail)}
            className={`${styles.name_btn} ${isCompleted && styles.completed} ${showDetail && styles.active}`}
          >
            <span className={styles.exercise_name}>{exercise_name}</span>
            {pastValues && (
              <>
                {exercise_type === 'Cardio' ? (
                  <span className={styles.set_rep}>
                    {Object.values(pastValues).map((value, idx) => {
                      return <span key={idx}>{value}</span>;
                    })}
                  </span>
                ) : (
                  <span className={styles.set_rep}>
                    <span>{pastValues.set}</span>
                    <span>{pastValues.rep}</span>
                  </span>
                )}
              </>
            )}
          </button>
          {showDetail && (
            <div className={`${styles.expanded_container} ${isCompleted && styles.completed}`}>
              <PastEntries
                exercise={exercise}
                currDate={currDate}
                pastEntries={pastEntries}
                isCompleted={isCompleted}
              />
              <EntryForm
                exercise={exercise}
                currDate={currDate}
                pastValues={pastValues}
                setShowDetail={setShowDetail}
                setIsCompleted={setIsCompleted}
                setTriggerReload={setTriggerReload}
                setTriggerEntryReload={setTriggerEntryReload}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Entry;
