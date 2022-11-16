import logo from './logo.svg';
import DayPlanner from './components/DayPlanner/DayPlanner';
import Calendar from './components/Calendar/Calendar';
import ShowDetail from './components/Calendar/ShowDetail/ShowDetail';
import { useEffect, useState } from 'react';

import styles from './App.module.css';
import { Navigate, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import PlannerRepository from './service/planner_repository';



function App() {
  const [calDetail, setCalDetail] = useState(false);
  const [detailContent, setDetailContent] = useState({});
  const [showCal, setShowCal] = useState(false);
  const [showPlanner, setShowPlanner] = useState(true);
  const [controlContent, setControlContent] = useState(["planner"]);

  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(location.state.id);


  const plannerRepository = new PlannerRepository(userInfo);



  const controllingContent = (newOne)=>{
    if(calDetail===true && newOne==="calendar detail")
    return;

    var newView = [...controlContent,newOne];
    var toHide = undefined;
    if(newView.length>2){
      toHide = newView[0];
      newView.shift();
    }
    console.log("없어져야할것");
    console.log(toHide);

    if(toHide==="planner"){
      setShowPlanner(false);
    }else if(toHide==="calendar detail"){
      setCalDetail(false);
    }else if(toHide==="calendar"){
      setShowCal(false);
    }

    setControlContent(newView);

  }


  const showDetail = (a,b,c)=>{
    
    setCalDetail(true) 
    
    setDetailContent({date:`${a}년${b}월${c}일`});

    const stopSync = plannerRepository.updateData(`${a}년${b}월${c}일`,(item)=>{
      setDetailContent({...detailContent, item});
      console.log(item);
    })

    controllingContent("calendar detail");
    return ()=>{stopSync()};


  }


  const controlCalendar = ()=>{
    if(showCal===false)
    {
    controllingContent("calendar");
    setShowCal(true);
    }
    else if(showCal===true)
    {setCalDetail(false);
      setShowCal(false);}  

  }

  const controlDayPlanner =()=>{
    if(showPlanner===false)
    {setShowPlanner(true);
      controllingContent("planner");}

  }


  const onLogOut = ()=>{
    setUserInfo(null);
    navigate("/");
  }


  useEffect(()=>
  {
    if(userInfo===null)
    navigate("/");
    console.log(userInfo);
  },[userInfo]);

 

  return (
  <div className={styles.container}>
    <li className={styles.nav}>
      <button className={showPlanner===true?`${styles.viewContents} ${styles.navButton}`: styles.navButton} onClick={controlDayPlanner}>플래너</button>
      <button className={showCal===true?`${styles.viewContents} ${styles.navButton}`: styles.navButton} onClick={controlCalendar}>캘린더</button>
      <button className={styles.navButton} onClick={onLogOut}>로그아웃</button>
    </li>
    <div className={styles.contents}>
    {showPlanner&&
    <DayPlanner plannerRepository={plannerRepository}></DayPlanner>}
    {showCal &&
    <Calendar showDetail={showDetail} plannerRepository={plannerRepository}></Calendar>
    }
    {calDetail&&
    <ShowDetail item={detailContent.item} date={detailContent.date}></ShowDetail>
    }

    </div>
  </div>
  );
}

export default App;
