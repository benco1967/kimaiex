import {URL_KIMAI} from "../common/parameters";
import axios from "axios";

export const getTimesheetsOf = async ({username, password, id}, date, project) => {
  const begin = new Date(date).toISOString().slice(0, 10) + 'T00:00:00';
  const end = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10) + 'T00:00:00';
  const data = await axios.get(`${URL_KIMAI}/api/timesheets?user=${id}&begin=${begin}&end=${end}${project ? `&project=${project}` : ''}`, {
    headers: {
      'X-AUTH-USER': username,
      'X-AUTH-TOKEN': password,
    }
  });
  return data.data;
};
export const patchTimesheet = async ({username, password}, id, timesheet) => {
  const data = await axios.patch(`${URL_KIMAI}/api/timesheets/${id}`, timesheet, {
    headers: {
      'X-AUTH-USER': username,
      'X-AUTH-TOKEN': password,
    }
  });
  return data.data;
}
export const postTimesheet = async ({username, password}, timesheet) => {
  const data = await axios.post(`${URL_KIMAI}/api/timesheets`, timesheet, {
    headers: {
      'X-AUTH-USER': username,
      'X-AUTH-TOKEN': password,
    }
  });
  return data.data;
}