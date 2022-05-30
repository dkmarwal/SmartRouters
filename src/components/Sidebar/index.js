import { React,useState,useEffect} from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import logo from "../../assets/images/logo.png";
import routes from "../../routes/index";
import { useHistory,useLocation } from "react-router-dom";
import "./styles.css";

export default function Sidebar() {
  const history = useHistory();
  const [flag, setflag]=useState(null);
  const location = useLocation()
  let pathnames = location.pathname;
  useEffect(()=>{

    switch (pathnames) {
      case "/admin/skills": 
      case "/admin/addSkills":case "/admin/editSkill/:skillId":
        return setflag(1)
       //  break;
        case "/admin/teammembers": case "/admin/addteammember": case "/admin/EditTeammember/:skillId":
        return setflag(1)
         // break;
         case "/admin/productsla":case "/admin/addsla": case "/admin/editsla/:skillId": case "/admin/copysla/:skillId":
        return setflag(1)
        case "/":case "/dashboard":
        return setflag(0)
           // break;
    
      default:
       
        break;
    }
 
   },[pathnames])
    // const[tabSeleted, setTabSelected] = useState(false)
  // const checkTabSelected = () => {
  //   if(history.location.pathname === "/dashboard") {
  //     setTabSelected(true);
  //   }else {
  //     setTabSelected(false)
  //   }
  // }
  // console.log('deepakhistory', history.location.pathname);
  const drawerContent = (
    <div className="drawer">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <List style={{overflowY: "auto"}} tabindex="0">
        {routes &&
          routes.map((route, index) => (
            index==flag ?
            <ListItem
              key={index}
              style={ {borderRight:'3px solid blue'}}
              className="listItem"
              onClick={() => {
               
                setflag(index);
                history.push({ pathname: route.href });
              }}
              //selected={checkTabSelected}
            >              
              <ListItemIcon   className="listItemsecond">
                <span  className="listItemIcon">{route.icon.active}</span>
              </ListItemIcon>
              <ListItemText className="listItemsecond">
                <span className="listItemTxtcolor">{route.label}</span>   
                 {/* <div className="rightboader">{"jjjjj"}</div>    */}
              </ListItemText>

             
            </ListItem>
            :
            <ListItem
            key={index}
            className="listItem"
            onClick={() => {
              setflag(index);
              history.push({ pathname: route.href });
            }}
            //selected={checkTabSelected}
          >              
            <ListItemIcon   className="listItemsecond">
              <span  className="listItemIcon">{route.icon.inactive}</span>
            </ListItemIcon>
            <ListItemText className="listItemsecond">
              <span className="listItemTxt">{route.label}</span>   
               {/* <div className="rightboader">{"jjjjj"}</div>    */}
            </ListItemText>
            

           
          </ListItem>
           
          ))}
      </List>
    </div>
  );

  return (
    <div>
      <nav className="drawer">
        <Drawer variant="permanent" anchor="left" open className="drawerPaper">
          {drawerContent}
        </Drawer>
      </nav>
    </div>
  );
}
