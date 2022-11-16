import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from './Calendar.module.css';
import uuid from 'react-uuid';
import { useAsync } from "react-async";
import Async from 'react-async';
import useTimeCalculator from "./hooks/useTimeCalculator";
//Async 라이브러리를 사용하려고 했으나, returnDay에서 값을 전달하는 순서가 뒤치락 하는 바람에..


const cx = classNames.bind(styles);

const Calendar =  ({plannerRepository, showDetail}) => {
    const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };
  const week = ["일", "월", "화", "수", "목", "금", "토"]; //일주일
  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜
  const [isloading,setIsLoading] = useState(true);
  const forceUpdate = useCallback(()=>setIsLoading(false),[]);

  useEffect(()=>{
    setTimeout(()=>forceUpdate() , 1000);
  },[])

  const prevMonth = useCallback(() => {
    //이전 달 보기 보튼
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth]);

  const nextMonth = useCallback(() => {
    //다음 달 보기 버튼
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);

  const monthControl = useCallback(() => {
    //달 선택박스에서 고르기
    let monthArr = [];
    for (let i = 0; i < 12; i++) {
      monthArr.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}월
        </option>
      );
    }
    return (
      <select
        onChange={changeSelectMonth}
        value={selectedMonth}
      >
        {monthArr}
      </select>
    );
  }, [selectedMonth]);

  const yearControl = useCallback(() => {
    //연도 선택박스에서 고르기
    let yearArr = [];
    const startYear = today.year - 10; //현재 년도부터 10년전 까지만
    const endYear = today.year + 10; //현재 년도부터 10년후 까지만
    for (let i = startYear; i < endYear + 1; i++) {
      yearArr.push(
        <option key={i} value={i}>
          {i}년
        </option>
      );
    }
    return (
      <select
        // className="yearSelect"
        onChange={changeSelectYear}
        value={selectedYear}
      >
        {yearArr}
      </select>
    );
  }, [selectedYear]);

  const changeSelectMonth = (e) => {
    setSelectedMonth(Number(e.target.value));
  };
  const changeSelectYear = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const returnWeek = useCallback(() => {
    //요일 반환 함수
    let weekArr = [];
    week.forEach((v) => {
      weekArr.push(
        <div
          key={v}
          className={cx(
            { weekday: true },
            { sunday: v === "일" },
            { saturday: v === "토" }
          )}
        >
          {v}
        </div>
      );
    });
    return weekArr;
  }, []);

  const returnDay =useCallback(() => {
    //선택된 달의 날짜들 반환 함수
    let dayArr = [];

    for (const nowDay of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          dayArr.push(
            <div 
            onClick={()=>showDetail(selectedYear,selectedMonth,i+1)}
              key={i + 1}
              className={cx(
                {
                  //오늘 날짜일 때 표시할 스타일 클라스네임
                  today:
                    today.year === selectedYear &&
                    today.month === selectedMonth &&
                    today.date === i + 1,
                },
                { weekday: true }, //전체 날짜 스타일
                {
                  //전체 일요일 스타일
                  sunday:
                    new Date(
                      selectedYear,
                      selectedMonth - 1,
                      i + 1
                    ).getDay() === 0,
                },
                {
                  //전체 토요일 스타일
                  saturday:
                    new Date(
                      selectedYear,
                      selectedMonth - 1,
                      i + 1
                    ).getDay() === 6,
                }
              )}
            >
              <span className={styles.showDate}>
              {i + 1}
              </span>
              <span className={styles.hiddenValue}>
              {`${selectedYear}년${selectedMonth}월${i+1}일`}
              </span>
              <span>
              {/* <Plans data={}></Plans> */}
                {/* {} */}
                {/* <Async promiseFn={()=>}>
                    {({data,error,isPending})=>{
                        return data;
                    }}
                </Async> */}
                {returnPlan(`${selectedYear}년${selectedMonth}월${i + 1}일`)}
              </span>
            </div>
          );
        }
      } else {
        dayArr.push(<div key={uuid()} className={styles.weekday}></div>);
      }
    }
    return dayArr;
  });

  // const showDetail=(i)=>{
  //   console.log(selectedYear+"년"+selectedMonth+"월"+(i+1)+"일");
  // }


 
  var dayPlan = null;

  const returnPlan =(info)=>{
    
    dayPlan=null;

    plannerRepository.createCalendar(info,(item)=>
    {
        dayPlan=<PlanMiniViewer item={item}></PlanMiniViewer>;
    // dayPlan = <div>{i}</div>;
    }
        );
    
    return dayPlan;
   

  }

//   if(isloading) 
//   return <div>달력 받아오는 중</div>;

  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>
          {yearControl()}년 {monthControl()}월
        </h3>
        <div className={styles.pagination}>
          <button onClick={prevMonth}>◀︎</button>
          <button onClick={nextMonth}>▶︎</button>
        </div>
      </div>
      <div className={styles.week}>{returnWeek()}</div>
      <div className={styles.date}>{returnDay()}</div>
    </div>
    </div>
  );
};


export function PlanMiniViewer({item}){
  const {total} = useTimeCalculator(item);
  return <li className={styles.miniViewerContainer}>
    {total}
  </li>

}



export default Calendar;