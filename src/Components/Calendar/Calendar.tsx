import { format } from "date-fns";
import React, { MouseEvent } from "react";
import useSelectedMonth from "../../Hooks/UseSelectedMonth";

const Calendar = () => {
    const {
        selectedMonth,
        nextSelectedMonth,
        prevSelectedMonth,
        selectedDay,
        setSelectedDate
    } = useSelectedMonth();

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const dayOnClick = (e: MouseEvent<HTMLElement>) => {
        console.log(e.target)
    }

    return (
<div className="bg-[#053742] text-white h-screen pt-16 w-screen">
            <div className="bg-black rounded h-4/5">
                <div>
                    <div className="flex justify-between">
                        <button className="pl-2" onClick={prevSelectedMonth}>prev</button>
                        <button className="pr-2" onClick={nextSelectedMonth}>next</button>
                    </div>
                    <div className="text-center font-bold text-2xl">{format(selectedDay, 'MMMM')} {format(selectedDay, 'yyyy')}</div>
                    <div className="flex items-end h-4/6">
                        {weekdays.map(day => {
                            return (
                                <div key={day} className="w-1/6 text-center border border-white">
                                    {day}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-7 grid-rows-{selectedMonth.length} h-4/5">
                    {selectedMonth.map(week => {
                        return (
                            <>
                                <div onClick={dayOnClick} className="border border-white border-r-0" key={week[0]}>
                                    <div className="ml-2 mt-2">
                                        {format(week[0], "d")}
                                    </div>
                                </div>
                                <div onClick={dayOnClick} className="border border-white border-r-0" key={week[1]}>
                                    <div className="ml-2 mt-2">
                                        {format(week[1], "d")}
                                    </div>
                                </div>
                                <div onClick={dayOnClick} className="border border-white border-r-0" key={week[2]}>
                                    <div className="ml-2 mt-2">
                                        {format(week[2], "d")}
                                    </div>
                                </div>
                                <div onClick={dayOnClick} className="border border-white border-r-0" key={week[3]}>
                                    <div className="ml-2 mt-2">
                                        {format(week[3], "d")}
                                    </div>
                                </div>
                                <div onClick={dayOnClick} className="border border-white border-r-0" key={week[4]}>
                                    <div className="ml-2 mt-2">
                                        {format(week[4], "d")}
                                    </div>
                                </div>
                                <div onClick={dayOnClick} className="border border-white border-r-0" key={week[5]}>
                                    <div className="ml-2 mt-2">
                                        {format(week[5], "d")}
                                    </div>
                                </div>
                                <div onClick={dayOnClick} className="border border-white" key={week[6]}>
                                    <div className="ml-2 mt-2">
                                        {format(week[6], "d")}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>    );
};

export default Calendar;
