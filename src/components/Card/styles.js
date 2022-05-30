import { makeStyles, createStyles } from '@mui/styles';

const styles = makeStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.common.black,
    },
    root: {
      width: '100%',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        width: 'auto',
        marginBottom: theme.spacing(2),
      },
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    heading: {
      marginTop: '0px',
      marginBottom: '0px',
      fontSize: '30px',
      fontWeight: 'bold'
    },
    subTxt: {
      marginBottom: '0px',
      fontSize: '16px',
      //color: theme.palette.common.black,
      fontWeight: 'bold',
      width: '60%',
      lineHeight: '16px',
    },
    typography: {
      h4: {
        marginTop: '0px'
      }
    },
    color_overdue: {
      color: theme.palette.tiles.overdue
    },
    color_inProgress: {
      color: theme.palette.tiles.inProgress
    },
    color_pending: {
      color: theme.palette.tiles.pending
    },
    color_hold: {
      color: theme.palette.tiles.hold
    },
    color_operations: {
      color: theme.palette.tiles.operations
    },
    color_notifications: {
      color: theme.palette.tiles.notifications
    },
    color_all_active_request: {
      color: theme.palette.primary.main
    },
    borderTop_overdue : {
      borderTop: `5px solid ${theme.palette.tiles.overdue}`,
      borderRadius: '10px'
    },
    borderTop_inProgress : {
      borderTop: `5px solid ${theme.palette.tiles.inProgress}`,
      borderRadius: '10px'
    },
    borderTop_pending : {
      borderTop: `5px solid ${theme.palette.tiles.pending}`,
      borderRadius: '10px'
    },
    borderTop_operations : {
      borderTop: `5px solid ${theme.palette.tiles.operations}`,
      borderRadius: '10px'
    },
    borderTop_notifications : {
      borderTop: `5px solid ${theme.palette.tiles.notifications}`,
      borderRadius: '10px'
    },
    cardClick: {
      cursor: 'pointer',
    }
  }),
);

export default styles;