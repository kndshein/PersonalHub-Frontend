import React, { useState, useEffect } from 'react';
import { query } from '../../util';

const PastEntries = ({ exercise, currDate }) => {
  const { exercise_name, exercise_rep_measurement, exercise_type, cardio_settings } = exercise;
  const exercise_id = exercise._id;

  const [loading, setLoading] = useState(true);

  const [entries, setEntries] = useState([{}]);

  useEffect(() => {
    (async () => {
      let res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/entry/past/${currDate}/${exercise_id}/5`,
        true,
        { date: currDate }
      );

      console.log(res);
      setEntries(res.data.result);
      setLoading(false);
    })();
  }, [currDate]);
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <section>
          {entries.map((entry) => {
            return (
              <div key={entry._id}>
                <span>{entry.entry_date}</span>
                {exercise_type === 'Cardio' ? (
                  <>
                    {Object.keys(entry.cardio_values).map((key, idx) => {
                      return (
                        <div key={idx}>
                          <span>{key}</span> - <span>{entry.cardio_values[key]}</span>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <span>{entry.entry_set}</span>
                    <span>{entry.entry_rep}</span>
                  </>
                )}
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default PastEntries;
