import React, { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import {FaCheck} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import { objValuesToFloat, query } from '../../util';
import styles from './EntryForm.module.scss';

const EntryForm = ({
  exercise,
  currDate,
  pastValues,
  setShowDetail,
  setIsFakeCompleted,
  setTriggerReload,
}) => {
  const { exercise_settings, exercise_type, cardio_settings } = exercise;
  const exercise_id = exercise._id;

  const [loading, setLoading] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [allowEdit, setAllowEdit] = useState(false);

  const [entry, setEntry] = useState({
    exercise_id: exercise_id,
    entry_date: currDate,
    cardio_values: {},
    entry_values: {
      set: '',
      rep: '',
      quantity: '',
    },
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
          data = { ...data, entry_values: res.data.result.entry_values };
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
            data.cardio_values[setting] =
              pastValues && pastValues[setting] ? pastValues[setting] : '';
          }
        } else {
          data = {
            ...data,
            entry_values: {
              set: pastValues ? pastValues.set : '',
              rep: pastValues ? pastValues.rep : '',
              quantity: pastValues ? pastValues.quantity : '',
            },
          };
        }
        setAllowEdit(true);
      }
      setEntry(data);
      setLoading(false);
    })();
  }, [currDate, exercise]);

  const handleChange = (isCardio, evt) => {
    if (isCardio) {
      setEntry({
        ...entry,
        cardio_values: {
          ...entry.cardio_values,
          [evt.target.name]: evt.target.value,
        },
      });
    } else {
      setEntry({
        ...entry,
        entry_values: {
          ...entry.entry_values,
          [evt.target.name]: evt.target.value,
        },
      });
    }
  };

  const handleEdit = (evt) => {
    evt.preventDefault();
    setAllowEdit(true);
  };

  const handleDelete = async (evt) => {
    evt.preventDefault();
    let res = await query('DELETE', `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/entry/${entry.entry_id}`, true);

    if (res.status === 200) {
      setTriggerReload(true);
      setShowDetail(true);
    }
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let data = { ...entry };

    if (exercise_type === 'Cardio') {
      delete data.entry_values;
      objValuesToFloat(data.cardio_values); // Loop through cardio_values to sanitize floats
    } else {
      delete data.cardio_values;
      objValuesToFloat(data.entry_values); // Loop through entry_values to sanitize floats
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
      if (setTriggerReload) {
        setTriggerReload(true);
      } else {
        setIsFakeCompleted(true);
      }
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
                      <section className={styles.cardio_values} key={idx}>
                        <label htmlFor={setting}>{setting}</label>
                        <input
                          type="number"
                          inputMode="decimal"
                          name={setting}
                          id={setting}
                          value={entry.cardio_values[setting] ?? ''}
                          onChange={(evt) => handleChange(true, evt)}
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
                      inputMode="numeric"
                      name="set"
                      id="set"
                      value={entry.entry_values.set}
                      onChange={(evt) => handleChange(false, evt)}
                      disabled={!allowEdit}
                      className={styles.input}
                    />
                    <input
                      type="number"
                      inputMode="numeric"
                      name="rep"
                      id="rep"
                      value={entry.entry_values.rep}
                      onChange={(evt) => handleChange(false, evt)}
                      disabled={!allowEdit}
                      className={styles.input}
                    />
                    <span>{exercise_settings.rep_unit}</span>
                  </section>
                  <section className={styles.qty_grp}>
                    <input
                      type="number"
                      inputMode="decimal"
                      name="quantity"
                      id="quantity"
                      value={entry.entry_values.quantity}
                      onChange={(evt) => handleChange(false, evt)}
                      disabled={!allowEdit}
                      className={styles.input}
                    />
                    <span>{exercise_settings.quantity_unit}</span>
                  </section>
                </>
              )}
            </section>
            <section className={styles.buttons_container}>
              {isNew || allowEdit ? (
                <button
                  className={`${styles.btn} ${styles.submit_btn}`}
                  onClick={handleSubmit}
                >
                  <FaCheck size={15} className={styles.btn_logo} />
                </button>
              ) : (
                <>
                  <button className={styles.btn} onClick={handleEdit}>
                    <FiEdit2 size={13} className={styles.btn_logo} />
                  </button>
                  <button className={styles.del_btn} onClick={handleDelete}>
                    <MdDelete size={16} className={styles.btn_logo} />
                  </button>
                </>
              )}
            </section>
          </form>
        </>
      )}
    </>
  );
};

export default EntryForm;
