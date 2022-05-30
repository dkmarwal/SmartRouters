import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
  dialogTitle: {
    padding: '25px 20px !important',
    fontSize: '18px !important',
    fontWeight: '700 !important',
  },
  dialogActions: {
    padding: '25px 20px !important',
  },
  cancelBtn: {
    fontSize: '14px',
  },
  confirmBtn: {
    backgroundColor: theme.palette.primary.main,
    fontSize: '14px',
  },
  dialogPaper: {  
    minWidth: '600px',
},
}))

export default styles;