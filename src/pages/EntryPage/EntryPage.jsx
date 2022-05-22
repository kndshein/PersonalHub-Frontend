import React, { useEffect, useState } from 'react';
import { getCurrDate, query } from '../../util';
import Entry from './Entry';

const EntryPage = () => {
  const [exerciseList, setExerciseList] = useState([]);
  const [currDate, setCurrDate] = useState(getCurrDate());

  useEffect(() => {
    (async () => {
      let curr_date = getCurrDate();
      let res = await query(
        'POST',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise/specific`,
        true,
        { date: curr_date }
      );
      console.log(res);
      setExerciseList(res.data.result);
    })();
  }, []);

  // const handleDayChange = (direction) => {
  //   let num =
  // }

  return (
    <div>
      <div>
        <button>Previous Day</button>
        <p>Current Day</p>
        <button>Next Day</button>
      </div>
      <div>
        {exerciseList.map((exercise, idx) => (
          <Entry key={idx} exercise={exercise} currDate={currDate} />
        ))}
      </div>
    </div>
  );
};
export default EntryPage;
