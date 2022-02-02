import { createContext } from "react"

const HourContext = createContext<{
    changeHour?: (data: string) => void;
    hour: string;
}>({ hour: "" });

export default HourContext;