import React, { useEffect, useState } from 'react';
import { query } from '../../util';
import ExerciseForm from './ExerciseForm';
import ExerciseList from './ExerciseList';

const ExercisePage = () => {
  let [exerciseList, setExerciseList] = useState([]);
  let [addTrigger, setAddTrigger] = useState(false);
  useEffect(() => {
    (async () => {
      let res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise/list`,
        true
      );
      setExerciseList(res.data.result);
    })();
  }, [addTrigger]);

  useEffect(() => {
    setAddTrigger(false);
  }, [addTrigger]);

  return (
    <div>
      {exerciseList.map((exercise, idx) => {
        return <ExerciseList key={idx} exercise={exercise} />;
      })}
      <ExerciseForm setAddTrigger={setAddTrigger} />
    </div>
  );
};

export default ExercisePage;
