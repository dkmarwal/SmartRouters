
import React, { useEffect, useLayoutEffect, useState } from "react";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import config from "../src/config";
import Amplify from "aws-amplify";
import {generateAuthToken} from "./views/AwsPage/helper"
import AWSPage from './views/AwsPage'
import awsCallTokenEndpoint from "./views/AwsPage/awsrequest"
// import Dashboard from "./views/Dashboard";
import Footer from "./components/Footer";
import Wrapper from "./views/Wrapper";
import { Route, Switch, useHistory,Redirect } from "react-router-dom";
import Box from "@mui/material/Box";
import {getauth} from "./views/AwsPage/helper"
import theme from "./theme.js";
import { makeStyles, createStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import Login from "./views/Login/index";
import ForgotPassword from "./views/ForgotPassword";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import axios from 'axios';
import {getEmailFromCode} from "./views/AwsPage/helper"
import {eventHandler,getCookie} from "./views/AwsPage/helper"
import { CircularProgress,
  TextField,
} from "@mui/material"
const qs = require('qs'); 



//const theme = createTheme();

const useStyles = makeStyles((theme) =>
  createStyles({
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.4em",
        height: "0.2em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 3px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb:vertical,::-webkit-scrollbar-thumb:horizontal":
        {
          background: "rgba(196, 196, 196, 1)",
          borderRadius: "20px",
          height: "0.2em",
        },
    },
    root: {
      flexGrow: 1,
    },
    container: {
      display: "flex",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      width: "calc(100% - 100px)",
      height: "100vh",
    },
  })
);

Amplify.configure({
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: `${config.pool_id}`,
  aws_user_pools_web_client_id: `${config.client_id}`,
});

function AppContent(props) {
  const classes = useStyles();
  const [loggedToken,setLoggedToken] = useState("")
  const [loader,setLoader] = useState(true)
 const [authorized,setUnAuthorized] = useState(false)
  // const LoggedIN = localStorage.getItem("loggedin-user");
  // const loginToken =
  //     LoggedIN == "true" ? true : false;
  
   
 


  
  // let newToken = await eventHandler(window.location.href) || localStorage.getItem("loggedin-token");
  
useLayoutEffect(()=>{
  (async function() {
    let accessCookie = await getCookie("accessToken")
 
    if(accessCookie){
    
      setLoader(false)
      return
    }
    if(window.location.href.lastIndexOf("=")<1){
    
    
      window.location.href =
      `https://${config.domain_name}/login?client_id=${config.client_id}&response_type=code&scope=profile+email+openid&redirect_uri=${config.REDIRECT_URL}/`;;
      return
    }

   

   const token =  await eventHandler(window.location.href)

   if(token == false){
   setUnAuthorized(true)
   }
    setLoader(false)

  })()


 
    
},[])



  return (
    <>
   {loader ?       <Box  display="flex" justifyContent="center">

<CircularProgress size={40} color="primary"/>
</Box>     :    <>
  
{
  authorized ?  <ForgotPassword/>   :
<BrowserRouter>
    <div className={classes.container}>
      <Sidebar />
     
      <div className={classes.content}>
        <Header />
        <div className={classes.root}>
        
          <Wrapper />
          
          {/* <Login /> */}
          {/* <ForgotPassword />  */}
        </div>
        <Footer />
      </div>
    </div>
  </BrowserRouter>
}


 

  </>


  }</>)
}

function App(props) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent {...props} />
        {/* <Button >Change default props</Button>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        variant="standard"
        value={10}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select> */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;