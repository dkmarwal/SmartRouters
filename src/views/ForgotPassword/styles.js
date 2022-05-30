import { makeStyles, createStyles } from '@mui/styles';

const styles = makeStyles((theme) =>
  createStyles({
    header: {
      backgroundColor: theme.palette.primary.main,
      height: '90px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
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
    text: {
      color: 'black',
      fontSize: '10px',
      textTransform: 'none'
    },
    unauthtext: {
      color: 'black',
      fontSize: '20px',
      textTransform: 'none'
    },
    contacttext: {
      // color: 'black',
      fontSize: '12px',
      textTransform: 'none'
    },
    secondtext: {
      color: 	"#1E90FF",
     
    },
    alert: {
      color: '#ff8c00',
      fontSize: 'xxx-large',
      // textAlign: 'center'
      // textTransform: 'lowercase'
    },
    forgotBackground: {
      // backgroundColor: theme.palette.common.lightGrey,
      padding: theme.spacing(2),
      maxWidth: '600px',
      minWidth: '600px',
      borderRadius: '10px',
      textAlign: 'center',
    },
    signIn: {
      color: theme.palette.common.lightBlue,
      fontSize: '16px',
      fontWeight: '500px',
      textAlign: 'right',
      cursor: 'pointer',
      lineHeight: '70px'
    },
    SignIn: {
      width: '100%',
      fontWeight: '600',
      fontSize: '16px',
      // borderRadius: '10px',
      marginTop: theme.spacing(3),
      textTransform: 'capitalize'
    }
  }),
);

export default styles;