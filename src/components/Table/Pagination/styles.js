import { makeStyles, createStyles } from '@mui/styles';

const styles = makeStyles((theme) =>
  createStyles({
      root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
      },
    leftArrow: {
        border: `2px solid ${theme.palette.common.grey}`,
        borderRadius: '50%',
        color: theme.palette.common.grey,
        margin: theme.spacing(2),
        cursor: 'pointer',
        "&: active": {
            color: theme.palette.common.white,
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor:  theme.palette.primary.main
        }
    },
    leftArrowActive: {
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: '50%',
        color: theme.palette.common.white,
        backgroundColor:  theme.palette.primary.main,
        margin: theme.spacing(2),
        cursor: 'pointer',
    },
    rightArrow: {
        border: `2px solid ${theme.palette.common.grey}`,
        borderRadius: '50%',
        color: theme.palette.common.grey,
        margin: theme.spacing(2),
        cursor: 'pointer',
        "&: active": {
            color: theme.palette.common.white,
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor:  theme.palette.primary.main
        }
    },
    rightArrowActive: {
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: '50%',
        color: theme.palette.common.white,
        margin: theme.spacing(2),
        backgroundColor:  theme.palette.primary.main,
        cursor: 'pointer',
    },
    disabled: {
        opacity: 0.5,
        pointerEvents: "none",
        cursor: "not-allowed"
    }
  }),
);

export default styles;