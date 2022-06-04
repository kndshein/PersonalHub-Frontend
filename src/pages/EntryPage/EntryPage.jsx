import React, { useEffect, useState } from 'react';
import { days_index, getCurrDate, query } from '../../util';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Entry from './Entry';
import CardioDropdown from './CardioDropdown';
import styles from './EntryPage.module.scss';

const EntryPage = () => {
  const [exerciseList, setExerciseList] = useState([]);
  const [cardioList, setCardioList] = useState([]);
  const [cardioEntriesList, setCardioEntriesList] = useState([]);
  const [selectedCardio, setSelectedCardio] = useState();
  const [currDate, setCurrDate] = useState(getCurrDate());
  const [currDateString, setCurrDateString] = useState();
  const [loading, setLoading] = useState(true);
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
    (async () => {
      let res = await query(
        'POST',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise/specific`,
        true,
        { date: currDate }
      );
      setExerciseList(res.data.result);
      let cardio_res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise/list/cardio`,
        true
      );
      let cardio_entries_res = await query(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/entry/cardio/specific/${currDate}`,
        true
      );

      let exercise_ids = [];
      for (let entry of cardio_entries_res.data.result) {
        exercise_ids.push(entry.exercise_id._id);
      }

      let filtered_cardio_res = cardio_res.data.result.filter((cardio) => !exercise_ids.includes(cardio._id));
      setCardioList(filtered_cardio_res);
      setSelectedCardio(filtered_cardio_res[0]);
      setCardioEntriesList(cardio_entries_res.data.result);
      setLoading(false);
    })();
  }, [currDate, triggerReload]);

  useEffect(() => {
    setTriggerReload(false);
  }, [triggerReload]);

  useEffect(() => {
    let date = new Date(currDate);
    setCurrDateString(`${days_index[date.getUTCDay()]} (${date.getUTCMonth() + 1}/${date.getUTCDate()})`);
  }, [currDate]);

  const handleDayChange = (direction) => {
    if (direction === 'today' && currDate === getCurrDate()) {
      return;
    }
    let epoch_time = new Date(currDate).getTime();
    let one_day = 1 * 24 * 60 * 60 * 1000;
    let new_epoch_time;

    if (direction === 'prev') {
      new_epoch_time = epoch_time - one_day;
    } else if (direction === 'next') {
      new_epoch_time = epoch_time + one_day;
    } else if (direction === 'today') {
      new_epoch_time = new Date(getCurrDate()).getTime();
    } else {
      throw new Error('Uh oh, what direction is this?');
    }

    let new_date = new Date(new_epoch_time);
    let year = new_date.getUTCFullYear();
    let month = new_date.getUTCMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let date = new_date.getUTCDate();
    date = date < 10 ? `0${date}` : date;
    let new_date_string = `${year}-${month}-${date}`;
    setCurrDate(new_date_string);
    setLoading(true);
  };

  return (
    <>
      <section className={styles.day_nav}>
        <GrFormPrevious role="button" className={styles.nav_button} onClick={() => handleDayChange('prev')} />
        <button className={styles.current_date} onClick={() => handleDayChange('today')}>
          {currDateString}
        </button>
        <GrFormNext role="button" className={styles.nav_button} onClick={() => handleDayChange('next')} />
      </section>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          {exerciseList.map((exercise, idx) => (
            <Entry key={idx} exercise={exercise} currDate={currDate} />
          ))}
          <section className={styles.cardio_container}>
            <p>Cardio</p>
            {cardioEntriesList.map((exercise, idx) => {
              let passed_data = { ...exercise.exercise_id, is_completed_today: true };
              return <Entry key={idx} exercise={passed_data} currDate={currDate} />;
            })}

            {selectedCardio && (
              <>
                <CardioDropdown
                  cardioList={cardioList}
                  selectedCardio={selectedCardio}
                  setSelectedCardio={setSelectedCardio}
                />
                <Entry exercise={selectedCardio} currDate={currDate} setTriggerReload={setTriggerReload} />
              </>
            )}
          </section>
        </>
      )}
    </>
  );
};
export default EntryPage;
