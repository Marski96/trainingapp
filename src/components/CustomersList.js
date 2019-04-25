import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

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
addCustomer = (newCustomer) => {
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

//Edit Customer
editCustomer = (link, customer) => {
    fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(response => this.loadCustomers())
    .then(response => this.setState({open: true, message: 'Changes saved'}))
    .catch (err => console.error(err));
}

  // Delete customer
  deleteCustomer = link => {
    if(window.confirm("Are you sure you want to delete this customer?")) {
      fetch(link, { method: "DELETE" })
        .then(response => this.loadCustomers())
        .then(response => this.setState({open: true, message: 'Customer deleted succesfully'}))
        .catch(err => console.error(err));
    }
  };



handleClose = (event, reason) => {
    this.setState({ open: false });
  };

render() {
    const columns = [
        {
            Header: "Firstname",
            accessor: "firstname"
        },{
            Header: "Lastname",
            accessor: "lastname"
        },{
            Header: "Streetaddress",
            accessor: "streetaddress"
        },{
            Header: "Postcode",
            accessor: "postcode"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Email",
            accessor: "email"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "",
            filterable: false,
            sortable: false,
            width: 90,
            accessor: "links.0.href",
            Cell: ({ value, row }) => ( <EditCustomer editCustomer={this.editCustomer} customer={row} link={value} />)
        },{
            Header: "",
            filterable: false,
            sortable: false,
            witdth: 90,
            accessor: "links.0.href",
            Cell: ({value}) => <Button color="secondary" variant="contained" size="small" onClick={() => this.deleteCustomer(value)}>DELETE</Button>
        }
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