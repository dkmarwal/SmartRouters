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

export const fetchSkills = (payload) => async (dispatch) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/skill/getskills`,
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
        type: 'FETCH_SKILLS_SUCCESS',
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
      type: 'FETCH_SKILLS_FAILED',
      payload: {
        message: responseBody.Message || "An error has occured.",
        data: null
      }
    })
    return false;
  } catch (error) {
    dispatch({
      type: 'FETCH_SKILLS_FAILED',
      payload: {
        message: (error.response && error.response.data.Message) || "An error has occurred.",
        data: null
      }
    })
    return false;
  }
};

export const fetchSkillsforExcel = (payload) => async (dispatch) => {
 
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/skill/getskills`,
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

      return responseBody
    }
  } catch (error) {
    return error
  }}
export const fetchSearchSkills = (payload) => async () => {

  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/skill/getskills`,
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




export const fetchAllBusinessLine = (payload) => async (dispatch) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/businessline/getallbusinessline`,
      method: 'GET',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        // 'Authorization': `Bearer ${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    if (responseBody.Success === true) {
      dispatch({
        type: 'FETCH_BUSINESS_LINE_SUCCESS',
        payload: {
          data: responseBody.Data,
        }
      })
      return true;
    }
    dispatch({
      type: 'FETCH_BUSINESS_LINE_FAILED',
      payload: {
        data: null
      }
    })
    return false;
  } catch (error) {
    dispatch({
      type: 'FETCH_BUSINESS_LINE_FAILED',
      payload: {
        data: null
      }
    })
    return false;
  }
};
export const fetchAllProductaction = (payload) => async (dispatch) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/product/getproductactions`,
      method: 'GET',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        // 'Authorization': `Bearer ${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    if (responseBody.Success === true) {
      dispatch({
        type: 'FETCH_PRODUCTACTION_SUCCESS',
        payload: {
          data: responseBody.Data,
        }
      })
      return true;
    }
    dispatch({
      type: 'FETCH_PRODUCTACTION_FAILED',
      payload: {
        data: null
      }
    })
    return false;
  } catch (error) {
    dispatch({
      type: 'FETCH_ProductAction_FAILED',
      payload: {
        data: null
      }
    })
    return false;
  }
};
export const fetchRequestType = (payload) => async (dispatch) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/requesttype/getallrequesttype`,
      method: 'GET',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        // 'Authorization': `Bearer ${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    if (responseBody.Success === true) {
      dispatch({
        type: 'FETCH_REQUEST_TYPE_SUCCESS',
        payload: {
          data: responseBody.Data,
        }
      })
      return true;
    }
    dispatch({
      type: 'FETCH_REQUEST_TYPE_FAILED',
      payload: {
        data: null
      }
    })
    return false;
  } catch (error) {
    dispatch({
      type: 'FETCH_REQUEST_TYPE_FAILED',
      payload: {
        data: null
      }
    })
    return false;
  }
};

export const fetchCustomerType = (payload) => async (dispatch) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/customertype/getallcustomertype`,
      method: 'GET',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        // 'Authorization': `Bearer ${accessToken}`,
        // 'pragma': 'no-cache',
      },
    })
    const responseBody = await response.data;
    if (responseBody.Success === true) {
      dispatch({
        type: 'FETCH_CUSTOMER_TYPE_SUCCESS',
        payload: {
          data: responseBody.Data,
        }
      })
      return true;
    }
    dispatch({
      type: 'FETCH_CUSTOMER_TYPE_FAILED',
      payload: {
        data: null
      }
    })
    return false;
  } catch (error) {
    dispatch({
      type: 'FETCH_CUSTOMER_TYPE_FAILED',
      payload: {
        data: null
      }
    })
    return false;
  }
};


export const aythanticateduser = (payload) => async () => {

  try {
    const accessToken = await getAccessToken();
    const response = await axios({
    
      url: `${config.apiBase}/usermanagement/ValidateUser`,
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
    
   
  } catch (error) {
   
    return error;
  }
};