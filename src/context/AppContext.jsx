import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo
} from 'react';
import useFetch from '../hooks/useFetch';

const initialContext = { selectedTimes: null };

const AppContext = createContext(initialContext);

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState([]);
  const [reservedSlots, setReservedSlots] = useState([]);

  const { data, isLoading, hasError, errorMessage } = useFetch(
    'http://localhost:3000/time_slots'
  );

  // inital data load
  useEffect(() => {
    if (data) {
      const newData = data.map(company => {
        const timeSlots = company.time_slots.map(time => ({
          ...time
        }));
        return { ...company, time_slots: timeSlots };
      });

      setAppState(newData);
    }
  }, [data]);

  const updateReservedSlots = useCallback(
    (companyId, slotId) => {
      const company = appState.find(company => company.id === companyId);

      const newReservation = {
        ...company.time_slots[slotId],
        companyId: companyId
      };

      const alreadyReservedIndex = reservedSlots.findIndex(
        ({ companyId, start_time, end_time }) =>
          newReservation.companyId === companyId &&
          newReservation.start_time === start_time &&
          newReservation.end_time === end_time
      );

      const alreadyReserved = alreadyReservedIndex !== -1;

      let newSlots;

      // Remove reservation if user clicks on already-selected time slot
      if (alreadyReserved) {
        newSlots = [...reservedSlots];
        newSlots.splice(alreadyReservedIndex, 1);
      } else {
        // Remove any existing reservation for this company
        newSlots = reservedSlots.filter(slot => slot.companyId !== companyId);
        // Add new reservation
        newSlots.push(newReservation);
      }

      setReservedSlots([...newSlots]);
    },
    [appState, reservedSlots]
  );

  const value = useMemo(
    () => ({
      appState,
      isLoading,
      hasError,
      errorMessage,
      updateReservedSlots,
      reservedSlots
    }),
    [
      appState,
      isLoading,
      hasError,
      errorMessage,
      updateReservedSlots,
      reservedSlots
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
