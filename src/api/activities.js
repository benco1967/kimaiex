import {URL_KIMAI} from "../common/parameters";
import axios from "axios";

export const getActivities = async ({username, password}) => {
  const data = await axios.get(`${URL_KIMAI}/api/activities`, {
    headers: {
      'X-AUTH-USER': username,
      'X-AUTH-TOKEN': password,
    }
  });
  return data.data;
};
