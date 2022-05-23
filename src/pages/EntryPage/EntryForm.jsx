import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { HiCheck } from 'react-icons/hi';
import { FiEdit2 } from 'react-icons/fi';
import { query } from '../../util';
import styles from './EntryForm.module.scss';

const EntryForm = ({ exercise, currDate, pastValues, setShowDetail }) => {
  const { exercise_rep_measurement, exercise_type, cardio_settings } = exercise;
  const exercise_id = exercise._id;

  const [loading, setLoading] = useState(true);
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
      setShowDetail(false);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <form autoComplete="off">
            <section className={styles.input_fields}>
              {exercise_type === 'Cardio' ? (
                <section className={styles.cardio_values_container}>
                  {cardio_settings.map((setting, idx) => {
                    return (
                      <section className={styles.cardio_values}>
                        <label for={setting}>{setting}</label>
                        <input
                          key={idx}
                          type="number"
                          name={setting}
                          id={setting}
                          value={entry.cardio_values[setting]}
                          onChange={(event) => handleChange(true, event)}
                          disabled={!allowEdit}
                          className={styles.input}
                        />
                      </section>
                    );
                  })}
                </section>
              ) : (
                <>
                  <section className={styles.set_rep}>
                    <input
                      type="number"
                      name="entry_set"
                      id="entry_set"
                      value={entry.entry_set}
                      onChange={(event) => handleChange(false, event)}
                      disabled={!allowEdit}
                      className={styles.input}
                    />
                    <input
                      type="number"
                      name="entry_rep"
                      id="entry_rep"
                      value={entry.entry_rep}
                      onChange={(event) => handleChange(false, event)}
                      disabled={!allowEdit}
                      className={styles.input}
                    />
                  </section>
                  <section className={styles.measure_grp}>
                    <input
                      type="number"
                      name="entry_measurement"
                      id="entry_measurement"
                      value={entry.entry_measurement}
                      onChange={(event) => handleChange(false, event)}
                      disabled={!allowEdit}
                      className={styles.input}
                    />
                    <span>{exercise_rep_measurement}</span>
                  </section>
                </>
              )}
            </section>
            <section className={styles.buttons_container}>
              {isNew || allowEdit ? (
                <button className={`${styles.btn} ${styles.submit_btn}`} onClick={handleSubmit}>
                  <HiCheck size={20} className={styles.btn_logo} />
                </button>
              ) : (
                <button className={styles.btn} onClick={handleEdit}>
                  <FiEdit2 size={15} className={styles.btn_logo} />
                </button>
              )}
            </section>
          </form>
        </>
      )}
    </>
  );
};

export default EntryForm;
