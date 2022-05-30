import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function AWSPage() {
 
  const lodder = () => {
    // const LoggedIN = localStorage.getItem("loggedin-user");
    // const loginToken =
    //   LoggedIN == "true" ? true : false;
    //   if(!loginToken)
    //   localStorage.setItem('loggedin-user', true);
    const authToken =  localStorage.getItem("loggedin-token");
    if(!authToken || authToken == null){
    window.location.href =
      "https://smartrouter-us-bank-domainservice-test.auth.us-east-1.amazoncognito.com/login?client_id=f2luss9807qsn9tikqamvcq2i&response_type=code&scope=profile+email+openid&redirect_uri=http://localhost:3000/";

    
  }}

  useEffect(()=>lodder(), []);

  return <></>;
}
