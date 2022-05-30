// import Cookies from "universal-cookie";
import axios from "axios";
import config from "../../config";
import { getAccessToken } from "./user";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      //   let cookies = new Cookies();
      //   cookies.remove("@accessToken", { path: `${config.baseName}/` });
      //   cookies.remove("@refreshToken", { path: `${config.baseName}/` });
      //   cookies.remove("@portalTypeId", { path: `${config.baseName}/` });
      //   cookies.remove("@userId", { path: `${config.baseName}/` });
      //   window.location.href = `${config.baseName}/sessionout`;
    }
    return error.response;
  }
);
//
export const fetchAddSkill = async (payload) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/skill/addeditskill`,
      method: 'POST',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    return responseBody;
  } catch (error) {
    return {
      data: [],
      message: (error.response && error.response.data.Message) || "An error has occurred.",
      error: true
    };
  }
};


export const fetchSkillDetails = async (payload) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/skill/getskillbyid`,
      method: 'POST',
      data: (payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        // 'Authorization': `Bearer ${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    return responseBody;
  } catch (error) {
    return {
      data: [],
      message: (error.response && error.response.data.Message) || "An error has occurred.",
      error: true
    };
  }
};

export const deleteSkill = async (payload) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/skill/deleteskill`,
      method: 'DELETE',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    return responseBody;
  } catch (error) {
    return {
      data: [],
      message: (error.response && error.response.data.Message) || "An error has occurred.",
      error: true
    };
  }
};