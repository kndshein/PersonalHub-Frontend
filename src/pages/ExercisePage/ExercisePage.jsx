import React, { useEffect, useState } from 'react';
import { query } from '../../util';
import ExerciseForm from './ExerciseForm';
import Exercise from './Exercise';
import styles from './ExercisePage.module.scss';

const ExercisePage = () => {
  let [exerciseList, setExerciseList] = useState([]);
  let [triggerReload, setTriggerReload] = useState(false);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise/list`,
        true
      );
      setExerciseList(res.data.result);
      setLoading(false);
    })();
  }, [triggerReload]);

  useEffect(() => {
    setTriggerReload(false);
  }, [triggerReload]);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <ExerciseForm setTriggerReload={setTriggerReload} />
          <section className={styles.exercise_list}>
            {exerciseList.map((exercise, idx) => (
              <Exercise key={idx} exercise={exercise} />
            ))}
          </section>
        </div>
      )}
    </>
  );
};

export default ExercisePage;
