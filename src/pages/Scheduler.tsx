import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "../components/Calendar/Calendar";
import { Description } from "../components/Description/Description";
import { Hours } from "../components/Hours/Hours";
import { HourContext } from "../hourContext";
import { getBusyHours, getUserInfo } from "../services/event.service";
import { InvalidHash } from "./InvalidHash/InvalidHash";

interface IData {
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
}

interface IClaimer {
  claimerEmail: string;
  candidateEmail: string;
  eventName: string;
  event: string;
  duration: string;
}

export const Scheduler = () => {
  const [hours, setHours] = useState<string[][]>([]);
  const [data, setData] = useState<IData[]>();
  const [day, setDay] = useState<Date>();
  const [claimer, setClaimer] = useState<IClaimer>();

  const { info, changeInfo } = useContext(HourContext);

  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const askData = async () => {
      const hash = queryParams.get("hash");
      if (hash) {
        const { data } = await getUserInfo(hash);
        console.log(data);

        setClaimer(data);

        // receive the person assigned who is going to have the meeting

        if (changeInfo) {
          changeInfo({
            assignee: data?.claimerEmail ?? "",
            candidateEmail: data?.candidateEmail ?? "",
            duration: data?.duration ?? "",
            title: data?.eventName ?? "",
            claimerEmail: data?.claimerEmail ?? "",
          });
        }
        // get the data for the backend or google lib
        // mocked data
        const {
          data: {
            data: { items },
          },
        } = await getBusyHours(data?.claimerEmail);

        setData(items);
      }
    };
    askData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let meetings: [start: Date, end: Date][] = [];

    data?.forEach((busy) => {
      const startMeeting = new Date(busy.start.dateTime);
      const endMeeting = new Date(busy.end.dateTime);

      if (
        day?.getFullYear() === startMeeting.getFullYear() &&
        day?.getMonth() === startMeeting.getMonth() &&
        day?.getDate() === startMeeting.getDate()
      ) {
        console.log(startMeeting);

        meetings.push([startMeeting, endMeeting]);
      }
    });

    setHours([]);
    meetings?.forEach((meet) => {
      const startMeeting = new Date(meet[0]);
      const endMeeting = new Date(meet[1]);
      var startMinutes = startMeeting.getMinutes();
      var startHour = startMeeting.getHours();

      var endMinutes = endMeeting.getMinutes();
      var endHour = endMeeting.getHours();
      setHours((prevHours) => [
        ...prevHours,
        [`${startHour}:${startMinutes}`, `${endHour}:${endMinutes}`],
      ]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  return claimer ? (
    <div className="App">
      <div className="description">
        <Description
          assignee={info.assignee}
          duration={info.duration}
          title={info.title}
        />
      </div>
      <div className="calendar">
        <Calendar setDay={setDay} />
      </div>
      <div className="hours">
        {day ? <Hours busyHours={hours} day={day} /> : null}
      </div>
    </div>
  ) : (
    <div>
      <InvalidHash />
    </div>
  );
};
