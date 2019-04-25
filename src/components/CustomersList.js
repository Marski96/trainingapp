import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';

class CustomersList extends Component {
    constructor(props) {
        super(props);
        this.state = { customers: [], open: false, message: ''};
    }

componentDidMount() {
    this.loadCustomers();
}

//Load all customers from JSON
loadCustomers = () => {
    fetch ('https://customerrest.herokuapp.com/api/customers')
    .then (response => response.json())
    .then (jsondata => this.setState({customers: jsondata.content}))
    .catch(err => console.error(err));
}

//Add new customer
addCustomer = newCustomer => {
    fetch ('https://customerrest.herokuapp.com/api/customers' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
    })
    .then (response => this.loadCustomers())
    .then (response => this.setState({open: true, message: 'New Customer added'}))
    .catch (err => console.error(err));
}

handleClose = (event, reason) => {
    this.setState({ open: false });
  };

render() {
    const columns = [
        {
            Header: "Firstname",
            accessor: "firstname"
        },
        {
            Header: "Lastname",
            accessor: "lastname"
        },
        {
            Header: "Streetaddress",
            accessor: "streetaddress"
        },
        {
            Header: "Postcode",
            accessor: "postcode"
        },
        {
            Header: "City",
            accessor: "city"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Phone",
            accessor: "phone"
        },
];

    return(
        <div>
            <AddCustomer addCustomer={this.addCustomer} />
             <ReactTable
                    data={this.state.customers}
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

export default CustomersList;