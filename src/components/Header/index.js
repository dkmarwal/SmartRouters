import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import config from "../../config";
import styles from "./styles.js";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import user from '../../assets/images/user.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { Auth } from "aws-amplify";
import { createBrowserHistory } from "history";
export default function Header() {
  const history = createBrowserHistory({ forceRefresh: true });
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const LoggedINname= localStorage.getItem("Name");
  const Name=`Hello, ${LoggedINname}`
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const expireCookie = ()=>{
    document.cookie = "accessToken=123; expires= Thu, 21 Aug 2014 20:00:00 UTC; path=/ "
    return true
  }
  const   signOut=async()=> {
    try {
      await expireCookie()
      window.location.href =
      `https://${config.domain_name}/login?client_id=${config.client_id}&response_type=code&scope=profile+email+openid&redirect_uri=${config.REDIRECT_URL}/`;
        
    } catch (error) {
        console.log('error signing out: ', error);
    }
    finally{
      handleClose()
    }
}

  return (
    <aside>
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <div>
          <h1>Smart Router</h1>
          </div>
          <div className={classes.appRight}>
          <div className={classes.user}>
          <img src={user} alt="user" />
            <span 
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={classes.userTitle}
            >
               {Name} <ArrowDropDownIcon className={classes.userIcon}/>
            </span> 
            {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={classes.userTitle}
      >
        Dashboard <ArrowDropDownIcon className={classes.userIcon}/>
      </Button> */}
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </Menu>
          </div>
          </div>
        </Toolbar>
      </AppBar>
      </aside>
  );
}
