import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    root: {
      borderRadius: '14px',
      height: '24px',
      fontSize: '14px',
      lineHeight: '22px',
    },
    today: {
      //background: theme.palette.slaChips.background.today,
      background: theme.palette.common.white,
      color: theme.palette.slaChips.background.today,
      borderColor: theme.palette.slaChips.background.today,
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    tomorrow: {
      //background: theme.palette.slaChips.background.tomorrow,
      background: theme.palette.common.white,
      color: theme.palette.common.tomorrow,
      borderColor: theme.palette.slaChips.background.tomorrow,
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    overdue: {
      //background: theme.palette.slaChips.background.overdue,
      background: theme.palette.common.white,
      color: theme.palette.slaChips.background.overdue,
      borderColor: theme.palette.slaChips.background.overdue,
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    duein: {
      //background: theme.palette.slaChips.background.duein,
      background: theme.palette.common.white,
      color: theme.palette.slaChips.background.duein,
      borderColor: theme.palette.slaChips.background.duein,
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    operationAfter: {
      //background: theme.palette.slaChips.background.operationAfter,
      background: theme.palette.common.white,
      color: theme.palette.slaChips.background.operationAfter,
      borderColor: theme.palette.slaChips.background.operationAfter,
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    operationBefore: {
      background: theme.palette.common.white,
      color: theme.palette.slaChips.background.operationBefore,
      borderColor: theme.palette.slaChips.background.operationBefore,
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    first: {
      background: theme.palette.common.white,
      color: theme.palette.slaChips.background.first,
      borderColor: theme.palette.slaChips.background.first,
      borderStyle: 'solid',
      borderWidth: '2px',
      // background: theme.palette.slaChips.background.first,
      // color: theme.palette.common.white
    },
    second: {
      background: theme.palette.common.white,
      color: theme.palette.slaChips.background.second,
      borderColor: theme.palette.slaChips.background.second,
      borderStyle: 'solid',
      borderWidth: '2px',
      // background: theme.palette.slaChips.background.second,
      // color: theme.palette.common.white
    },
    third: {
      background: theme.palette.common.white,
      color: theme.palette.slaChips.background.third,
      borderColor: theme.palette.slaChips.background.third,
      borderStyle: 'solid',
      borderWidth: '2px',
      // background: theme.palette.slaChips.background.third,
      // color: theme.palette.common.white
    }
  })
)

export default styles;