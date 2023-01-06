import React from 'react'
import moment from 'moment';

function Header() {
    const date = moment();
    var currentDate = date.format('DD MMMM YYYY');
    // console.log(currentDate);
    return (
        <div className='todo__header_container mb-4'>
            <h1>Today</h1>
            <p>{currentDate}</p>
        </div>
    )

}

export default Header