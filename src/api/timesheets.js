import {URL_KIMAI} from "../common/parameters";
import axios from "axios";

export const getTimesheetsOf = async ({username, password, id}, begin, end) => {
  const data = await axios.get(`${URL_KIMAI}/api/timesheets?user=${id}&begin=${begin}&end=${end}`, {
    headers: {
      'X-AUTH-USER': username,
      'X-AUTH-TOKEN': password,
    }
  });
  return data.data;
};
