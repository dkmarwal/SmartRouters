// import Cookies from "universal-cookie";
import axios from "axios";
import config from "../../config";
//import { getAccessToken } from './../helpers/user';


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

export const fetchAuditTrail = (payload) => async (dispatch) => {
    try {
      //const accessToken = await getAccessToken();
      const response = await axios({
        url: `${config.apiBase}/audit/getaudittrail`,
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
          type: 'FETCH_AUDIT_TRAIL_SUCCESS',
          payload: {
            data: responseBody.Data,
            message: responseBody.Message,
            pageNum: responseBody.PageNum,
            pageSize: responseBody.PageSize,
            totalPages: responseBody.TotalPages
          }
        })
        return true;
      }
      dispatch({
        type: 'FETCH_AUDIT_TRAIL_FAILED',
        payload: {
          data: null
        }
      })
      return false;
    } catch (error) {
      dispatch({
        type: 'FETCH_AUDIT_TRAIL_FAILED',
        payload: {
          data: null
        }
      })
      return false;
    }
  };