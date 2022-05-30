import React from 'react';
import Chip from '@mui/material/Chip';
import styles from "./styles";

export default function MultiSelectChip(props) {
  const classes = styles();
  const {key, label, onDelete} = props;
  return (
    <div>
      <Chip {...props} className={classes.prodcutTypeChip}/>
    </div>
  );
}