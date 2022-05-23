import React, { useState, useEffect } from 'react';
import { query } from '../../util';
import EntryForm from './EntryForm';
import PastEntries from './PastEntries';
import styles from './Entry.module.scss';

const Entry = ({ exercise, currDate }) => {
  const { exercise_type, exercise_name } = exercise;
  const exercise_id = exercise._id;

  const [showDetail, setShowDetail] = useState(false);
  const [pastValues, setPastValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pastEntries, setPastEntries] = useState([{}]);

  useEffect(() => {
    (async () => {
      let res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/entry/past/${currDate}/${exercise_id}/5`,
        true,
        { date: currDate }
      );
      if (res.data.result.length) {
        let last_value = res.data.result[res.data.result.length - 1];
        if (exercise_type === 'Cardio') {
          setPastValues(last_value.cardio_values);
        } else {
          setPastValues({
            entry_set: last_value.entry_set,
            entry_rep: last_value.entry_rep,
            entry_measurement: last_value.entry_measurement,
          });
        }
      }
      setPastEntries(res.data.result);
      setLoading(false);
    })();
  }, [currDate]);

  const handleShow = () => {
    setShowDetail(!showDetail);
  };

  return (
    <section className={styles.container}>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <button onClick={handleShow} className={styles.name_btn}>
            <span>{exercise_name}</span>
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
                    <span>{pastValues.entry_set}</span>
                    <span>{pastValues.entry_rep}</span>
                  </span>
                )}
              </>
            )}
          </button>
          {showDetail && (
            <div className={styles.inner_container}>
              <PastEntries
                exercise={exercise}
                currDate={currDate}
                pastEntries={pastEntries}
                setPastValues={setPastValues}
              />
              <EntryForm
                exercise={exercise}
                currDate={currDate}
                pastValues={pastValues}
                setShowDetail={setShowDetail}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Entry;
