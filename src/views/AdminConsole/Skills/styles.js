// import { alpha } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';

const styles = makeStyles((theme) =>
  createStyles({
    root: {
    },
    popper: {
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
      padding: '0px'
    },
    tabPanel: {
      paddingTop: '20px',
    },
    popOver: {
      borderRadius: '4px'
    },
    popHeadBorder: {
      "& div:nth-child(1)": {
        borderTop: '0px',
      }
    },
    // popBox: {
    //   padding: '0px 16px',
    //   borderTop: '1px solid #979797',
    // },
    // popHeading: {
    //   color: theme.palette.common.black,
    //   fontSize: '16px',
    //   lineHeight: '30px',
    //   opacity: '0.6',
    // }
    requestChipPadding: {
      paddingBottom: '5px',
    },
    primaryColor: {
      color: theme.palette.primary.main,
    },
    moreCount: {
      color: theme.palette.common.darkBlue,
    },
    memberHeading: {
      color: theme.palette.primary.main,
      fontWeight: '700'
    },
    proServices: {
      marginBottom: theme.spacing(1),
    },
    topButton: {
      position: 'absolute',
      top: '100px',
      right: '32px',
      display: 'flex'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.common.white,
      border: '1px solid #979797',
      minWidth: '300px',
      padding: '0px 8px 8px 24px',
      marginLeft: 0,
      marginRight: 15,
      width: '100%',
      height: '38px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
      color: theme.palette.primary.main,
      '& div.MuiInputBase-root': {
        border: 'none',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      left:'0px',
      color: theme.palette.primary.main,
      '& div.MuiInputBase-root': {
        border: 'none',
      },
      '& div.MuiInputBase-input': {
        padding: '10px 0 7px',
      }
    },
    inputInput: {
      //padding: '10px 8px 8px 24px',
      margin: '5px 0px 0px 15px',
      paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
      transition: theme.transitions.create('width'),
      color: '#000',
      fontSize: '14px',
      fontWeight: '400',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '174px',
        '&:focus': {
          width: '174px',
        },
      },
    },
    inputRoot: {
      color: theme.palette.primary.main,
    },
    exactLink: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0px 50px',
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
    exactText: {
      fontSize: '16px',
      paddingLeft: '5px',
    },
  }),
);


export default styles;