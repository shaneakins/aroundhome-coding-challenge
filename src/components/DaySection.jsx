import styled from 'styled-components';
import TimeBlock from './TimeBlock';

const DaySectionWrapper = styled.div`
  margin-bottom: 15px;
  :last-child {
    margin-bottom: 0;
  }
  h4 {
    text-transform: uppercase;
    margin: 0 0 5px;
  }
`;

const DaySection = ({ id, heading, times }) => {
  return (
    <DaySectionWrapper>
      <h4>{heading}</h4>
      {times &&
        times.map((t, index) => (
          <TimeBlock key={t.start_time} companyId={id} id={index} {...t} />
        ))}
    </DaySectionWrapper>
  );
};

export default DaySection;
