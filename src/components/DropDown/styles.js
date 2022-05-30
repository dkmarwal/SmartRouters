import { makeStyles } from '@mui/styles';
import { green } from '@mui/material/colors';

const styles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    "& .MuiSelect-select:focus": {
        backgroundColor: green,
    },
  },
}))

export default styles;