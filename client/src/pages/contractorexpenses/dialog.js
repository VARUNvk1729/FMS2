import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({open,handleClose,data,onChange,handleFormData}) {
  const {contractorname,country,dept,job_title,contract_type,rate}=data;
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
            <TextField id="contractorname" onChange={e=>onChange(e)} value={contractorname} placeholder='Enter the employee name' label="Entity" variant="outlined" margin="dense" fullWidth/>
            <TextField id="country" onChange={e=>onChange(e)}  value={country} placeholder='Country' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="dept" onChange={e=>onChange(e)}  value={dept} placeholder='dept' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="job_title" onChange={e=>onChange(e)}  value={job_title} placeholder='Job title' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="contract_type" onChange={e=>onChange(e)}  value={contract_type} placeholder='Bill type' label="Value" variant="outlined" margin="dense"  fullWidth/>
            <TextField id="rate" onChange={e=>onChange(e)}  value={rate} placeholder='Enter the monthly rate' label="Value" variant="outlined" margin="dense"  fullWidth/>
            
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