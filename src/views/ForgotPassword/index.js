import React from 'react';
import styles from "./styles";
import Button from '@mui/material/Button';
import TextFieldInput from './../../components/TextField';
import logo from '../../assets/images/logo-login.png';
import WarningIcon from '@mui/icons-material/Warning';
import Box from "@mui/material/Box";
import config from '../../config';

export default function ForgotPassword() {
    const classes = styles();
    const name = localStorage.getItem("email") || ""
    const expireCookie = ()=>{
        document.cookie = "accessToken=123; expires= Thu, 21 Aug 2014 20:00:00 UTC; path=/ "
        return true
      }
    return (
        <>
            <div className={classes.header}>
                <img src={logo} alt="logo" className={classes.logo} />
            </div>
            <div className={classes.LoginWrap}>
                <h2 className={classes.heading}>SMART ROUTER</h2>
                <p className={classes.text}> <b>Email ID</b> : {name}</p>
                <div className={classes.forgotBackground}>
                    {/* <TextFieldInput label="Email" placeholder="Ex: you@company.com" />
                    <Button variant="contained" color="primary" className={classes.SignIn}>
                        Sign In
                    </Button> */}
                     {/* <Box component="span" sx={{ pt: 20, textAlign: 'center' }}> */}
                <WarningIcon className={classes.alert}/>
                <p className={classes.unauthtext}>Unauthorized</p> 
      <p className={classes.contacttext}> Please contact your Administrator for assistance</p>
                <p className={classes.contacttext}> Please  <span style={{cursor :'pointer'}} onClick={()=>{
                        expireCookie()

                    window.location.href =
                    `https://${config.domain_name}/login?client_id=${config.client_id}&response_type=code&scope=profile+email+openid&redirect_uri=${config.REDIRECT_URL}/`;
                }} className={classes.secondtext}>click here</span> To go back to login page.</p>
                {/* <img src={Warning} alt="warning" /> */}
            {/* </Box> */}
                </div>

                {/* <div className={classes.signIn}>Sign In</div> */}
            </div>
        </>
    )
}