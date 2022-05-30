import React from 'react';
import Chip from '@mui/material/Chip';
import styles from "./styles";

export default function SlaChip({ name }) {
  const classes = styles();
  const getChipClass = (name) => {
    switch (name) {
      
      case "Due Today":
        return classes.today;
      case "Due Tomorrow":
        return classes.tomorrow;
      case "Overdue by":
        return classes.overdue;
        // case "Due in":
        //   return classes.duein;
      case "duein01days":
        return classes.duein;
      case "inoperationbeforebreach":
        return classes.operationBefore;
      case "inoperationafterbreach":
        return classes.operationAfter;
      // case "After Breach":
      //   return classes.operationAfter;
      //   case "Before Breach":
      //     return classes.operationBefore;
      default:
        return classes.nocolor
    }
  }
  const getChipClassforteam=(name)=>{
    switch (true) {
      case Number(name)<=20:
        return classes.first;
        break;
        case Number(name)<=27:
          return classes.second;
        break;
    
      default:
        console.log("gg",Number(name))
        return classes.third;
        break;
    }

  }
let name1 = name==="inoperationbeforebreach" ?"In Operations":name
 name1 = name==="inoperationafterbreach" ?"In Operations":name1
name1 = name==="duein01days" ?"Due in":name1
name1=!isNaN(Number(name))?`${Number(name)} hrs`:name1
  return (
    <div>
      <Chip label={name1} className={[classes.root, !isNaN(Number(name))? getChipClassforteam(name): getChipClass(name)].join(' ')} />
      {/* <Chip label={name1} className={[classes.root,  getChipClass(name)].join(' ')} /> */}
    </div>
  );
}