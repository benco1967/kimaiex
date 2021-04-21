import axios from "axios";
import {URL_KIMAI} from "../common/parameters";

export const login = async (username, password) => {
    const result = await axios.get(`${URL_KIMAI}/api/users/me`, {
      headers: {
        'X-AUTH-USER': username,
        'X-AUTH-TOKEN': password,
      }
    });

    return {username, password, id: result.data.id};
}
