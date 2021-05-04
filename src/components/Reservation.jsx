import styled from 'styled-components';

const ReservationWrapper = styled.div`
  flex: none;
  background-color: #910a96;
  color: white;
  padding: 10px;
  margin: 5px 0;
  text-align: center;

  h4 {
    margin: 0;
    padding: 0;
  }
`;

const Reservation = ({ start_time, end_time }) => {
  return (
    <ReservationWrapper>
      <h4>Reservation</h4>
      {`${start_time} -- ${end_time}`}
    </ReservationWrapper>
  );
};

export default Reservation;
