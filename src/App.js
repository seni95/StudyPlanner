import logo from './logo.svg';
import './App.css';
import DayPlanner from './components/DayPlanner/DayPlanner';

function App({plannerRepository}) {
  return (
  <div>
    <DayPlanner plannerRepository={plannerRepository}></DayPlanner>
  </div>
  );
}

export default App;
