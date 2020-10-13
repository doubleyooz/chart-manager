import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css'




     

const Confirm = () =>{
   
  
    return(       
        <div className="confirm-container">
            <div className="info">Do you want add more investments?</div>

            <div className="options">
                <Link to='/management'>
                <button>Yes</button>
                </Link>

                <Link to='/'>
                <button>No</button>
                </Link>
            </div>
            
          
        </div>
    )

}   


export default Confirm;