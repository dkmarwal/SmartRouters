import { withStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';

const CustomSwitches = withStyles((theme) => ({
    root: {
      width: "46px",
      height: "20px",
      padding: "0px"
    },
    switchBase: {
      color: "#818181",
      padding: "2px",
      "&$checked": {
        "& + $track": {
          backgroundColor: "#23bf58"
        }
      }
    },
    thumb: {
      color: "white",
      width: "16px",
      height: "16px",
      margin: "0px"
    },
    track: {
      borderRadius: "20px",
      backgroundColor: "#818181",
      opacity: "1 !important",
      "&:after, &:before": {
        color: "white",
        fontSize: "9px",
        position: "absolute",
        //top: "6px"
      },
      "&:after": {
        content: "'On'",
        left: "6px"
      },
      "&:before": {
        content: "'Off'",
        right: "6px"
      }
    },
    checked: {
      color: "#23bf58 !important",
      transform: "translateX(26px) !important"
    }
  }))(Switch);

export default CustomSwitches;