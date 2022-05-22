import React, { useEffect, useState } from 'react';
import { days_index, getCurrDate, query } from '../../util';
import Entry from './Entry';

const EntryPage = () => {
  const [exerciseList, setExerciseList] = useState([]);
  const [currDate, setCurrDate] = useState(getCurrDate());
  const [currDateString, setCurrDateString] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let res = await query(
        'POST',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise/specific`,
        true,
        { date: currDate }
      );
      setExerciseList(res.data.result);
      setLoading(false);
    })();
  }, [currDate]);

  useEffect(() => {
    let date = new Date(currDate);
    setCurrDateString(`${days_index[date.getUTCDay()]} (${date.getUTCMonth() + 1}/${date.getUTCDate()})`);
  }, [currDate]);

  const handleDayChange = (direction) => {
    let epoch_time = new Date(currDate).getTime();
    let one_day = 1 * 24 * 60 * 60 * 1000;
    let new_epoch_time;

    if (direction === 'prev') {
      new_epoch_time = epoch_time - one_day;
    } else if (direction === 'next') {
      new_epoch_time = epoch_time + one_day;
    } else {
      throw new Error('Uh oh, what direction is this?');
    }

    let new_date = new Date(new_epoch_time);
    let year = new_date.getUTCFullYear();
    let month = new_date.getUTCMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let date = new_date.getUTCDate();
    date = date < 10 ? `0${date}` : date;
    let new_date_string = `${year}-${month}-${date}`;
    setCurrDate(new_date_string);
    setLoading(true);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleDayChange('prev')}>Previous Day</button>
        <p>{currDateString}</p>
        <button onClick={() => handleDayChange('next')}>Next Day</button>
      </div>
      {!loading && (
        <div>
          {exerciseList.map((exercise, idx) => (
            <Entry key={idx} exercise={exercise} currDate={currDate} />
          ))}
        </div>
      )}
    </div>
  );
};
export default EntryPage;
