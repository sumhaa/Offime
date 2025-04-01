import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function Calender(){
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [activeDay, setActiveDay] = useState(null);
    const defaultDate = (today.getFullYear() + "-" + (today.getMonth() +1) + "-" + today.getDate()).toString() ;
    const [selectedDate, setSelectedDate] = useState(defaultDate);
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const [selectedDay, setSelectedDay] = useState(dayNames[today.getDay()]);
    const navigate = useNavigate();

    const [selectedYear, setSelectedYear] = useState();
    const [selectedMonth, setSelectedMonth] = useState();

    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        renderCalendar();
    }, [currentDate]);

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const prevLastDate = new Date(year, month, 0).getDate();
        const nextDate = new Date(year, month, 1).getDate();

        const daysArray = [];

        // 지난달 날짜 추가 (비활성)
        for (let i = firstDay - 1; i >= 0; i--) {
            const date = new Date(year, month -1 , prevLastDate - i);
            daysArray.push({
                year,
                month: month - 1,
                day: prevLastDate - i,
                dayName : dayNames[date.getDay()],
                inactive: true,
            });
        }


        // 이번 달 날짜 추가
        for (let i = 1; i <= lastDate; i++) {
            const date = new Date(year,month, i);
            const isToday = year === today.getFullYear() && month === today.getMonth() && i === today.getDate();
            daysArray.push({
                year,
                month,
                day: i,
                dayName: dayNames[date.getDay()],
                today: isToday,
                inactive: false, // 오늘 이전 날짜는 비활성
            });
        }

        // 다음 달 날짜 추가
        for (let i = 1; i < 7 - lastDay; i++) {
            const date = new Date(year,month + 1, i);
            daysArray.push({
                year,
                month: month + 1,
                day: i,
                dayName: dayNames[date.getDay()],
                inactive: true,
            });
        }



        return daysArray;
    }

    function handleSelectDay(dayObj) {
        console.log(dayObj);
        console.log(dayObj.dayName)
        setActiveDay(dayObj);
        setSelectedDate(
            `${dayObj.year}-${String(dayObj.month + 1).padStart(2, "0")}-${String(dayObj.day).padStart(2, "0")}`
        );
        setSelectedDay(`${dayObj.dayName}`);
    }

    function handleEdit() {
        setEditOpen(prev => !prev);
    }


    return(
        <>
            <div className= {editOpen ? "calendar-container active" : "calendar-container"}>
                <p className="hidden">calendar page</p>
                <div className="calender-wrap">
                    <div className="calendar">
                        <div className="calendar-header">
                            <p id="monthYear" className="cal-month">
                                {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                            </p>
                        </div>
                        <div className="weekdays">
                            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                                <div key={day}>{day}</div>
                            ))}
                        </div>
                        <div className="days">
                            {renderCalendar().map((date, index) => {
                                const isActive =
                                    activeDay &&
                                    activeDay.year === date.year &&
                                    activeDay.month === date.month &&
                                    activeDay.day === date.day;
                                return (
                                    <div
                                        key={index}
                                        className={`day ${date.today ? "today" : ""} ${date.inactive ? "inactive" : ""} ${isActive ? "active" : ""}`}
                                        onClick={() => handleSelectDay(date)}
                                    >
                                        <p>{date.day}</p>
                                        <div className="sched red">
                                            <p className="fs_xsm active">사전 미팅aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                            <p className="fs_xsm">10:00 ~ 13:00</p>
                                        </div>
                                        <div className="sched green">
                                            <p className="fs_xsm active">사전 미팅aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                            <p className="fs_xsm">10:00 ~ 13:00</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className={editOpen ? "dark-area active" : "dark-area"} onClick={handleEdit}></div>*/}
            <div className={editOpen ? "schedule-detail active" : "schedule-detail"}>
                    <div className="sched-date">
                        <input type="text" value={selectedDate + ` ` + `(` + selectedDay + `)`} readOnly id="selectedDate"/>
                    </div>
                <div className="inner">
                    <p className="fs_md mt_lg">일정 시간</p>
                    <div className='item-flex mt_md'>
                        <input type="time" className='input-time' id="start-time"/> <p className="fs_md">~</p> <input type="time" className='input-time' id="end-time"/>
                    </div>
                    <p className="fs_md mt_lg mb_md">휴식 시간</p>
                    <input type="time" className='input-time' id="break-time"/>
                    <p className="fs_md mt_lg">메모</p>
                    <textarea className='textarea mt_md fs_md' rows={5}></textarea>
                    <button className="btn btn-max btn-pm fs_lg mt_lg">스케줄 등록</button>
                </div>
            </div>
            <div className="sched-btn" onClick={handleEdit}>
                {editOpen ? (
                  <img src="/image/icon_close.svg" alt="스케줄 편집 닫기"/>
                ) : (
                  <img src="/image/icon_write.svg" alt="스케줄 편집 열기"/>
                )}
            </div>
        </>
    );
}

export default Calender;