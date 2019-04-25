import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';


class TrainingsList extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [], open: false, message: ''};
    }

componentDidMount() {
    this.loadTrainings();
}

//Load all trainings from JSON
loadTrainings = () => {
    fetch ('https://customerrest.herokuapp.com/api/trainings')
    .then (response => response.json())
    .then (jsondata => this.setState({trainings: jsondata.content}))
    .catch(err => console.error(err));
}

//Add new training
addTraining = (newTraining) => {
    fetch ('https://customerrest.herokuapp.com/api/trainings' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTraining)
    })
    .then (response => this.loadTrainings())
    .then (response => this.setState({open: true, message: 'New training added'}))
    .catch (err => console.error(err));
}

//Edit training
editTraining = (link, training) => {
    fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
    })
    .then(response => this.loadTrainings())
    .then(response => this.setState({open: true, message: 'Changes saved'}))
    .catch (err => console.error(err));
}

  // Delete training
  deleteTraining = link => {
    if(window.confirm("Are you sure you want to delete this training?")) {
      fetch(link, { method: "DELETE" })
        .then(response => this.loadTrainings())
        .then(response => this.setState({open: true, message: 'Training deleted succesfully'}))
        .catch(err => console.error(err));
    }
  };



handleClose = (event, reason) => {
    this.setState({ open: false });
  };


render() {

    const columns = [
        {
            Header: "Activity",
            accessor: "activity"
        },
        {
            Header: "Date",
            accessor: "date",
            Cell: row => (
                <span>
                    {moment(row.value).format("DD.MM.YYYY - HH:MM")}
                </span>
            )
        },
        {
            Header: "Duration (min)",
            accessor: "duration"
        },{
            Header: "",
            filterable: false,
            sortable: false,
            width: 90,
            accessor: "links.0.href",
            Cell: ({ value, row }) => ( <EditTraining editTraining={this.editTraining} training={row} link={value} />)
        },{
            Header: "",
            filterable: false,
            sortable: false,
            witdth: 90,
            accessor: "links.0.href",
            Cell: ({value}) => <Button color="secondary" variant="contained" size="small" onClick={() => this.deleteTraining(value)}>DELETE</Button>
        }
];

    return(
        <div>
            <AddTraining addTraining={this.addTraining} />
             <ReactTable
                    data={this.state.trainings}
                    
                    columns={columns}
                    filterable={true}
                    defaultPageSize={15}
                />

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.state.open}
                autoHideDuration={2000}
                onClose={this.handleClose}
                message={this.state.message}
                />
        </div>
    
    
        );
    }
}

export default TrainingsList;