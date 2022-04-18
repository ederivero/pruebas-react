import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { HourProvider } from "./HourProvider";
import { Confirm } from "./pages/Confirm";
import { Scheduler } from "./pages/Scheduler";

function App() {
  useEffect(() => {
    const getInfo = async () => {
      const result = await fetch(
        "https://partner.gupshup.io/partner/app/71a704b0-2741-429f-967f-f3eca68e0e60/wallet/balance",
        {
          method: "GET",
          headers: { token: process.env.GOOGLE_TOKEN! },
        }
      );
      const json = await result.json();
      console.log(json);
    };
    getInfo();
  }, []);
  return (
    <HourProvider>
      <Router>
        <Routes>
          <Route path="/done" element={<Confirm />} />
          <Route path="/" element={<Scheduler />} />
        </Routes>
      </Router>
    </HourProvider>
  );
}

export default App;
