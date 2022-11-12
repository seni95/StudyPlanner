import logo from './logo.svg';
import './App.css';
import DayPlanner from './components/DayPlanner/DayPlanner';
import Calendar from './components/Calendar/Calendar';
import Plans from './components/Calendar/Plans';

function App({plannerRepository}) {
  return (
  <div>
    <DayPlanner plannerRepository={plannerRepository}></DayPlanner>
    <Calendar plannerRepository={plannerRepository}></Calendar>
  </div>
  );
}

export default App;
