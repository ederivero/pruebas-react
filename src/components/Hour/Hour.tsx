import React, { useContext } from "react";
import HourContext from "../../HourContext";
export const Hour = ({
  hour,
  active,
  toggleActive,
}: {
  hour: string;
  active: boolean;
  toggleActive: (hour: string) => void;
}) => {

  const { changeHour } = useContext(HourContext)

  function selectHour(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    toggleActive(hour);
  }

  function confirmHour(e: React.MouseEvent<HTMLButtonElement>) {
    if (changeHour) {
      changeHour(hour)
    }
  }

  return (
    <div>
      <button
        className={active ? "btn-active" : "btn-hour"}
        onClick={selectHour}
        value={hour}
        id={hour}
      >
        {hour}
      </button>
      {active ? (
        <button className="btn-confirm" onClick={confirmHour}>
          Confirm
        </button>
      ) : null}
    </div>
  );
};
