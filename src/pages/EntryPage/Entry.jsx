import React, { useEffect, useState } from 'react';
import { query, getCurrDate } from '../../util';

const Entry = ({ exercise, currDate }) => {
  const { exercise_name, exercise_rep_measurement, exercise_type, cardio_settings } = exercise;
  const exercise_id = exercise._id;

  const [loading, setLoading] = useState(true);
  const [triggerReload, setTriggerReload] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const [entry, setEntry] = useState(() => {
    let data = {
      exercise_id: exercise_id,
      entry_date: currDate,
    };
    if (cardio_settings) {
      data.cardio_values = {};
      for (let setting of cardio_settings) {
        data.cardio_values[setting] = '';
      }
    } else {
      data = { ...data, entry_rep: '', entry_set: '' };
    }
    return data;
  });

  useEffect(() => {
    setTriggerReload(false);
  }, [triggerReload]);

  useEffect(() => {
    (async () => {
      let res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/entry/specific/${currDate}/${exercise_id}`,
        true,
        { date: currDate }
      );

      if (res.data.result) {
        let data = { ...entry, entry_id: res.data.result._id };
        if (exercise_type === 'Cardio') {
          data = { ...data, cardio_values: res.data.result.cardio_values };
        } else {
          data = { ...data, entry_rep: res.data.result.entry_rep, entry_set: res.data.result.entry_set };
        }
        setIsNew(false);
        setEntry(data);
      }

      setLoading(false);
    })();
  }, []);

  let handleChange = (isCardio, event) => {
    if (isCardio) {
      setEntry({
        ...entry,
        cardio_values: { ...entry.cardio_values, [event.target.name]: event.target.value },
      });
    } else {
      setEntry({ ...entry, [event.target.name]: event.target.value });
    }
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    let data = { ...entry };
    let query_method = 'PUT';

    if (isNew) {
      data.entry_date = currDate;
      data.exercise_id = exercise_id;
      query_method = 'POST';
    } else {
      delete data.exercise_id;
      delete data.entry_date;
    }

    let res = await query(
      query_method,
      `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/entry`,
      true,
      data
    );

    if (res.status === 200) {
      setTriggerReload(true);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <div>{exercise_name}</div>
          <form className="form-body" autoComplete="off" onSubmit={handleSubmit}>
            {exercise_type === 'Cardio' ? (
              <>
                {cardio_settings.map((setting, idx) => {
                  return (
                    <input
                      key={idx}
                      type="text"
                      name={setting}
                      id={setting}
                      value={entry.cardio_values[setting]}
                      placeholder={setting}
                      onChange={(event) => handleChange(true, event)}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="entry_rep"
                  id="entry_rep"
                  value={entry?.entry_rep}
                  placeholder="Entry Rep"
                  onChange={(event) => handleChange(false, event)}
                />
                <input
                  type="text"
                  name="entry_set"
                  id="entry_set"
                  value={entry?.entry_set}
                  placeholder="Entry Set"
                  onChange={(event) => handleChange(false, event)}
                />
              </>
            )}
            <input className="form-submit" type="submit" value={`${isNew ? 'Add' : 'Edit'} Entry`} />
          </form>
        </>
      )}
    </>
  );
};

export default Entry;
