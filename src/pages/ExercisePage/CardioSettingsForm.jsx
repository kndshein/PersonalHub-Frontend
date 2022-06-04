import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import styles from './CardioSettingsForm.module.scss';

const CardioSettingsForm = ({ exerciseData, setExerciseData }) => {
  const [formData, setFormData] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (exerciseData.cardio_settings.includes(formData) || formData.length <= 0) {
      setError(true);
      return;
    }
    let data = [...exerciseData.cardio_settings];
    data.push(formData);
    setExerciseData({ ...exerciseData, cardio_settings: data });
    setError(false);
  };

  const handleRemoveSetting = (event, setting) => {
    event.preventDefault();
    let data = exerciseData.cardio_settings.filter((item) => item !== setting);
    setExerciseData({ ...exerciseData, cardio_settings: data });
  };

  return (
    <div>
      <label htmlFor="settings_name" className={styles.label}>
        Cardio Settings
      </label>
      <input
        type="text"
        id="settings_name"
        value={formData}
        placeholder="Settings Name"
        onChange={(event) => setFormData(event.target.value)}
        className={`${styles.input} ${error ? styles.error : ''}`}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Add Cardio Setting
      </button>
      <section className={styles.settings_container}>
        {exerciseData.cardio_settings.map((setting, idx) => {
          return (
            <button
              key={idx}
              className={styles.setting}
              onClick={(event) => handleRemoveSetting(event, setting)}
            >
              {setting} <MdClose className={styles.icon} />
            </button>
          );
        })}
      </section>
    </div>
  );
};

export default CardioSettingsForm;
