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

export const fetchProductsSLA = (payload) => async (dispatch) => {
  try {
    //const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/productsla/getallproductsla`,
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
        type: 'FETCH_PRODUCTS_SUCCESS',
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
      type: 'FETCH_PRODUCTS_FAILED',
      payload: {
        message: responseBody.Message || "An error has occured.",
        data: null
      }
    })
    return false;
  } catch (error) {
    dispatch({
      type: 'FETCH_PRODUCTS_FAILED',
      payload: {
        message: (error.response && error.response.data.Message) || "An error has occurred.",
        data: null
      }
    })
    return false;
  }
};
export const fetchProductsSLAforExcel = (payload) => async (dispatch) => {
 
  try {
    //const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/productsla/getallproductsla`,
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
export const fetchsearchSLA = (payload) => async (dispatch) => {
  try {
    //const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/productsla/getallproductsla`,
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
    
      
      return responseBody
    
    
  } catch (error) {
    dispatch({
      type: 'FETCH_PRODUCTS_FAILED',
      payload: {
        message: (error.response && error.response.data.Message) || "An error has occurred.",
        data: null
      }
    })
    return false;
  }
};




export const fetchAllProducts = (payload) => async (dispatch) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${config.apiBase}/product/getproducts`,
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
        type: 'FETCH_ALL_PRODUCTS_SUCCESS',
        payload: {
          data: responseBody.Data,
          message: responseBody.Message
        }
      })
      return true;
    }
    dispatch({
      type: 'FETCH_ALL_PRODUCTS_FAILED',
      payload: {
        message: responseBody.Message || "An error has occured.",
        data: null
      }
    })
    return false;
  } catch (error) {
    dispatch({
      type: 'FETCH_ALL_PRODUCTS_FAILED',
      payload: {
        message: (error.response && error.response.data.Message) || "An error has occurred.",
        data: null
      }
    })
    return false;
  }
};

