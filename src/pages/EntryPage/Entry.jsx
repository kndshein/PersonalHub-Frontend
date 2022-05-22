import React, { useState } from 'react';
import EntryForm from './EntryForm';
import PastEntries from './PastEntries';

const Entry = ({ exercise, currDate }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleShow = () => {
    setShowDetail(!showDetail);
  };
  return (
    <>
      <button onClick={handleShow}>{exercise.exercise_name}</button>
      {showDetail && (
        <>
          <PastEntries exercise={exercise} currDate={currDate} />
          <EntryForm exercise={exercise} currDate={currDate} />
        </>
      )}
    </>
  );
};

export default Entry;
