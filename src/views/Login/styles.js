import { makeStyles, createStyles } from '@mui/styles';

const styles = makeStyles((theme) =>
  createStyles({
    header: {
      backgroundColor: theme.palette.primary.main,
      height: '90px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: '125px',
      height: '30px',
    },
    LoginWrap: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '100px'
    },
    heading: {
      color: theme.palette.primary.main,
      fontSize: '30px',
      textTransform: 'uppercase'
    },
    loginBackground: {
      backgroundColor: theme.palette.common.lightGrey,
      padding: theme.spacing(10),
      maxWidth: '600px',
      minWidth: '600px',
      borderRadius: '10px',
    },
    forgotPassword: {
      color: theme.palette.common.lightBlue,
      fontSize: '16px',
      fontWeight: '500px',
      textAlign: 'right',
      cursor: 'pointer',
      lineHeight: '30px'
    },
    SignIn: {
      width: '100%',
      fontWeight: '600',
      fontSize: '16px',
      // borderRadius: '10px',
      marginTop: theme.spacing(3),
      textTransform: 'capitalize'
    },
    loginInput: {
      marginBottom: '30px',
    },
    alert: {
      color: theme.palette.error.main,
      fontSize: '36px',
    },
    unauthtext: {
      fontWeight: 'bold'
    },
    contacttext: {
      color: theme.palette.error.main,
    }
  }),
);

export default styles;