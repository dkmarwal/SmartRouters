import React from 'react';
import styles from './styles';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';

export default function Pagination({ pageNumber, pageSize, totalCount, totalPages, handlePaginationBackward, handlePaginationForward }) {
    const classes = styles();
    const index = (pageNumber - 1) || 0;
    const lowerLimit = (pageSize * index) + 1;
    let upperLimit = (pageSize * pageNumber);
    upperLimit = upperLimit > totalCount ? totalCount : upperLimit;
    return (
        <div className={classes.root}>
            <ChevronLeftOutlinedIcon
                className={[classes.leftArrowActive, pageNumber === 1 ? classes.disabled : ""].join(" ")}
                onClick={handlePaginationBackward} />
            {`Showing: ${lowerLimit}-${upperLimit} of ${totalCount}`}
            <ChevronRightOutlinedIcon
                className={[classes.rightArrowActive, pageNumber === totalPages ? classes.disabled : ""].join(" ")}
                onClick={handlePaginationForward}
            />
        </div>
    )
};