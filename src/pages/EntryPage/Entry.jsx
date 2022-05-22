import React, { useState, useEffect } from 'react';
import { query } from '../../util';
import EntryForm from './EntryForm';
import PastEntries from './PastEntries';

const Entry = ({ exercise, currDate }) => {
  const { exercise_name, exercise_rep_measurement, exercise_type, cardio_settings } = exercise;
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
    <>
      <button onClick={handleShow}>{exercise.exercise_name}</button>
      {showDetail && (
        <>
          <PastEntries
            exercise={exercise}
            currDate={currDate}
            pastEntries={pastEntries}
            setPastValues={setPastValues}
          />
          <EntryForm exercise={exercise} currDate={currDate} pastValues={pastValues} />
        </>
      )}
    </>
  );
};

export default Entry;
