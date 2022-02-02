import React, { useContext, useState, createContext } from "react";
import HourContext from "./HourContext";

export const HourProvider = ({ children }: { children: any }) => {

  const [hour, setHour] = useState<string>("");

  function changeHour(data: string): void {
    setHour(data);
  }

  return (
    <HourContext.Provider
      value={{
        changeHour,
        hour,
      }}
    >
      {children}
    </HourContext.Provider>
  );
};
