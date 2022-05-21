import React, { useEffect, useState } from 'react';
import { query } from '../../util';
import ExerciseForm from './ExerciseForm';
import ExerciseList from './ExerciseList';

const ExercisePage = () => {
  let [exerciseList, setExerciseList] = useState([]);
  let [triggerReload, setTriggerReload] = useState(false);
  useEffect(() => {
    (async () => {
      let res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise/list`,
        true
      );
      setExerciseList(res.data.result);
    })();
  }, [triggerReload]);

  useEffect(() => {
    setTriggerReload(false);
  }, [triggerReload]);

  return (
    <div>
      {exerciseList.map((exercise, idx) => (
        <ExerciseList key={idx} exercise={exercise} />
      ))}
      <ExerciseForm setTriggerReload={setTriggerReload} />
    </div>
  );
};

export default ExercisePage;
