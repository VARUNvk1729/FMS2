import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@material-ui/core";

export default function FormDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormData,
}) {
  const {
    CashFlow,
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec,
  } = data;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create a new row</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="CashFlow"
              onChange={(e) => onChange(e)}
              value={CashFlow}
              placeholder="Enter the property"
              label="Entity"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Jan"
              onChange={(e) => onChange(e)}
              value={Jan}
              placeholder="Jan Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Feb"
              onChange={(e) => onChange(e)}
              value={Feb}
              placeholder="Feb Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Mar"
              onChange={(e) => onChange(e)}
              value={Mar}
              placeholder="Mar Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Apr"
              onChange={(e) => onChange(e)}
              value={Apr}
              placeholder="Apr Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="May"
              onChange={(e) => onChange(e)}
              value={May}
              placeholder="May Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Jun"
              onChange={(e) => onChange(e)}
              value={Jun}
              placeholder="Jun Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Jul"
              onChange={(e) => onChange(e)}
              value={Jul}
              placeholder="Jul Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Aug"
              onChange={(e) => onChange(e)}
              value={Aug}
              placeholder="Aug Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Sep"
              onChange={(e) => onChange(e)}
              value={Sep}
              placeholder="Sep Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Oct"
              onChange={(e) => onChange(e)}
              value={Oct}
              placeholder="Oct Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Nov"
              onChange={(e) => onChange(e)}
              value={Nov}
              placeholder="Nov Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Dec"
              onChange={(e) => onChange(e)}
              value={Dec}
              placeholder="Dec Value"
              label="Value"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <input
              type="radio"
              name="Category"
              value="I"
              onChange={(e) => onChange(e)}
              id="inflow"
            />
            <label htmlFor="inflow">Inflow</label>
            <input
              type="radio"
              name="Category"
              value="E"
              onChange={(e) => onChange(e)}
              id="expense"
            />
            <label htmlFor="expense">Expense</label>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleFormData(data)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
