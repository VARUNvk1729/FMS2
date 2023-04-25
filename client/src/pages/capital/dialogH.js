import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({open,handleClose,data,onChange,handleFormData}) {
  const {item,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec}=data;
  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Create a new row
        </DialogTitle>
        <DialogContent>
          <form>
          <TextField id="item" onChange={e=>onChange(e)} value={item} placeholder='Enter the employee name' label="Employeename" variant="outlined" margin="dense" fullWidth/>
            <TextField id="jan" onChange={e=>onChange(e)}  value={jan} placeholder='jan Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="feb" onChange={e=>onChange(e)}  value={feb} placeholder='feb Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="mar" onChange={e=>onChange(e)}  value={mar} placeholder='mar Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="apr" onChange={e=>onChange(e)}  value={apr} placeholder='apr Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="may" onChange={e=>onChange(e)}  value={may} placeholder='may Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="jun" onChange={e=>onChange(e)}  value={jun}  placeholder='jun Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="jul" onChange={e=>onChange(e)}  value={jul}  placeholder='jul Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="aug" onChange={e=>onChange(e)}  value={aug}  placeholder='aug Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="sep" onChange={e=>onChange(e)}  value={sep}  placeholder='sep Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="oct" onChange={e=>onChange(e)}  value={oct}  placeholder='oct Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="nov" onChange={e=>onChange(e)}  value={nov}  placeholder='nov Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="dec" onChange={e=>onChange(e)}  value={dec}  placeholder='dec Value' label="Value" variant="outlined" margin="dense"  fullWidth/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{
          handleFormData(data);
          handleClose();
          }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}