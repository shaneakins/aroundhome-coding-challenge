import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Reservation from './Reservation';
import DaySection from './DaySection';
import { groupBy, getDay, formatTime } from '../utils';

const CompanyWrapper = styled.section`
  width: 100%;
  padding: 0px 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-rows: auto auto 1fr;

  .reservation {
    height: 100px;
  }

  .timeslots {
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

const Company = ({ id, name, time_slots, selectedSlot, type }) => {
  const [currentSelection, setCurrentSelection] = useState(null);

  const { reservedSlots } = useAppContext();

  // check if there are any reservations for company at the chosen time slot
  useEffect(() => {
    const slot = reservedSlots.find(slot => slot.companyId === id);
    setCurrentSelection(slot ? slot : null);
  }, [id, reservedSlots]);

  // Sort time_slots into groups based on day
  const groupsByDay = groupBy(time_slots, function (time) {
    return getDay(time.start_time);
  });

  // helper to preformat times
  const reservedTimes = {
    start_time: formatTime(currentSelection?.start_time),
    end_time: formatTime(currentSelection?.end_time)
  };

  return (
    <CompanyWrapper>
      <h2>{name}</h2>
      <div className='reservation'>
        {currentSelection && <Reservation {...reservedTimes} />}
      </div>
      <div className='timeslots'>
        {groupsByDay &&
          Object.keys(groupsByDay).map(keyName => (
            <DaySection
              id={id}
              key={keyName}
              heading={keyName}
              times={groupsByDay[keyName]}
            />
          ))}
      </div>
    </CompanyWrapper>
  );
};

export default Company;
