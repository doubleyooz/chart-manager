import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css'

function Dashboard(){
    return(

        <Link to='/management'>
            <div id="page-dashboard">
                Management
            </div>         
        </Link> 
        
    )
    
}
export default Dashboard;