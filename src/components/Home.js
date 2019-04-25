import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import "react-table/react-table.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios'


const localizer = BigCalendar.momentLocalizer(moment);

class Home extends Component {
    state = {
        events: []
    }

componentDidMount() {
    
}


render() {

    return(
            <div>
               Welcome to the homepage!
            </div>
    );


    }
}

export default Home;