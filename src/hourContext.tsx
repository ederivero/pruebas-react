import React, { useContext, useState } from "react";

export const HourContext = React.createContext<{
  changeHour?: (data: string) => void;
  hour: string;
}>({ hour: "asdasd" });

export function useHour() {
  return useContext(HourContext);
}

export const HourProvider = ({ children }: { children: any }) => {
  const [hour, setHour] = useState("");

  console.log(hour);
  function changeHour(data: string) {
    setHour(data);
    console.log("entro");

    // setHour(data);
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
