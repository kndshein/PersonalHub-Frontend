import React, { useState } from 'react';
import EntryForm from './EntryForm';

const Entry = ({ exercise, currDate }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleShow = () => {
    setShowDetail(!showDetail);
  };
  return (
    <div>
      <div onClick={handleShow}>{exercise.exercise_name}</div>
      {showDetail && <EntryForm exercise={exercise} currDate={currDate} />}
    </div>
  );
};

export default Entry;
