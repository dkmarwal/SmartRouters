import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  appRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    marginRight: 15,
    width: '100%',
    height: '35px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    color: theme.palette.primary.main,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  },
  inputRoot: {
    color: theme.palette.primary.main,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    color: '#8F8F8F',
    fontSize: '14px',
    fontWeight: '400',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '274px',
      '&:focus': {
        width: '274px',
      },
    },
  },
  user: {
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center'
  },
  userTitle: {
    fontSize: '14px',
    fontWeight: '400',
    paddingLeft: '10px',
    display:'flex',
    cursor: 'pointer'
  },
  userIcon: {
    fontSize: '24px',
  }
}))

export default styles;