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
        //borderBottom: `1px solid ${theme.palette.common.grey}`,
      },
    tabs: {
          // marginBottom: '10px',
          textTransform: 'inherit',
          "&$selected": {
            backgroundColor: '#004C9B',
            color: 'white',
          },
          "& .MuiBox-root": {
            padding: '0px',
          },
          "& button": {
            padding: '0px 0px 5px 0px',
            fontWeight: '400',
            color: theme.palette.primary.main,
            fontSize: '24px',
            lineHeight: '28px',
            minWidth: 'auto',
            marginRight: theme.spacing(2),
            // borderBottom: '5px #2176FF solid',
            // borderRadius: '10px',
            textDecoration: 'none',
            textTransform: 'capitalize'
          },
          "& button[aria-selected='true']": {
            position: "relative",
            color: theme.palette.primary.light,
            fontWeight: '700',
            //display: 'inline-block',
            zIndex: '0',
            "&:before": {
              content:'""',
              position:'absolute',
              bottom:0,
              left:0,
              right:0,
              background:theme.palette.primary.light,
              height:'5px',
              borderRadius: '15px 15px 15px 15px',
              width: '60px',
            },
            "& > *": { zIndex: 0 },
            "& > .MuiTab-wrapper": {
              background: "#fff",
              height: "100%"
            }
          }
      },
      tabPanel: {
        "& .MuiBox-root": {
            padding: '0px',
        },
      }
  }),
);


export default styles;