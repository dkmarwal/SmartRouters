import { makeStyles, createStyles } from '@mui/styles';

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
      borderTop: `1px solid ${theme.palette.common.grey}`,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300
    },
    btnSave: {
      fontSize: '16px'
    },
    btnCancel: {
      fontSize: '16px'
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
    chipSelectHeading: {
      fontSize: '16px',
      fontWeight: '400',
      color: theme.palette.common.black,
      //paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(1),
      backgroundColor: theme.palette.common.white,
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
      }
    },
    productOptions: {
      width: '100%',
      marginTop: theme.spacing(1),
      "& div": {
        padding: theme.spacing(1.5),
      },     
      "&:before": {
        borderBottom: 'none'
      },
      "&:hover": {
        "&:before": {
          borderBottom: 'none'
        }
      }
    },
    timeSelectHeading: {
      fontSize: '13px',
    },
    noMarginTop: {
      marginTop: theme.spacing(0),
    },
    // textField:{
    //   boader:
    // }
    marginTop: {
      marginTop: theme.spacing(2),
    },
    marginBottom: {
      marginBottom: theme.spacing(2),
    },
    noLabel: {
      marginTop: theme.spacing(3)
    },
    checkboxLabel: {
      fontSize: '16px',
      fontWeight: '400',
      color: theme.palette.common.black,
    },
    selectLimit: {
      fontSize: '12px',
      fontWeight: '400',
      color: theme.palette.common.black,
    },
    star: {
      color: theme.palette.common.red,
    },
    titleContain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px'
    },
    copyForm: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '18px',
      cursor: 'pointer'
    },
    copyFormName: {
      "& div.MuiOutlinedInput-root": {
        padding: '5px',
      },
      "& div.MuiAutocomplete-endAdornment": {
        paddingTop: '5px',
      },
      "& .MuiButtonBase-root": {
        fontSize: '20px',
        marginLeft: '5px',
        width: '23px',
        height: '23px',
      }
    }
  }),
);


export default styles;