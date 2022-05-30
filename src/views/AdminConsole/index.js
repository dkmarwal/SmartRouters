import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from "./styles";
import routes from "../../routes";
import { useHistory,useLocation } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const getSelectedTabValue = () => {
  const path = window.location.pathname;
  let index = 0;
  routes && routes.forEach(route => {
    route && route.tabs && route.tabs.map(subRoute => {
         
      if (subRoute["path"] === path) {
        index = subRoute["index"];
        
      }
    })
  });
  return index;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminConsole(props) {
  const classes = styles();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const location = useLocation()
  const Permissions= localStorage.getItem("Permissions");
  const PagesPermission =JSON.parse(Permissions)?.map((value)=>{
    return value.PageName
})
// let currentCursorState = location?.state?.currentPathAdmin || false
let pathnames = location.pathname


  useEffect(() => {
    setValue(getSelectedTabValue());
  }, [])
  useEffect(()=>{

   switch (pathnames) {
     case "/admin/skills": case "/admin/addSkills":case "/admin/editSkill/:skillId":
       return setValue(0)
      //  break;
       case "/admin/teammembers": case "/admin/addteammember": case "/admin/EditTeammember/:skillId":
       return setValue(1)
        // break;
        case "/admin/productsla":case "/admin/addsla": case "/admin/editsla/:skillId": case "/admin/copysla/:skillId":
       return setValue(2)
          // break;
   
     default:
      
       break;
   }

  },[pathnames])

  const handleChange = (event, newValue) => {
    setValue(newValue);
    routes &&
      routes.forEach((route) => {
        route.tabs &&
          route.tabs.forEach((_subRoute) => {
            if (_subRoute.index === newValue) {
              history.push(_subRoute.path);
            }
          });
      });
  };
  // const [addSkill, setAddSkill] = useState(false);
  const adminTabs =
    routes && routes.filter((route) => route["key"] === "admin")[0];
  return (
    <div className={classes.root}>
      <Box className={classes.tabControl}>
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.tabs}
            classes={{ indicator: classes.indicator }}
          >
            {adminTabs &&
              adminTabs.tabs &&
              adminTabs.tabs.map((tab, i) => (
                PagesPermission?.includes(tab.label)&&
                <Tab label={tab.label} path={tab.path} {...a11yProps(i)} aria-controls={`simple-tab-${i}`}/>
              ))}
          </Tabs>
        </div>
      </Box>
    </div>
  );
}
