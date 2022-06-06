import React, { useEffect, useState } from 'react';
import { getShortDateFromDate, query } from '../../util';
import { HiCheck } from 'react-icons/hi';
import { FiEdit2 } from 'react-icons/fi';
import styles from './Weight.module.scss';

const Weight = ({ currDate }) => {
  const [currentWeight, setCurrentWeight] = useState({ weight_id: '', weight_value: '' });
  const [pastWeights, setPastWeights] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [allowEdit, setAllowEdit] = useState(true);

  useEffect(() => {
    (async () => {
      let weight_res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/weight/specific/${currDate}/3`,
        true
      );
      setPastWeights(weight_res.data.result.past_weights);
      if (weight_res.data.result.current_weight) {
        setCurrentWeight({
          weight_id: weight_res.data.result.current_weight._id,
          weight_value: weight_res.data.result.current_weight.weight_value,
        });
        setIsNew(false);
        setAllowEdit(false);
      }
    })();
  }, [currDate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = { ...currentWeight, weight_value: parseFloat(currentWeight.weight_value) };
    let query_method = 'PUT';

    if (isNew) {
      delete data.weight_id;
      data['weight_date'] = currDate;
      query_method = 'POST';
    }

    let res = await query(
      query_method,
      `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/weight`,
      true,
      data
    );

    if (res.status === 200) {
      setIsNew(false);
      setAllowEdit(false);
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setAllowEdit(true);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.h2}>Weight</h2>
      <section className={styles.inner_container}>
        <section className={styles.past_container}>
          <h3 className={styles.h3}>Past</h3>
          <div className={styles.past_entries_container}>
            {pastWeights.map((weight, idx) => {
              return (
                <p key={idx} className={styles.past_entry}>
                  {getShortDateFromDate(weight.weight_date)}
                  <span className={styles.weight}>{weight.weight_value} lb</span>
                </p>
              );
            })}
          </div>
        </section>
        <section className={styles.current_container}>
          <h3 className={styles.h3}>Current</h3>
          <form>
            <input
              type="number"
              name="weight_value"
              id="weight_value"
              value={currentWeight.weight_value}
              onChange={(event) => setCurrentWeight({ ...currentWeight, weight_value: event.target.value })}
              disabled={!allowEdit}
            />
            {allowEdit ? (
              <button onClick={handleSubmit} className={styles.submit_btn}>
                <HiCheck size={20} className={styles.btn_logo} />
              </button>
            ) : (
              <button onClick={handleEdit} className={styles.btn}>
                <FiEdit2 size={15} className={styles.btn_logo} />
              </button>
            )}
          </form>
        </section>
      </section>
    </section>
  );
};

export default Weight;
