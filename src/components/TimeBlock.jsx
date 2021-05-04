import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppContext } from '../context/AppContext';

import { formatTime } from '../utils';

const colors = {
  default: { bg: 'lightblue', text: 'black' },
  selected: { bg: 'dodgerblue', text: 'white' },
  taken: { bg: 'lightgray', text: 'gray' }
};

const selectedColors = css`
  background-color: ${colors.selected.bg};
  color: ${colors.selected.text};
`;
const takenColors = css`
  background-color: ${colors.taken.bg};
  color: ${colors.taken.text};
`;

const TimeBlockWrapper = styled.div`
  flex: none;
  background-color: ${colors.default.bg};
  color: ${colors.default.text};
  padding: 10px;
  margin: 10px 0 0;
  text-align: center;
  cursor: pointer;
  border-radius: 50px;
  pointer-events: ${props =>
    props.slotTaken && !props.isSelected ? 'none' : 'auto'};

  ${({ isSelected, slotTaken }) =>
    (isSelected && selectedColors) || (slotTaken && takenColors)}
`;

const TimeBlock = ({ companyId, id, start_time, end_time }) => {
  const [slotTaken, setSlotTaken] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const { updateReservedSlots, reservedSlots } = useAppContext();

  // Determine block visual state
  useEffect(() => {
    if (reservedSlots.length > 0) {
      const slot = reservedSlots.find(slot => slot.start_time === start_time);
      if (slot) {
        slot.companyId === companyId ? setIsSelected(true) : setSlotTaken(true);
      } else {
        setIsSelected(false);
        setSlotTaken(false);
      }
    }
  }, [companyId, reservedSlots, start_time]);

  const handleClick = () => updateReservedSlots(companyId, id);

  return (
    <TimeBlockWrapper
      slotTaken={slotTaken}
      isSelected={isSelected}
      onClick={handleClick}
    >{`${formatTime(start_time)} -- ${formatTime(end_time)}`}</TimeBlockWrapper>
  );
};

export default TimeBlock;
