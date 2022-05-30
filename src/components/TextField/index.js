import React from 'react';
import TextField from '@mui/material/TextField';

export default function TextFieldInput(props) {
  const {classes} = props;
  
  return (
    <TextField
      {...props}
      fullWidth
      InputLabelProps={{
        shrink: true,
        classes: {classes},
      }}
    />
  )
}