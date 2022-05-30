import React from 'react';
import Chip from '@mui/material/Chip';
import styles from "./styles";

export default function RequestChip({ name, classname }) {
  const classes = styles();
  const getChipClass = (name) => {
    switch (name) {
      case "New":
        return classes.new;
      case "Modify":
        return classes.modify;
      case "Delete":
        return classes.delete;
      default:
        return classes.overdue
    }
  }

  return (
    <div className={classname}>
      <Chip label={name} className={[classes.root, getChipClass(name)].join(' ')} />
    </div>
  );
}