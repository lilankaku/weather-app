import { useState, useCallback, useMemo } from 'react';
import Header from './components/header/Header';
import Filter from './components/widgets/filter/Filter';
import Summary from './components/widgets/summary/Summary';
import Timeseries from './components/widgets/timeseries/Timeseries';
import { AuthContext } from './contexts/AuthContext';
import { DataContext } from './contexts/DataContext';

function App() {

const [token, setToken] = useState('')
const [dateRange, setDateRange] = useState(new Date().toISOString())
const [city, setCity] = useState({})
const [data, setData] = useState([])

  const value = useMemo(
    () => ({ token, setToken }), 
    [token]
  );

  const dataValue = useMemo(
    () => ({ dateRange, city, data, setData, setCity, setDateRange }), 
    [dateRange, city, data]
  );

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <AuthContext.Provider value={value}>
        <DataContext.Provider value={dataValue} >
          <Filter/>
          <Summary/>
          <Timeseries/>
        </DataContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
