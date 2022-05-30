import React from 'react';
import Drawer from '@mui/material/Drawer';

export default function SideDrawer(props) {
  const { classes, anchor, open, content, onClose } = props;
    return (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={open}
            onClose={onClose}
            className={classes}
          >
            {content}
          </Drawer>
        </React.Fragment>
    )
}