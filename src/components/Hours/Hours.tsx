import React, { useEffect, useState } from "react";
import { Hour } from "../Hour/Hour";
import "./Hours.css";

export const Hours = ({
  busyHours,
  day,
}: {
  busyHours: string[][];
  day: Date;
}) => {
  const [availableHours, setAvailableHours] =
    useState<{ hour: string; active: boolean }[]>();
  const [dateText, setDateText] = useState("");

  useEffect(() => {
    const meetingHours = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ];
    const availableHoursForMeetings: string[] = [];
    meetingHours.forEach((hour) => {
      const [h, m] = hour.split(":");
      let available = true;

      busyHours.forEach((busyHour) => {
        const [startHour, endHour] = busyHour;
        const [hourtStartHour, minuteStartHour] = startHour.split(":");

        const [hourtEndHour, minuteEndHour] = endHour.split(":");

        if (+h >= +hourtStartHour && +m >= +minuteStartHour) {
          if (+h <= +hourtEndHour && +m <= +minuteEndHour) {
            available = false;
          }
          return;
        }
      });

      if (available) {
        availableHoursForMeetings.push(hour);
      }
    });

    setAvailableHours(
      availableHoursForMeetings.map((hour) => ({ hour, active: false }))
    );
  }, [busyHours]);

  useEffect(() => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    setDateText(
      `${days[day.getDay()]}, ${months[day.getMonth()]} ${day.getDate()}`
    );
  }, [day]);

  function toggleActive(hour: string) {
    setAvailableHours((prevData) => {
      return prevData?.map((data) => {
        if (data.hour === hour) {
          data.active = true;
        } else {
          data.active = false;
        }
        return data;
      });
    });
  }
  return (
    <>
      <p>{dateText}</p>
      {availableHours?.map((item, id) => (
        <Hour
          key={id}
          hour={item.hour}
          active={item.active}
          toggleActive={toggleActive}
        />
      ))}
    </>
  );
};
