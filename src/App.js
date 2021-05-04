import './App.css';
import { AppProvider } from './context/AppContext';

import Home from './components/Home';

function App() {
  return (
    <div className='App'>
      <AppProvider>
        <Home />
      </AppProvider>
    </div>
  );
}

export default App;
