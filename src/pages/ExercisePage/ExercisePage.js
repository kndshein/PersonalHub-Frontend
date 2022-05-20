import React, { useEffect } from 'react';
import { query } from '../../util';
import ExerciseForm from './ExerciseForm';

const ExercisePage = () => {
  useEffect(() => {
    (async () => {
      let res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise/list`,
        true
      );
      console.log(res);
    })();
  }, []);

  return (
    <div>
      HEHE
      <ExerciseForm />
    </div>
  );
};

export default ExercisePage;
