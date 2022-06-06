import React, { useEffect, useState } from 'react';
import { query } from '../../util';

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
    <section>
      <section>
        <h3>Past Weights</h3>
        <div>
          {pastWeights.map((weight, idx) => {
            return (
              <div key={idx}>
                <span>{weight.weight_date}</span>
                {weight.weight_value}
              </div>
            );
          })}
        </div>
      </section>
      <section>
        <h3>Current Weight</h3>
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
            <button onClick={handleSubmit}>Submit</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </form>
      </section>
    </section>
  );
};

export default Weight;
