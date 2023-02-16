import logo from './logo.svg';
import DayPlanner from './components/DayPlanner/DayPlanner';
import Calendar from './components/Calendar/Calendar';
import ShowDetail from './components/Calendar/ShowDetail/ShowDetail';
import { useEffect, useState } from 'react';

import styles from './App.module.css';
import { Navigate, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import PlannerRepository from './service/planner_repository';
import {MdLogout} from 'react-icons/md'


function App() {
  const [detailContent, setDetailContent] = useState({});
  const [showCal, setShowCal] = useState(false);
  const [showPlanner, setShowPlanner] = useState(true);
  const [controlContent, setControlContent] = useState(["planner"]);

  const location = useLocation();
  const navigate = useNavigate();
  const [userData,setUserData] = useState(location.state===null?JSON.parse(window.localStorage.getItem('userInfo')):location.state);
  const [userInfo, setUserInfo] = useState(userData === null ? null : userData.id);
  const [userDetail, setUserDetail] = useState(userData === null ? null : { photo: userData.photo, name: userData.name, email: userData.email })
  const plannerRepository = new PlannerRepository(userInfo);


  const toggleMenu=(name)=>{
    if(name==="cal"){
      setShowCal(true);
      setShowPlanner(false);
    } else{
      setShowCal(false);
      setShowPlanner(true);
    }
  }


  const showDetail = (a, b, c) => {


    setDetailContent({ date: `${a}년${b}월${c}일` });

    const stopSync = plannerRepository.updateData(`${a}년${b}월${c}일`, (item) => {
      setDetailContent({ ...detailContent, item });
      console.log(item);
    })

    return () => { stopSync() };


  }





  const onLogOut = () => {
    window.localStorage.removeItem('userInfo');
    setUserData(null);
    navigate("/");
  }


  useEffect(() => {
    if (userInfo === null)
      navigate("/");
    console.log(userInfo);
  }, [userInfo]);



  return (
    <div className={styles.container}>
<div className={styles.userInfo}>
          <img className={styles.userImg} src={userDetail ? userDetail.photo : null}></img>
          <div>
            <div>{userDetail ? userDetail.name : null}</div>
            <div>{userDetail ? userDetail.email : null}</div>
          </div>
        </div>
        <div className={styles.contents}>
      
      <div className={styles.mainView}>
      <div className={styles.nav}>
        <div>
        <button className={showPlanner === true ? `${styles.viewContents} ${styles.navButton}` : styles.navButton} onClick={()=>toggleMenu("planner")}>플래너</button>
        <button className={showCal === true ? `${styles.viewContents} ${styles.navButton}` : styles.navButton} onClick={()=>toggleMenu("cal")}>캘린더</button>
        </div>
      <button className={styles.buttonUI} onClick={onLogOut}>로그아웃 <MdLogout className={styles.offButton}></MdLogout></button>

      </div>
        <div className={styles.screen}>
          {showPlanner &&
            <DayPlanner userInfo={userInfo} plannerRepository={plannerRepository}></DayPlanner>}

          {showCal &&
          <><Calendar showDetail={showDetail} plannerRepository={plannerRepository}></Calendar>
            <ShowDetail item={detailContent.item} date={detailContent.date}></ShowDetail>
            </>

          }
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
