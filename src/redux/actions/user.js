//import Cookies from "universal-cookie";
import axios from "axios";
//import config from "../../config";

//const cookies = new Cookies();

axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    if(error.response.status === 401) {
      // let cookies = new Cookies();
        // cookies.remove('@clientAccessToken', { path: `${config.baseName}/` });
        // cookies.remove('@clientRefreshToken', { path: `${config.baseName}/` });
        // cookies.remove('@clientUserId', { path: `${config.baseName}/` });
        // window.location.href = `${config.baseName}/sessionout`;
    }
    return error.response;
  });

  export const getAccessToken = async () => {
    const cookies = new Cookies(window.document.cookie);
    // const refreshToken = cookies.get("@clientRefreshToken");
    const accessToken = cookies.get("Authorization");
    if (accessToken) {
      return accessToken;
    }
  };
