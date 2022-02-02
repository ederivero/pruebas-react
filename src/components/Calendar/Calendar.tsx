import React, { Dispatch, SetStateAction, useState } from "react";
import { CalendarTileProperties } from "react-calendar";
import ReactCalendar from "react-calendar";
import "./Calendar.css";

export const Calendar = ({
  setDay,
}: {
  setDay: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  function offWeekend(e: CalendarTileProperties) {
    return e.date.getDay() === 0 || e.date.getDay() === 6;
  }
  return (
    <div>
      <ReactCalendar
        minDetail="month"
        calendarType="US"
        onChange={setDay}
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
