import { useMemo, useState, useCallback } from "react";
import { addDays, endOfMonth, startOfMonth, subDays } from "date-fns";
import { getMonth } from "../Utility/date-generators";

const useSelectedMonth = () => {
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()));

    const nextSelectedMonth = useCallback(() => {
        const day = addDays(endOfMonth(selectedDay), 1);
        setSelectedMonth(getMonth(day));
        setSelectedDay(day);
    }, [selectedDay]);

    const prevSelectedMonth = useCallback(() => {
        const day = subDays(startOfMonth(selectedDay), 1);
        setSelectedMonth(getMonth(day));
        setSelectedDay(day);
    }, [selectedDay]);

    const values = useMemo(
        () => ({
            selectedMonth,
            nextSelectedMonth,
            prevSelectedMonth,
            selectedDay,
            setSelectedDay
        }),
        [selectedMonth, nextSelectedMonth, prevSelectedMonth, selectedDay, setSelectedDay]
    );

    return values;
}

export default useSelectedMonth;
