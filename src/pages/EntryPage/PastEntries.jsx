import React from 'react';

const PastEntries = ({ exercise, pastEntries }) => {
  const { exercise_type } = exercise;

  return (
    <section>
      {pastEntries.map((entry) => {
        return (
          <div key={entry._id}>
            <span>{entry.entry_date}</span>
            {exercise_type === 'Cardio' ? (
              <>
                {Object.keys(entry.cardio_values).map((key, idx) => {
                  return (
                    <div key={idx}>
                      <span>{key}</span> - <span>{entry.cardio_values[key]}</span>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <span>{entry.entry_set}</span>
                <span>{entry.entry_rep}</span>
                <span>{entry.entry_measurement}</span>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default PastEntries;
