import React, { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { GrFormEdit } from 'react-icons/gr';
import { query } from '../../util';

const EntryForm = ({ exercise, currDate, pastValues }) => {
  const { exercise_rep_measurement, exercise_type, cardio_settings } = exercise;
  const exercise_id = exercise._id;

  const [loading, setLoading] = useState(true);
  const [triggerReload, setTriggerReload] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [allowEdit, setAllowEdit] = useState(false);

  const [entry, setEntry] = useState({
    exercise_id: exercise_id,
    entry_date: currDate,
    cardio_values: {},
    entry_rep: '',
    entry_set: '',
    entry_measurement: '',
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

      let data;
      if (res.data.result) {
        data = { ...entry, entry_id: res.data.result._id };
        if (exercise_type === 'Cardio') {
          data = { ...data, cardio_values: res.data.result.cardio_values };
        } else {
          data = {
            ...data,
            entry_rep: res.data.result.entry_rep || '',
            entry_set: res.data.result.entry_set || '',
            entry_measurement: res.data.result.entry_measurement || '',
          };
        }
        setIsNew(false);
      } else {
        data = {
          exercise_id: exercise_id,
          entry_date: currDate,
        };
        if (cardio_settings) {
          data.cardio_values = {};
          for (let setting of cardio_settings) {
            data.cardio_values[setting] = pastValues[setting] ? pastValues[setting] : '';
          }
        } else {
          data = {
            ...data,
            entry_rep: pastValues ? pastValues.entry_rep : '',
            entry_set: pastValues ? pastValues.entry_set : '',
            entry_measurement: pastValues ? pastValues.entry_measurement : '',
          };
        }
        setAllowEdit(true);
      }
      setEntry(data);
      setLoading(false);
    })();
  }, [currDate]);

  const handleChange = (isCardio, event) => {
    if (isCardio) {
      setEntry({
        ...entry,
        cardio_values: { ...entry.cardio_values, [event.target.name]: event.target.value },
      });
    } else {
      setEntry({ ...entry, [event.target.name]: event.target.value });
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setAllowEdit(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = { ...entry };
    if (exercise_type === 'Cardio') {
      delete data.entry_rep;
      delete data.entry_set;
      delete data.entry_measurement;
    } else {
      delete data.cardio_values;
    }
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
          <form className="form-body" autoComplete="off" onSubmit={handleSubmit}>
            {exercise_type === 'Cardio' ? (
              <>
                {cardio_settings.map((setting, idx) => {
                  return (
                    <input
                      key={idx}
                      type="number"
                      name={setting}
                      id={setting}
                      value={entry?.cardio_values[setting]}
                      placeholder={setting}
                      onChange={(event) => handleChange(true, event)}
                      disabled={!allowEdit}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <input
                  type="number"
                  name="entry_set"
                  id="entry_set"
                  value={entry.entry_set}
                  placeholder="Entry Set"
                  onChange={(event) => handleChange(false, event)}
                  disabled={!allowEdit}
                />
                <input
                  type="number"
                  name="entry_rep"
                  id="entry_rep"
                  value={entry.entry_rep}
                  placeholder="Entry Rep"
                  onChange={(event) => handleChange(false, event)}
                  disabled={!allowEdit}
                />
                <input
                  type="number"
                  name="entry_measurement"
                  id="entry_measurement"
                  value={entry.entry_measurement}
                  placeholder="Entry Measurement"
                  onChange={(event) => handleChange(false, event)}
                  disabled={!allowEdit}
                />
                <span>{exercise_rep_measurement}</span>
              </>
            )}
            {!isNew && (
              <button onClick={handleEdit} disabled={allowEdit}>
                <GrFormEdit />
              </button>
            )}
            <button className="form-submit" type="submit" disabled={!allowEdit}>
              <HiCheck />
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default EntryForm;
