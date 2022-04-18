import axios from "axios";

const BASE_URL = "https://calendar-api-express.herokuapp.com";
// const BASE_URL = "http://localhost:3001/api";
const request = axios.create({ baseURL: BASE_URL });
interface meeting {
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
}
interface busyHours {
  data: {
    items: meeting[];
  };
}

interface decodeUser {
  claimerEmail: string;
  candidateEmail: string;
  eventName: string;
  event: string;
  duration: string;
}

interface ICreateEvent {
  date: string;
  hour: string;
  claimerEmail: string;
  candidateEmail: string;
}

export function getUserInfo(hash: string) {
  const hashWithoutSpaces = hash.replaceAll(" ", "+");

  return request.post<decodeUser>(`/auth/decode`, {
    hash: hashWithoutSpaces,
  });
}

export function getBusyHours(email: string) {
  return request.get<busyHours>(`/event/${email}`);
}

export function createEvent(data: ICreateEvent) {
  return request.post<{ message: string }>(`/event`, data);
}
