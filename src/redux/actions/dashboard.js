// import Cookies from "universal-cookie";
import axios from "axios";
import config from "../../config";
import { getAccessToken } from '../helpers/user';


axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
        // let cookies = new Cookies();
        // cookies.remove("@accessToken", { path: `${config.baseName}/` });
        // cookies.remove("@refreshToken", { path: `${config.baseName}/` });
        // cookies.remove("@portalTypeId", { path: `${config.baseName}/` });
        // cookies.remove("@userId", { path: `${config.baseName}/` });
        // window.location.href = `${config.baseName}/sessionout`;
    }
    return error.response;
  }
);

export const fetchRequests = (payload) => async (dispatch) => {
  try {
    // let cookies = new Cookies(window.document.cookie);
    const accessToken = await getAccessToken();
    // const userId = cookies.get("@clientUserId");
    const response = await axios({
      // url: `https://gwqzzb4l56.execute-api.us-east-1.amazonaws.com/dev/GetOngoingRequestsDetail`,
      url: `${config.apiBase}/dashboard/GetAllActiveRequests`,
      method: 'POST',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    if (responseBody.Success === true) {
      dispatch({
        type: 'FETCH_REQUESTS_SUCCESS',
        payload: {
          data: responseBody.Data,
          message: responseBody.Message,
          currentPage: responseBody.CurrentPage,
          pageSize: responseBody.PageSize,
          totalCount: responseBody.TotalCount,
          totalPages: responseBody.TotalPages
        }
      })
      return responseBody;
    }
    dispatch({
      type: 'FETCH_REQUESTS_FAILED',
      payload: {
        message: responseBody.Message || "An error has occured.",
        data: null
      }
    })
    return false;
  } catch (error) {
    dispatch({
      type: 'FETCH_REQUESTS_FAILED',
      payload: {
        message: (error.response && error.response.data.Message) || "An error has occurred.",
        data: null
      }
    })
    return false;
  }
};

export const fetchfilterbyCount = (payload) => async (dispatch) => {
  try {
    // let cookies = new Cookies(window.document.cookie);
    const accessToken = await getAccessToken();
    // const userId = cookies.get("@clientUserId");
    const response = await axios({
      // url: ` https://gwqzzb4l56.execute-api.us-east-1.amazonaws.com/dev/GetOngoingRequests`,
      url: `${config.apiBase}/dashboard/GetMasterListFilters`,
      method: 'GET',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    if (responseBody.Success === true) {
    
      dispatch({
        type: 'FETCH_filterby_SUCCESS',
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
      type: 'FETCH_filterby_FAILED',
      payload: {
        message: responseBody.Message || "An error has occured.",
        data: null
      }
    })
    return false;
  } catch (error) {
    dispatch({
      type: 'FETCH_filterby_FAILED',
      payload: {
        message: (error.response && error.response.data.Message) || "An error has occurred.",
        data: null
      }
    })
    return false;
  }
};

export const fetchRequestsCount = (payload) => async (dispatch) => {
  try {
    // let cookies = new Cookies(window.document.cookie);
    const accessToken = await getAccessToken();
    // const userId = cookies.get("@clientUserId");
    const response = await axios({
      // url: ` https://gwqzzb4l56.execute-api.us-east-1.amazonaws.com/dev/GetOngoingRequests`,
      url: `${config.apiBase}/dashboard/GetStagesAndCount`,
      
      method: 'Post',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    if (responseBody.Success === true) {
    
      dispatch({
        type: 'FETCH_REQUESTS_COUNT_SUCCESS',
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
      type: 'FETCH_REQUESTS_COUNT_FAILED',
      payload: {
        message: responseBody.Message || "An error has occured.",
        data: null
      }
    })
    return false;
  } catch (error) {
    dispatch({
      type: 'FETCH_REQUESTS_COUNT_FAILED',
      payload: {
        message: (error.response && error.response.data.Message) || "An error has occurred.",
        data: null
      }
    })
    return false;
  }
};