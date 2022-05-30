import React from 'react';
import Box from '@mui/material/Box';
import styles from './styles';

const defaultProps = {
  bgcolor: 'background.paper',
  mr: 2,
  boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.15)',
  style: { 
    minWidth: '13rem', 
    width: '100%', 
    height: '6rem', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    padding: '13px',
    borderRadius: '10px',
  },
};

export default function DashboardCard({ requestType, label, count, onClick }) {
  const classes = styles();

  const returnClassObject = (requestType) => {
    switch (requestType) {
      case "Overall Overdue":
        return classes.color_overdue;
      case "Implementation Overdue":
        return classes.color_overdue;
      case "In Progress":
        return classes.color_inProgress;
      case "Pending":
        return classes.color_pending;
      case "Operation":
        return classes.color_operations;
      case "Notification":
        return classes.color_notifications;
      case "On Hold":
        return classes.color_hold;
      case "Operations":
        return classes.color_operations;
      case "All Active Requests":
        return classes.color_all_active_request;
      default:
        return {};
    }
  }

  // const returnBoxClassObject = (requestType) => {
  //   switch (requestType) {
  //     case "Overdue":
  //       return classes.borderTop_overdue;
  //     case "In-Progress":
  //       return classes.borderTop_inProgress;
  //     case "Pending":
  //       return classes.borderTop_pending;
  //     case "Operation":
  //       return classes.borderTop_operations;
  //     case "Notification":
  //       return classes.borderTop_notifications;
  //     default:
  //       return {};
  //   }
  // }

  return (
    <a onClick={onClick} className={classes.cardClick}>
    <Box display="flex" justifyContent="center" className={classes.root}>
      <Box {...defaultProps} >
        <div className={classes.subTxt}>{label}</div>
        <h2 className={[classes.heading, returnClassObject(requestType)].join(' ')}>{count}</h2>
      </Box>
    </Box>
    </a>
  );
}
