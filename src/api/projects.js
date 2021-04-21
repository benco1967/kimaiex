import {URL_KIMAI} from "../common/parameters";
import axios from "axios";

export const getProjects = async ({username, password}) => {
  const data = await axios.get(`${URL_KIMAI}/api/projects`, {
    headers: {
      'X-AUTH-USER': username,
      'X-AUTH-TOKEN': password,
    }
  });
  return data.data;
};
