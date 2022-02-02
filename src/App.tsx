/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import { Calendar } from "./components/Calendar/Calendar";
import { Description } from "./components/Description/Description";
import { Hours } from "./components/Hours/Hours";
import { HourProvider } from "./HourProvider";

interface IData {
  kind: string;
  timeMin: string;
  timeMax: string;
  calendars: {
    [key: string]: ICalendar;
  };
}
interface ICalendar {
  busy: IBusy[];
}
interface IBusy {
  start: string;
  end: string;
}

function App() {
  const [hours, setHours] = useState<string[][]>([]);
  const [data, setData] = useState<IData>();
  const [day, setDay] = useState<Date>();

  // const { hour } = useContext(HourContext);

  const [description, setDescription] = useState({
    title: "",
    duration: "",
    assignee: "",
  });

  useEffect(() => {
    // get the data for the backend or google lib
    // mocked data
    setData({
      kind: "calendar#freeBusy",
      timeMin: "2022-01-01T05:00:00.000Z",
      timeMax: "2022-02-01T05:00:00.000Z",
      calendars: {
        "diana@ravn.co": {
          busy: [
            {
              start: "2022-01-26T09:00:00Z",
              end: "2022-01-26T09:30:00Z",
            },
            {
              start: "2022-01-26T18:00:00Z",
              end: "2022-01-26T20:30:00Z",
            },
            {
              start: "2022-01-27T14:00:00Z",
              end: "2022-01-27T15:00:00Z",
            },
            {
              start: "2022-01-28T18:00:00Z",
              end: "2022-01-28T18:30:00Z",
            },
            {
              start: "2022-01-31T18:00:00Z",
              end: "2022-01-31T18:30:00Z",
            },
          ],
        },
      },
    });
    // receive the person assigned who is going to have the meeting
    setDescription({
      assignee: "Eduardo Manrique",
      duration: "45min",
      title: "Initial Interview",
    });
  }, []);

  useEffect(() => {
    const meetings = data?.calendars["diana@ravn.co"].busy.filter((busy) => {
      const startMeeting = new Date(busy.start);
      const endMeeting = new Date(busy.end);
      if (
        day?.getFullYear() === startMeeting.getFullYear() &&
        day?.getMonth() === startMeeting.getMonth() &&
        day?.getDate() === startMeeting.getDate()
      ) {
        return [startMeeting, endMeeting];
      }
    });

    setHours([]);
    meetings?.forEach((meet) => {
      const startMeeting = new Date(meet.start);
      const endMeeting = new Date(meet.end);
      var startMinutes = startMeeting.getMinutes();
      var startHour = startMeeting.getHours();

      var endMinutes = endMeeting.getMinutes();
      var endHour = endMeeting.getHours();
      setHours((prevHours) => [
        ...prevHours,
        [`${startHour}:${startMinutes}`, `${endHour}:${endMinutes}`],
      ]);
    });
  }, [day]);

  return (
    <HourProvider>
      <div className="App">
        <div className="description">
          <Description
            assignee={description.assignee}
            duration={description.duration}
            title={description.title}
          />
        </div>
        <div className="calendar">
          <Calendar setDay={setDay} />
        </div>
        <div className="hours">
          {day ? <Hours busyHours={hours} day={day} /> : null}
        </div>
      </div>
    </HourProvider>
  );
}

export default App;
