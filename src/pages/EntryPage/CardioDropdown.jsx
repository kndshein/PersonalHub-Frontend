import React from 'react';

const CardioDropdown = ({ cardioList, selectedCardio, setSelectedCardio }) => {
  const handleChange = (event) => {
    let obj = cardioList.find((cardio) => cardio._id === event.target.value);
    setSelectedCardio(obj);
  };

  return (
    <select value={selectedCardio._id} onChange={handleChange}>
      {cardioList.map((cardio) => {
        return (
          <option key={cardio._id} value={cardio._id}>
            {cardio.exercise_name}
          </option>
        );
      })}
    </select>
  );
};

export default CardioDropdown;
