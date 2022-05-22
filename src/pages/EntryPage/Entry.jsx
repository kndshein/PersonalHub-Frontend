import React, { useState } from 'react';
import EntryForm from './EntryForm';
import PastEntries from './PastEntries';

const Entry = ({ exercise, currDate }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleShow = () => {
    setShowDetail(!showDetail);
  };
  return (
    <div>
      <div onClick={handleShow}>{exercise.exercise_name}</div>
      {showDetail && (
        <>
          <PastEntries exercise={exercise} currDate={currDate} />
          <EntryForm exercise={exercise} currDate={currDate} />
        </>
      )}
    </div>
  );
};

export default Entry;
