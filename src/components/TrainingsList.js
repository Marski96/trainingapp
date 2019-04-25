import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import moment from 'moment';


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
    fetch ('https://customerrest.herokuapp.com/gettrainings')
    .then (response => response.json())
    .then (jsondata => this.setState({trainings: jsondata}))
    .catch(err => console.error(err));
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
  deleteTraining = (link) => {
    if(window.confirm("Are you sure you want to delete this training?")) {
      fetch('https://customerrest.herokuapp.com/api/trainings/' + link, 
      { method: "DELETE" })
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
                    {moment(row.value).format("D.M.YYYY")}
                </span>
            )
        },
        {
            Header: "Duration (min)",
            accessor: "duration"
        },{
            Header: "Firstname",
            accessor: "customer.firstname"
        },{
            Header: "Lastname",
            accessor: "customer.lastname"
        },{
            Header: "",
            filterable: false,
            sortable: false,
            witdth: 90,
            accessor: "id",
            Cell: ({value}) => <Button color="secondary" variant="contained" size="small" onClick={() => this.deleteTraining(value)}>DELETE TRAINING</Button>
        }
];

    return(
        <div>
             <ReactTable
                    data={this.state.trainings}
                    columns={columns}
                    filterable={true}
                    defaultPageSize={20}
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