import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from '@material-ui/core/Snackbar';
import Moment from 'react-moment';
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
    fetch ('https://customerrest.herokuapp.com/api/trainings')
    .then (response => response.json())
    .then (jsondata => this.setState({trainings: jsondata.content}))
    .catch(err => console.error(err));
}

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
                    {moment(row.value).format("D.M.YYYY - hh:mm")}
                </span>
            )
        },
        {
            Header: "Duration (min)",
            accessor: "duration"
        },
];

    return(
        <div>
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