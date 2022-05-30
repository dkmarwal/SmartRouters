import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    root: {
      borderRadius: '4px',
      height: '24px',
      fontSize: '14px',
      lineHeight: '22px',
    },
    new: {
      //background: theme.palette.chips.background.new,
      background: theme.palette.common.white,
      color: theme.palette.chips.background.new,
      borderColor: theme.palette.chips.background.new,
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    modify: {
      background: theme.palette.common.white,
      color: theme.palette.chips.background.modify,
      borderColor: theme.palette.chips.background.modify,
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    delete: {
      background: theme.palette.common.white,
      color: theme.palette.chips.background.delete,
      borderColor: theme.palette.chips.background.delete,
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    overdue: {
      background: theme.palette.common.white,
      color: theme.palette.chips.background.overdue,
      borderColor: theme.palette.chips.background.overdue,
      borderStyle: 'solid',
      borderWidth: '2px',
    }
  })
)

export default styles;