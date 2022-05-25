import React, { useState } from 'react';
import ExerciseDays from './ExerciseDays';
import ExerciseTypeToggle from './ExerciseTypeToggle';
import CardioSettingsForm from './CardioSettingsForm';
import { query } from '../../util';
import styles from './ExerciseForm.module.scss';

const ExerciseForm = ({ setTriggerReload }) => {
  const defaultVal = {
    exercise_name: '',
    exercise_days: [],
    exercise_type: '',
    exercise_settings: {
      rep_unit: '',
      quantity_unit: '',
    },
    cardio_settings: [],
  };
  const [exerciseData, setExerciseData] = useState(defaultVal);

  let handleChange = (event, is_exercise_settings) => {
    if (is_exercise_settings) {
      setExerciseData({
        ...exerciseData,
        exercise_settings: { ...exerciseData.exercise_settings, [event.target.name]: event.target.value },
      });
    } else {
      setExerciseData({ ...exerciseData, [event.target.name]: event.target.value });
    }
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    let data = { ...exerciseData };
    if (data.exercise_type === 'Cardio') {
      delete data.exercise_settings;
    } else {
      delete data.cardio_settings;
    }
    let res = await query(
      'POST',
      `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise`,
      true,
      data
    );
    if (res.status === 200) {
      setExerciseData(defaultVal);
      setTriggerReload(true);
    }
  };

  return (
    <div>
      <form autoComplete="off" className={styles.form_container}>
        <section className={styles.name_container}>
          <label htmlFor="exercise_name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            name="exercise_name"
            id="exercise_name"
            value={exerciseData.exercise_name}
            placeholder="Exercise Name"
            onChange={handleChange}
            className={styles.input}
          />
        </section>
        <ExerciseDays exerciseData={exerciseData} setExerciseData={setExerciseData} />
        <ExerciseTypeToggle exerciseData={exerciseData} setExerciseData={setExerciseData} />
        <section className={styles.units_container}>
          <p className={styles.label}>Units</p>
          <div className={styles.input_container}>
            {exerciseData.exercise_type === 'Cardio' ? (
              <CardioSettingsForm exerciseData={exerciseData} setExerciseData={setExerciseData} />
            ) : (
              <>
                <input
                  type="text"
                  name="rep_unit"
                  id="rep_unit"
                  value={exerciseData.exercise_settings.rep_unit}
                  placeholder="Rep Unit"
                  onChange={(event) => handleChange(event, true)}
                  className={styles.input}
                />
                <input
                  type="text"
                  name="quantity_unit"
                  id="quantity_unit"
                  value={exerciseData.exercise_settings.quantity_unit}
                  placeholder="Quantity Unit"
                  onChange={(event) => handleChange(event, true)}
                  className={styles.input}
                />
              </>
            )}
          </div>
        </section>
        <button onClick={handleSubmit} className={styles.submit_btn}>
          Add Exercise
        </button>
      </form>
    </div>
  );
};

export default ExerciseForm;
