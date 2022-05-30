import React, { useEffect, useState } from "react";
import styles from "./styles";
import Button from "@mui/material/Button";
import TextFieldInput from "./../../components/TextField";
import logo from "../../assets/images/logo-login.png";
import { Auth } from "aws-amplify";
import { createBrowserHistory } from "history";
import WarningIcon from '@mui/icons-material/Warning';

export default function Login(props) {
  const history = createBrowserHistory({ forceRefresh: true });
  //const [authError, setAuthError] = useState(false);
  const { setflaglogin, setisLoggedpage, setloading } = props;
  //const LoggedIN = localStorage.getItem("loggedin-user");

  const classes = styles();
  // const [loaflaglogin, setflaglogin] = React.useState(false);
  const [textFielduserNameValue, settextFielduserNameValue] = useState("");
  const [textFieldPasswordValue, settextFieldPasswordValue] = useState("");
  const _handleTextFielduserNameChange = (e) => {
   
    settextFielduserNameValue(e.target.value);
  };
  const _handleTextFieldpasswordChange = (e) => {
    
    settextFieldPasswordValue(e.target.value);
  };

  // React.useEffect(() => {
  //     (async () => {
  //       let user = null;

  //       try {
  //         user = await Auth.currentAuthenticatedUser();
  //         console.log('userrr',user)
  //         // if (user) {
  //         //   setLoggedIn(true);
  //         // } else {
  //         //   setLoggedIn(false);
  //         // }
  //       } catch (e) {
  //           alert('error')
  //         // setLoggedIn(false);
  //       }
  //     })();
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setisLoggedpage(false)
    setloading(true);
    // setLoading(true);
    try {
      await Auth.signIn(
        textFielduserNameValue ? textFielduserNameValue.trim() : "",
        textFieldPasswordValue
      ).then((user) => {
        if (user.username != "") {
          localStorage.setItem("loggedin-user", true);
          localStorage.setItem("authentic-user", false);
          setflaglogin(true);
          setloading(false);
          history.push("/dashboard");
        }
      });
    } catch (error) {
      localStorage.setItem("authentic-user", true);
      setflaglogin(false);
      setloading(false);
      //history.push("/login");
      //   alert("Error!!", error.message, "danger");
    }
    // setLoading(false);
  };
  const authenticUser = localStorage.getItem("authentic-user");
//   useEffect(() => {
//     localStorage.setItem("authentic-user", false);
//   }, []);
  return (
    <>
      <div className={classes.header}>
        <img src={logo} alt="logo" className={classes.logo} />
      </div>
      <div className={classes.LoginWrap}>
      {authenticUser == 'true' && 
            <>
                <WarningIcon className={classes.alert}/>
                <p className={classes.unauthtext}>Unauthorized</p>
                <p className={classes.contacttext}> Please enter correct username and password or contact your <span className={classes.secondtext}>Administrator</span> for assistance</p>
            </>
          }
        <h2 className={classes.heading}>Smart Router Sign In</h2>
        <div className={classes.loginBackground}>
      
          <TextFieldInput
            label="Username"
            value={textFielduserNameValue}
            onChange={_handleTextFielduserNameChange}
            placeholder="Enter username here"
            className={classes.loginInput}
          />
          <TextFieldInput
            label="Password"
            value={textFieldPasswordValue}
            onChange={_handleTextFieldpasswordChange}
            placeholder="Enter password here"
            type="password"
          />
          {/* <div className={classes.forgotPassword}>Forgot Password</div> */}
          <Button
            variant="contained"
            color="primary"
            className={classes.SignIn}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          {/* <Button onClick={signOut}>Sign Out</Button> */}
        </div>
      </div>
    </>
  );
}
