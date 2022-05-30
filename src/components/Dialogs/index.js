import * as React from "react";
// import PropTypes from "prop-types";
import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import styles from "./styles";

export default function ViewDialog(props) {
  const classes = styles();
  const {
    title,
    message,
    setOpen,
    confirmText,
    saveText,
    showTurnBtn,
    showSaveApplyBtn,
    //turnText,
    onConfirm,
    //onCancel,
    clickOutsideToClose,
    showCancelBtn = false,
    showOkBtn = true,
    showSaveBtn,
    loading,
    //children,
    //name,
    showdisableBtn,
    //...other
  } = props;
  //const { configs } = this.props.clientConfig;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.dialogPaper }}
    >
      <main>
        <DialogTitle className={classes.dialogTitle} component="h1">
          {title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="alert-dialog-message">
          {message}
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Box
            display="flex"
            justifyContent="right"
            alignItems="center"
            width="100%"
          >
            {loading ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                {" "}
                <CircularProgress />
                <br />
                <span>Loading data ...</span>
              </div>
            ) : (
              <>
                {showSaveBtn ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={clickOutsideToClose}
                    disabled={showdisableBtn}
                  >
                    {saveText ? saveText : "Save"}
                  </Button>
                ) : null}{" "}
                &nbsp; &nbsp; &nbsp;
                {showCancelBtn ? (
                  <Button
                    variant="outlined"
                    className={classes.cancelBtn}
                    color="primary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                ) : null}{" "}
                &nbsp; &nbsp; &nbsp;
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
                {showTurnBtn ? (
                  <Button
                    variant="contained"
                    onClick={onConfirm}
                    color="primary"
                    className={classes.confirmBtn}
                    autoFocus
                    disabled={showdisableBtn}
                  >
                    Turn Off Allocation
                  </Button>
                ) : null}
                {showSaveApplyBtn ? (
                  <Button
                    variant="contained"
                    onClick={onConfirm}
                    color="primary"
                    className={classes.confirmBtn}
                    autoFocus
                    disabled={showdisableBtn}
                  >
                    Save & Apply
                  </Button>
                ) : null}
              </>
            )}
          </Box>
        </DialogActions>
      </main>
    </Dialog>
  );
}
