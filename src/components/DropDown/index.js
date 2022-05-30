import React from 'react';
import styles from './styles';
import { FormControl, MenuItem, Select } from '@mui/material';

export default function DropDown() {
  const classes = styles();
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
      <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChange}
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem  value={10}>Ten</MenuItem>
          <MenuItem  value={20}>Twenty</MenuItem>
          <MenuItem  value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
