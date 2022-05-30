import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
  table: {
    minWidth: 700,
    "& tr.collapsDashboard": {
      "& tr": {
        display: 'flex',
        margin: '16px 84px',
        flexWrap: 'wrap',
        "& p": {
          display: 'flex',
          alignItems: 'center',
          margin: '0px'
        },
        "& p:nth-of-type(1)":{
          width: '30%',
          flexGrow: '1',
        },
        "& p:nth-of-type(2)":{
          width: '70%',
          flexGrow: '1',
        },
        "& p:nth-of-type(3)":{
          width: '100%',
          flexGrow: '1',
        },
      }
    }
  },
  skillsCollpase: {
    margin: '41px',
    fontSize: 'small',
    padding: '4px',
    marginLeft: '1px',
},
divCollapse: {
    width: 'fit-content !important',
},
  root: {
    borderRadius: '10px',
    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.1)'
  },
  collaps: {
    backgroundColor: '#F7F8FD',
    width: '100%'
  },
  collapsContent: {
    display: 'flex',
    flexWrap: 'wrap',
    //padding: '0px 50px',
    height: '150px',
    overflowX: 'auto',
    "& td": {
      border: 'none',
    },
  },
  collapsContentHeading: {
    fontWeight: 'bold',
  },
  collapsContentValue: {
    paddingLeft: theme.spacing(1),
    "& div:nth-of-type(1)": {
      width: '100%'
    },
  },
  noRecords: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}))

export default styles;