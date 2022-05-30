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


export const fetchAllSkillsTeamMembers = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/skill/getallskill`,
      method: 'GET',
      data: JSON.stringify({
        PageNum: 1,
        PageSize: 10000
      }),
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

export const fetchAllPriorityLevels = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/skill/getprioritylevels`,
      method: 'GET',
      data: JSON.stringify({
        PageNum: 1,
        PageSize: 10000
      }),
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


export const fetchTeammembersDetails = async (payload) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/agent/getteammemberbyId`,
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


export const ToggleTeammembersDetails = async (payload) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/agent/updaterequestallocation`,
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

export const detailTeammembersDetails = async (payload) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/agent/DeleteTeamMember`,
      method: 'Delete',
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

