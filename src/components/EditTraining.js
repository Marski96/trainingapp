import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class EditTraining extends Component {
     state = {
        open: false, date: '', duration: '', acitivity: ''
 };

handleClickOpen = () => {
    this.setState({ open: true });
    this.setState({
        date: this.props.training.date,
        duration: this.props.training.duration,
        activity: this.props.training.activity,
    })
};

handleClose = () => {
    this.setState({ open: false});
};

handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
}

saveTraining = () => {
    const training = {
        date: this.state.date,
        duration: this.state.duration,
        activity: this.state.activity,
    }

    this.props.editTraining(this.props.link, training);
    this.handleClose();
};

render() {
    return (
        <div>
            <Button style={{margin: 0}} variant="outlined" size="small" color="primary" onClick={this.handleClickOpen}>EDIT</Button>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Training</DialogTitle>
                    <DialogContent>
                        <TextField margin="dense" name="activity" value={this.state.activity} onChange={this.handleChange} label="Activity" fullWidth />
                        <TextField autoFocus margin="dense" name="date" value={this.state.date} onChange={this.handleChange} label="Date (DD.MM.YYYY - HH:MM)" fullWidth />
                        <TextField margin="dense" name="duration" value={this.state.duration} onChange={this.handleChange} label="Duration (min)" fullWidth />
                    </DialogContent>
                    
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.saveTraining} color="primary">Save</Button>
                    </DialogActions>
            </Dialog>
        </div>
         );
    }   
}

export default EditTraining;