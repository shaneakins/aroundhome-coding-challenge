import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Company from './Company';

const HomeWrapper = styled.section`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const Home = props => {
  const { appState, isLoading, hasError } = useAppContext();

  // if (!appState) return null;

  if (isLoading) return <h1>Loading</h1>;

  if (hasError) return <h1>ERROR</h1>;

  return (
    <HomeWrapper>
      {appState &&
        appState.map(company => <Company key={company.name} {...company} />)}
    </HomeWrapper>
  );
};

export default Home;
