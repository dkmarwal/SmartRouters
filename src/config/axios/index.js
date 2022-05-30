import { create } from "axios";
import config from '../../config'
import {getCookie} from '../../views/AwsPage/helper'
export const configs = {
  baseURL: config.apiBase,
  mode: "no-cors",
};

const axiosInstance = create(configs);

    axiosInstance.interceptors.request.use(function (configuration) {
 let accessCookie =  getCookie("accessToken")
 if(!accessCookie){
   
    window.location.href =
    `https://${config.domain_name}/login?client_id=${config.client_id}&response_type=code&scope=profile+email+openid&redirect_uri=${config.REDIRECT_URL}/`;
 }
 
        // Do something before request is sent
        return configuration;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

export default axiosInstance;