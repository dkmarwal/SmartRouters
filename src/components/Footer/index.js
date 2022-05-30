import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer() {
    return (
        <Typography variant="body2" color="textPrimary" align="center">
        {'Copyright © '}
        <Link color="inherit" underline="none" href="https://www.usbank.com/index.html">
          US Bank
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
}