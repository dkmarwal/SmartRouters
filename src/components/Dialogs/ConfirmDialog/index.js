import * as React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningIcon from '@mui/icons-material/Warning';
import styles from "./styles";

 export default function ConfirmDialog(props) {
  const classes = styles();
  const {
    title,
    message,
    setOpen,
    confirmText,
    onConfirm,
    saveText,
    onSave,
    isLoading,
    //clickOutsideToClose,
    showCancelBtn = false,
    showOkBtn = true,
    showSaveBtn,
    //children,
    //name,
    saveIcon = false,
    successIcon = false,
    warningIcon = false,
    //...other
  } = props;
  const handleClose = () => {
    setOpen(false);
  };
  return (<>
   
    <Dialog
      open={true}
      onClose={handleClose}
      classes={{ paper : classes.dialogPaper}}
    >
       {isLoading && <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>}
      {
      saveIcon ? (
            <Box component="span" sx={{ pt: 2, textAlign: 'center' }}>
              <InfoOutlinedIcon fontSize="large" color="secondary"/>
            </Box>
          ) : null}
      {
        successIcon ? (
          <Box component="span" sx={{ pt: 2, textAlign: 'center' }}>
              <CheckCircleOutlineOutlinedIcon fontSize="large" color="success"/>
            </Box>
          ) : null
      }
      {
        warningIcon ? (
          <Box component="span" sx={{ pt: 2, textAlign: 'center' }}>
                <WarningIcon fontSize="large" color="error"/>
                {/* <img src={Warning} alt="warning" /> */}
            </Box>
          ) : null
      }
      <main>
      <DialogTitle className={classes.dialogTitle} component="h1">
        {title}
      </DialogTitle>

      <DialogContent className={classes.message}>{message}</DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {showSaveBtn && 
            <Button
              variant="contained"
              color="primary"
              onClick={onSave}
              className={classes.saveBtn}
            >
              {saveText ? saveText : "Save"}
            </Button>
          }
          {showCancelBtn ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
              className={classes.cancelBtn}
            >
              Cancel
            </Button>
          ) : null}
          {showOkBtn ? (
            <Button 
              variant="contained" 
              onClick={onConfirm} 
              color="primary"
              className={classes.confirmBtn}
              autoFocus
            >
              {confirmText ? confirmText : "OK"}
            </Button>
          ) : null}
        </Box>
      </DialogActions>
      </main>
    </Dialog>
    </>
  )
};