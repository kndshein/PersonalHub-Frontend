import React, { useState } from 'react';

const CardioSettingsForm = ({ exerciseData, setExerciseData }) => {
  let [formData, setFormData] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = [...exerciseData.cardio_settings];
    data.push(formData);
    setExerciseData({ ...exerciseData, cardio_settings: data });
  };

  return (
    <>
      {exerciseData.cardio_settings.map((setting, idx) => {
        return <span key={idx}>{setting}</span>;
      })}
      <input
        type="text"
        value={formData}
        placeholder="Settings Name"
        onChange={(event) => setFormData(event.target.value)}
      />
      <button onClick={handleSubmit}>Add Cardio Setting</button>
    </>
  );
};

export default CardioSettingsForm;
