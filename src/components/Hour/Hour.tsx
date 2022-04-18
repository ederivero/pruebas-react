import React, { useContext, useState } from "react";
import { HourContext } from "../../hourContext";
import SweetAlert from "react-bootstrap-sweetalert";
import { SweetAlertRenderProps } from "react-bootstrap-sweetalert/dist/types";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../services/event.service";

export const Hour = ({
  hour,
  active,
  toggleActive,
}: {
  hour: string;
  active: boolean;
  toggleActive: (hour: string) => void;
}) => {
  const { changeHour, date, info } = useContext(HourContext);
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState<boolean>(false);
  function selectHour(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    toggleActive(hour);
  }

  function confirmHour(e: React.MouseEvent<HTMLButtonElement>) {
    if (changeHour) {
      changeHour(hour);
      setConfirm(true);
    }
  }

  async function confirms() {
    setConfirm(false);

    const { status } = await createEvent({
      date,
      hour,
      candidateEmail: info.candidateEmail,
      claimerEmail: info.claimerEmail,
    });

    if (status === 201) {
      navigate("/done");
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

      {confirm && (
        <SweetAlert
          title={`Are you sure to confirm ${date}, ${hour}`}
          onConfirm={confirms}
          closeOnClickOutside={true}
          showConfirm={false}
        >
          {(e: SweetAlertRenderProps) => (
            <div>
              <p>Hola</p>
              <button onClick={confirms}>Create</button>
            </div>
          )}
        </SweetAlert>
      )}
    </div>
  );
};
