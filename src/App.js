import logo from './logo.svg';
import './App.css';
import DayPlanner from './components/DayPlanner/DayPlanner';
import Calendar from './components/Calendar/Calendar';

function App({plannerRepository}) {
  return (
  <div>
    <DayPlanner plannerRepository={plannerRepository}></DayPlanner>
    <Calendar></Calendar>
  </div>
  );
}

export default App;
