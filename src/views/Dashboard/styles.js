import { alpha } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';


const styles = makeStyles((theme) =>
  createStyles({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          //padding: theme.spacing(2),
        },
      },
      saveFilterDrop: {
        margin: '10px',
        minWidth: '200px',
          MuiSelect: {
            root: {
              border: '2px solid red',
            }
          },
        "& div.MuiSelect-select": {
          display: 'flex',
          justifyContent: 'space-between',
        },
      },
      saveFilterDropItem: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      saveFilterDropHeight: {
        maxHeight: 400
      },
      formControl: { 
        //padding: theme.spacing(2),
        fontSize: '16px',
        fontWeight: '400',
        flexShrink: '0',
      },
      btnControl: { 
        fontSize: '16px',
        fontWeight: '500',
        borderRadius: '8px',
        padding: '8px 15px',
        marginLeft: '15px',
        border: '1px solid #0C2174',
        '& MuiButton': {
          label: {
            border: '1px solid red',
          }
        }
      },
      clearBtn: {
        fontSize: '16px',
        fontWeight: '500',
        borderRadius: '8px',
        padding: '2px 10px',
        border: '1px solid #0C2174',
        textTransform: 'capitalize'
      },
      dashboardCard: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        //overflowX: 'scroll',
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
          display: 'flex',
          flexWrap: 'wrap',
        },
      },
      rightDrawer: {
        //backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      rightDrawerHeader: {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1);',
        padding: '0px 20px 0px 40px',

      },
      rightDrawerBody: {
        margin: '0px',
        padding: '20px 40px 30px 40px',
        maxHeight: '100vh',
        overflow: 'scroll',
      },
      rightDrawerFooter: {
        padding: '10px 20px 10px 40px',
        boxShadow: '4px 0px 10px rgb(0 0 0 / 10%)',
      },
      MuiDrawer: {
        paperAnchorRight: {
          width: '175px'
        }
      },
      formControlCheckBox: {
        marginTop: '20px !important'
      },
      btnApply: {
          //margin: '20px 10px 0px 0px',
          padding: '5px 20px',
          marginRight: '15px',
          borderRadius: '8px',
          fontSize: '16px',
          textTransform: 'capitalize',
      },
      filterChip: {
        marginBottom: theme.spacing(2),
      },
      prodcutTypeChip: {
        margin: '5px 0px 0px 10px',
        "& MuiChip": {
          root: {
            background: "rgba(12, 33, 116, 0.2)",
          },
        },
        "& div": {
            background: "rgba(12, 33, 116, 0.2)",
            margin: '5px 10px 0px 0px',
            borderRadius: '4px',
            color: theme.palette.common.black,
            fontSize: '14px',
            fontWeight: '400',
            "& svg": {
              color: theme.palette.common.grey,
              cursor: 'pointer',
              width: '12px',
              height: '12px',
            },
        },
      },
      applyFilter: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
      },
      applyFilterChip: {
        margin: '0px 0px 0px 10px',
        "& MuiChip": {
          root: {
            background: "rgba(12, 33, 116, 0.2)",
          },
        },
        "& div": {
            background: "rgba(12, 33, 116, 0.2)",
            margin: '0px 10px 0px 0px',
            borderRadius: '4px',
            color: theme.palette.common.black,
            fontSize: '14px',
            fontWeight: '400',
            "& svg": {
              color: theme.palette.common.grey,
              cursor: 'pointer',
              width: '14px',
              height: '14px',
              "&.MuiChip-deleteIcon": {
                color: theme.palette.primary.main,
              } 
            },
        },
      },
      search: {
        position: 'relative',
        borderRadius: '8px',
        backgroundColor: theme.palette.common.white,
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 1),
        },
        marginLeft: 0,
        width: '100%',
        height: '32px',
        [theme.breakpoints.up('sm')]: {
          //marginLeft: theme.spacing(1),
          width: '100%',
        },
        color: theme.palette.primary.main,
        border: '1px solid #979797',
        padding: '11px 13px 15px 40px',
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
      legendBold: {
        fontWeight: '700',
      },
      chipSelect: {
        paddingTop: theme.spacing(1),
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        },
        "&.MuiOutlinedInput-root": {
          padding: '5px 10px',
        },
      },
      chipSelectInput: {
        width: '100%',
        paddingTop: '2px',
        "&.MuiSvgIcon-root": {
          color: '#790000',
        },
        "& div": {
          paddingTop: '3px !important',
          paddingBottom: '3px !important',
        },
        "& .MuiAutocomplete-clearIndicator": {
          padding: '2px',
          marginRight: '5px'
        },
        "&.MuiOutlinedInput-root": {
          width: '100%',
        },
        "& div.MuiChip-root": {
          background: "rgba(12, 33, 116, 0.2)",
          margin: '5px 5px 5px 0px',
            borderRadius: '4px',
            color: theme.palette.common.black,
            fontSize: '14px',
            fontWeight: '400',
            "& svg": {
              color: theme.palette.primary.main,
              cursor: 'pointer',
              width: '14px',
              height: '14px',
            },
        },
      },
      autoComplete: {
        "& div.MuiOutlinedInput-root": {
          padding: '5px',
        },
        "& div.MuiAutocomplete-endAdornment": {
          paddingTop: '5px'
        },
        "& div.MuiChip-root": {
          border: '1px solid red',
        }
        // width: '100%',
        // paddingTop: '2px',
        // "&.MuiSvgIcon-root": {
        //   color: '#790000',
        // },
        // "& div": {
        //   paddingTop: '3px !important',
        //   paddingBottom: '3px !important',
        // },
        // "&.MuiOutlinedInput-root": {
        //   width: '100%',
        // },
        // "&.MuiChip-root": {
        //   background: "rgba(12, 33, 116, 0.2)",
        //   margin: '5px 5px 5px 0px',
        //     borderRadius: '4px',
        //     color: theme.palette.common.black,
        //     fontSize: '14px',
        //     fontWeight: '400',
        //     "& svg": {
        //       color: theme.palette.primary.main,
        //       cursor: 'pointer',
        //       width: '14px',
        //       height: '14px',
        //     },
        // },
      },
      saveFilterDialogHeading: {
        fontSize: '14px',
        fontWeight: '700',
      },
      selectLimit: {
        fontSize: '12px',
        fontWeight: '400',
        color: theme.palette.common.black,
      },
      star: {
        color: theme.palette.common.red,
      },
      sortBackgroud: {
        backgroundColor: theme.palette.common.white,
      },
      sortHeading: {
        fontSize: '15px',
      },
      hide: {
        //visibility: 'hidden',
      }
  }),
);

export default styles;