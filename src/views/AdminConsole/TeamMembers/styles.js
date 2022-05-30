import { makeStyles, createStyles } from '@mui/styles';

const styles = makeStyles((theme) =>
  createStyles({
      tabPanel: {
        paddingTop: '20px',
        // "& .MuiBox-root": {
        //     paddingTop: '20px',
        // },
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
          width: '100%',
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
          width: '100%',
          '&:focus': {
            width: '100%',
          },
        },
      },
      skillChip: {
        background: 'rgba(12, 33, 116, 0.2)',
        color: theme.palette.primary.main,
        padding: theme.spacing(1),
        borderRadius: '4px',
      },
      name: {
        fontWeight: '700',
        color: theme.palette.common.black,
      },
      email: {
        color: theme.palette.common.black,
      },
      moreCount: {
        color: theme.palette.common.darkBlue,
      },
      selectOption: {
        width: '100%',
        border: '0px',
        "& div": {
          paddingTop: '10px !important',
          paddingBottom: '10px !important',
          border: 'none',
        },
      },
      exactLink: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 0px',
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