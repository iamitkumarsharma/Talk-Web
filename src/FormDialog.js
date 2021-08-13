import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import Picker from "emoji-picker-react";

function FormDialog({ setName, open, setOpen }) {
  const [input, setInput] = React.useState("");

  const handleClose = () => {
    setName(input);
  };
  const addUser = () => {
    localStorage.setItem("sender", input);
    setName(input);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Name</DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText>
              To Login into this page. Please Enter Your Full Name!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              onChange={(event) => setInput(event.target.value)}
              label="Your Full Name"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={addUser} type="submit" color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default FormDialog;
