import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({open,handleClose,data,onChange,handleFormData}) {
  const {expenses,date,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec}=data;
  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add new expenses:
        </DialogTitle>
        <DialogContent>
          <form>
          Expenses<TextField id="expenses" onChange={e=>onChange(e)} value={expenses} placeholder='Enter the expenses' label="expenses" variant="outlined" margin="dense" fullWidth/>
            Date<TextField id="date" onChange={e=>onChange(e)} value={date} placeholder='Enter the date' label="Enter the date" variant="outlined" margin="dense" fullWidth/>
             January value: <TextField id="jan" onChange={e=>onChange(e)}  value={jan}  variant="outlined" margin="dense"  fullWidth/>
            February value: <TextField id="feb" onChange={e=>onChange(e)}  value={feb}  variant="outlined" margin="dense"  fullWidth/>
            March value: <TextField id="mar" onChange={e=>onChange(e)}  value={mar}  variant="outlined" margin="dense"  fullWidth/>
            April value: <TextField id="apr" onChange={e=>onChange(e)}  value={apr}  variant="outlined" margin="dense"  fullWidth/>
            May value: <TextField id="may" onChange={e=>onChange(e)}  value={may}  variant="outlined" margin="dense"  fullWidth/>
            June value: <TextField id="jun" onChange={e=>onChange(e)}  value={jun} variant="outlined" margin="dense"  fullWidth/>
            July value: <TextField id="jul" onChange={e=>onChange(e)}  value={jul} variant="outlined" margin="dense"  fullWidth/>
            August value: <TextField id="aug" onChange={e=>onChange(e)}  value={aug}  variant="outlined" margin="dense"  fullWidth/>
            Sep value: <TextField id="sep" onChange={e=>onChange(e)}  value={sep}  variant="outlined" margin="dense"  fullWidth/>
            Oct value: <TextField id="oct" onChange={e=>onChange(e)} value={oct} variant="outlined" margin="dense" fullWidth/>
            Nov value: <TextField id="nov" onChange={e=>onChange(e)} value={nov} variant="outlined" margin="dense" fullWidth/>
            Dec value: <TextField id="dec" onChange={e=>onChange(e)} value={dec}  variant="outlined" margin="dense" fullWidth/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleFormData(data)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}