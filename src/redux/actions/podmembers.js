// import Cookies from "universal-cookie";
import axios from "axios";
import config from "../../config";
import { getAccessToken } from './../helpers/user';


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

export const fetchPodMembers = (payload) => async (dispatch) => {
  try {
    //const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/agent/getagentsdetail`,
      method: 'POST',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `${accessToken}`,
        // 'Authorization': `Bearer ${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    if (responseBody.Success === true) {
      dispatch({
        type: 'FETCH_POD_MEMBERS_SUCCESS',
        payload: {
          data: responseBody.Data,
          message: responseBody.Message,
          currentPage: responseBody.CurrentPage,
          pageSize: responseBody.PageSize,
          totalCount: responseBody.TotalCount,
          totalPages: responseBody.TotalPages
        }
      })
      return true;
    }
    dispatch({
      type: 'FETCH_POD_MEMBERS_FAILED',
      payload: {
        message: responseBody.Message || "An error has occured.",
        data: null
      }
    })
    return false;
  } catch (error) {
    dispatch({
      type: 'FETCH_POD_MEMBERS_FAILED',
      payload: {
        message: (error.response && error.response.data.Message) || "An error has occurred.",
        data: null
      }
    })
    return false;
  }
};
export const fetchPodMembersforexcel = (payload) => async (dispatch) => {
  try {
    //const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/agent/getagentsdetail`,
      method: 'POST',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `${accessToken}`,
        // 'Authorization': `Bearer ${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    if (responseBody.Success === true) {

      return responseBody
    }
  } catch (error) {
    return error
  }}
export const fetchSearchMembers = (payload) => async () => {

  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/agent/getagentsdetail`,
      method: 'POST',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
   
    
      return responseBody
      // dispatch({
      //   type: 'FETCH_SKILLS_SUCCESS',
      //   payload: {
      //     data: responseBody.Data,
      //     message: responseBody.Message,
      //     currentPage: responseBody.CurrentPage,
      //     pageSize: responseBody.PageSize,
      //     totalCount: responseBody.TotalCount,
      //     totalPages: responseBody.TotalPages
      //   }
      // })
      // return true;
    
    
   
  } catch (error) {
   
    return error;
  }
};