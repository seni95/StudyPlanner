import logo from './logo.svg';
import DayPlanner from './components/DayPlanner/DayPlanner';
import Calendar from './components/Calendar/Calendar';
import ShowDetail from './components/Calendar/ShowDetail/ShowDetail';
import { useState } from 'react';

import styles from './App.module.css';

function App({plannerRepository}) {
  const [calDetail, setCalDetail] = useState(false);
  const [detailContent, setDetailContent] = useState(<>??</>);

  const showDetail = (a,b,c)=>{
    if(calDetail==false)
    setCalDetail(true) 
    
    const stopSync = plannerRepository.updateData(`${a}년${b}월${c}일`,(item)=>{
      setDetailContent(item);
      console.log(item);
    })

    return ()=>{stopSync()};

  

  }

  return (
  <div className={styles.container}>
    <DayPlanner plannerRepository={plannerRepository}></DayPlanner>
    <Calendar showDetail={showDetail} plannerRepository={plannerRepository}></Calendar>
    {calDetail&&
    <ShowDetail item={detailContent}></ShowDetail>
    }
  </div>
  );
}

export default App;
