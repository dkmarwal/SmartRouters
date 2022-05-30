import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
  dialogTitle: {
    padding: '0px 20px 0px 20px !important',
    fontSize: '26px !important',
    fontWeight: '500 !important',
    textAlign: 'center'
  },
  message: {
    textAlign: 'center'
  },
  dialogActions: {
    padding: '25px 20px !important',
  },
  cancelBtn: {
    backgroundColor: 'trasparent',
    fontSize: '16px !important',
    marginRight: '16px !important',
  },
  saveBtn: {
    //backgroundColor: '#0C2174 !important',
    fontSize: '16px !important',
    marginRight: '16px !important',
  },
  confirmBtn: {
    backgroundColor: theme.palette.primary.main,
    fontSize: '16px !important',
  },
  dialogPaper: {  
    minWidth: '500px',
},
}))

export default styles;