import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class CustomersList extends Component {
    constructor(props) {
        super(props);
        this.state = { customers: [] };
    }

componentDidMount() {
    this.loadCustomers();
}

loadCustomers = () => {
    fetch ('https://customerrest.herokuapp.com/api/customers')
    .then (response => response.json())
    .then (jsondata => this.setState({customers: jsondata.content}))
}


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
             <ReactTable
                    data={this.state.customers}
                    columns={columns}
                    filterable={true}
                    defaultPageSize={15}
                />
        </div>
    );


    }
}

export default CustomersList;