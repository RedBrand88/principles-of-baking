import { format } from "date-fns";
import { MouseEvent } from "react";
import useSelectedMonth from "../../Hooks/UseSelectedMonth";
import "./calendar.css";

const Calendar = () => {
  const {
    selectedMonth,
    nextSelectedMonth,
    prevSelectedMonth,
    selectedDay,
    //setSelectedDate
  } = useSelectedMonth();

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const dayOnClick = (e: MouseEvent<HTMLElement>) => {
    console.log(e.target)
  }

  return (
    <div className="calendarContainer">
      <div className="calendar">
        <div>
          <div className="controls">
            <button className="leftButton" onClick={prevSelectedMonth}>prev</button>
            <button className="rightButton" onClick={nextSelectedMonth}>next</button>
          </div>
          <div className="monthTitle">{format(selectedDay, 'MMMM')} {format(selectedDay, 'yyyy')}</div>
          <div className="headers">
            {weekdays.map(day => {
              return (
                <div key={day} className="headerCell">
                  {day}
                </div>
              )
            })}
          </div>
        </div>
        <div className="weekdays">
          {selectedMonth.map(week => {
            return (
              <>
                <div onClick={dayOnClick} className="day" key={week[0].toISOString()}>
                  <div className="dayNumber">
                    {format(week[0], "d")}
                  </div>
                </div>
                <div onClick={dayOnClick} className="day" key={week[1].toISOString()}>
                  <div className="dayNumber">
                    {format(week[1], "d")}
                  </div>
                </div>
                <div onClick={dayOnClick} className="day" key={week[2].toISOString()}>
                  <div className="dayNumber">
                    {format(week[2], "d")}
                  </div>
                </div>
                <div onClick={dayOnClick} className="day" key={week[3].toISOString()}>
                  <div className="dayNumber">
                    {format(week[3], "d")}
                  </div>
                </div>
                <div onClick={dayOnClick} className="day" key={week[4].toISOString()}>
                  <div className="dayNumber">
                    {format(week[4], "d")}
                  </div>
                </div>
                <div onClick={dayOnClick} className="day" key={week[5].toISOString()}>
                  <div className="dayNumber">
                    {format(week[5], "d")}
                  </div>
                </div>
                <div onClick={dayOnClick} className="saturday" key={week[6].toISOString()}>
                  <div className="dayNumber">
                    {format(week[6], "d")}
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>);
};

export default Calendar;
