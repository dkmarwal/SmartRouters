import { makeStyles, createStyles } from '@mui/styles';

const styles = makeStyles((theme) =>
  createStyles({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
      },
      indicator: {
        background: "none"
      },
      tabControl: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px',
        //borderBottom: `1px solid ${theme.palette.common.grey}`,
      },
    tabs: {
        "& .MuiBox-root": {
            padding: '0px',
        },
        "& button": {
          padding: '0px 0px 5px 0px',
          fontWeight: '400',
          color: theme.palette.primary.main,
          fontSize: '18px',
          lineHeight: '28px',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
        "& button[aria-selected='true']": {
          position: "relative",
          color: theme.palette.primary.light,
          fontWeight: '700',
          "&:before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            // background: "#2176FF",
            borderBottom: '10px #2176FF solid',
            borderBottomRightRadius: '15px 15px 15px 15px',
            zIndex: 0,
            color: theme.palette.primary.light,
          },
    
          "& > *": { zIndex: 0 },
          "& > .MuiTab-wrapper": {
            background: "#fff",
            height: "100%"
          }
        }
      },
      tabPanel: {
        paddingTop: '20px',
      },
      prodName: {
        fontWeight: '700',
        color: theme.palette.common.black,
      },
      moreCount: {
        color: theme.palette.common.darkBlue,
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
        paddingLeft: '25px',
        paddingTop: '0px',
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