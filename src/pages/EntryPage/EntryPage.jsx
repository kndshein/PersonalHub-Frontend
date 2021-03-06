import React, { useEffect, useState } from 'react';
import { days_index, getCurrDate, query } from '../../util';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Entry from './Entry';
import CardioDropdown from './CardioDropdown';
import Weight from './Weight';
import styles from './EntryPage.module.scss';

const EntryPage = () => {
  const [exerciseList, setExerciseList] = useState([]);
  const [cardioList, setCardioList] = useState([]);
  const [cardioEntriesList, setCardioEntriesList] = useState([]);
  const [selectedCardio, setSelectedCardio] = useState();
  const [currDate, setCurrDate] = useState(getCurrDate());
  const [currDateData, setCurrDateData] = useState({ day: null, month: null, date: null });
  const [loading, setLoading] = useState(true);
  const [triggerReload, setTriggerReload] = useState(false);

  const getAndSetCardioSection = async () => {
    let cardio_res = await query(
      'GET',
      `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise/list/cardio`,
      true
    );
    let cardio_exercises_res = await query(
      'GET',
      `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/entry/cardio/specific/${currDate}`,
      true
    );
    let exercise_ids = cardio_exercises_res.data.result.map((exercise) => exercise._id);
    let filtered_cardio_res = cardio_res.data.result.filter((cardio) => !exercise_ids.includes(cardio._id));
    setCardioList(filtered_cardio_res);
    setSelectedCardio(filtered_cardio_res[0]);
    setCardioEntriesList(cardio_exercises_res.data.result);
  };

  useEffect(() => {
    (async () => {
      let res = await query(
        'POST',
        `${process.env.REACT_APP_BACKEND_URL}/projectcataphract/exercise/specific`,
        true,
        { date: currDate }
      );
      setExerciseList(res.data.result);
      await getAndSetCardioSection();
      setLoading(false);
    })();
  }, [currDate]);

  useEffect(() => {
    getAndSetCardioSection();
  }, [triggerReload]);

  useEffect(() => {
    setTriggerReload(false);
  }, [triggerReload]);

  useEffect(() => {
    let date = new Date(currDate);
    setCurrDateData({
      day: days_index[date.getUTCDay()],
      month: date.getUTCMonth() + 1,
      date: date.getUTCDate(),
    });
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
          <span className={styles.day}>{currDateData.day}</span>
          <span className={styles.date}>
            {currDateData.month}/{currDateData.date}
          </span>
        </button>
        <GrFormNext role="button" className={styles.nav_button} onClick={() => handleDayChange('next')} />
      </section>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <Weight currDate={currDate} />
          {exerciseList.map((exercise, idx) => (
            <Entry key={idx} exercise={exercise} currDate={currDate} />
          ))}
          <section className={styles.cardio_container}>
            <p>Cardio</p>
            {cardioEntriesList.map((exercise, idx) => {
              return (
                <Entry
                  key={idx}
                  exercise={exercise}
                  currDate={currDate}
                  setTriggerReload={setTriggerReload}
                />
              );
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
