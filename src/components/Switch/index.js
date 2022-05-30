import React from 'react';
import CustomSwitches from "./styles";

export default function Switches({checked, onChange, color, name, inputProps}) {
  //const classes = AntSwitch();
  return (
    <div>
      <CustomSwitches
        checked={checked}
        onChange={onChange}
        color={color}
        name={name}
        inputProps={inputProps}
        //className={classes.toggle}
      />
    </div>
  );
}
