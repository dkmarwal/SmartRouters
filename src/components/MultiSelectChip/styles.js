import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    root: {
      borderRadius: '4px',
      height: '24px',
      fontSize: '14px',
      lineHeight: '22px',
    },
    prodcutTypeChip: {
      margin: '5px 0px 0px 0px',
      "& MuiChip": {
        root: {
          background: "rgba(12, 33, 116, 0.2)",
        },
      },
      "& div": {
          background: "rgba(12, 33, 116, 0.2)",
          margin: '5px 5px 0px 0px',
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
  })
)

export default styles;