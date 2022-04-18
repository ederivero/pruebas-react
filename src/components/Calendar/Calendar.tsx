import React, { Dispatch, SetStateAction, useContext } from "react";
import { CalendarTileProperties } from "react-calendar";
import ReactCalendar from "react-calendar";
import "./Calendar.css";
import { HourContext } from "../../hourContext";

export const Calendar = ({
  setDay,
}: {
  setDay: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  const { changeDate } = useContext(HourContext);

  function offWeekend(e: CalendarTileProperties) {
    return e.date.getDay() === 0 || e.date.getDay() === 6;
  }

  function setValue(date: Date) {
    setDay(date);

    if (changeDate) {
      changeDate(date.toString());
    }
  }

  return (
    <div>
      <ReactCalendar
        minDetail="month"
        calendarType="US"
        onChange={setValue}
        minDate={new Date()}
        maxDate={
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
          )
        }
        tileDisabled={offWeekend}
      />
    </div>
  );
};
