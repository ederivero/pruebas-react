import React, { useContext } from "react";
import { HourContext } from "../../hourContext";
export const Hour = ({
  hour,
  active,
  toggleActive,
}: {
  hour: string;
  active: boolean;
  toggleActive: (hour: string) => void;
}) => {
  const data = useContext(HourContext);

  function selectHour(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(e.currentTarget.value);
    toggleActive(hour);
  }

  function confirmHour(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useHourUpdate(hour);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (data?.changeHour) {
      data?.changeHour(hour);
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
