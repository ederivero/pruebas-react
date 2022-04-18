import React, { useState } from "react";
import { HourContext } from "./hourContext";

export const HourProvider = ({ children }: { children: any }) => {
  const [hour, setHour] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [info, setInfo] = useState<{
    title: string;
    duration: string;
    assignee: string;
    candidateEmail: string;
    claimerEmail: string;
  }>({
    assignee: "",
    candidateEmail: "",
    duration: "",
    title: "",
    claimerEmail: "",
  });
  function changeHour(data: string): void {
    setHour(data);
  }

  function changeDate(date: string) {
    setDate(date);
  }

  function changeInfo(data: {
    title: string;
    duration: string;
    assignee: string;
    candidateEmail: string;
    claimerEmail: string;
  }) {
    setInfo(data);
  }

  return (
    <HourContext.Provider
      value={{
        changeHour,
        changeDate,
        changeInfo,
        hour,
        date,
        info,
      }}
    >
      {children}
    </HourContext.Provider>
  );
};
