import { createContext } from "react";

export const HourContext = createContext<{
  changeHour?: (data: string) => void;
  changeDate?: (data: string) => void;
  hour: string;
  date: string;
  changeInfo?: (data: {
    title: string;
    duration: string;
    assignee: string;
    candidateEmail: string;
    claimerEmail: string;
  }) => void;
  info: {
    title: string;
    duration: string;
    assignee: string;
    candidateEmail: string;
    claimerEmail: string;
  };
}>({
  hour: "",
  date: "",
  info: {
    title: "",
    duration: "",
    assignee: "",
    candidateEmail: "",
    claimerEmail: "",
  },
});
