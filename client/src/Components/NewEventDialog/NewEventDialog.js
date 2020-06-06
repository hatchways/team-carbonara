import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import useStylesDialog from './stylesDialog';
import './newEventDialog.css';
import handleFetchErrors from '../../utils/handleFetchErrors';

function NewEventDialog({ open, handleClose, sub, renderNewMeeting }) {
  const classes = useStylesDialog();

  const [name, setName] = useState('');
  const [duration, setDuration] = useState(15);

  const handleSelectedClass = (event) => {
    const selected = document.getElementsByClassName('selected');

    //get selected element and remove selected class
    if (selected.length > 0) {
      selected[0].className = selected[0].className.replace('selected', '');
    }

    //add selected class to new element
    event.target.setAttribute('class', 'selected');
    setDuration(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    fetch(`/api/user/meetings/${sub}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ meetingName: name, duration }),
    })
      .then(handleFetchErrors)
      .then((res) => {
        renderNewMeeting({ meetingName: name, duration });
        handleClose();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Create New Event</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter a name for your event and select a duration.</DialogContentText>
        <TextField fullWidth required variant="outlined" label="Event name" value={name} onChange={handleNameChange} />
        <div className={classes.eventField}>
          <DialogContentText>Event Duration *</DialogContentText>
          <ul className={classes.listContainer}>
            <li className="selected" value={15} onClick={handleSelectedClass}>
              15 min
            </li>
            <li value={30} onClick={handleSelectedClass}>
              30 min
            </li>
            <li value={45} onClick={handleSelectedClass}>
              45 min
            </li>
            <li value={60} onClick={handleSelectedClass}>
              60 min
            </li>
          </ul>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewEventDialog;
