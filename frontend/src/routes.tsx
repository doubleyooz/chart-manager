import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";


import Management from './pages/Management';
import Dashboard from './pages/Dashboard';
import Confirm from './pages/Confirm';

export default function Routes(){
    return (
       <div className='routes-container'>
        
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component ={Dashboard}/>
                <Route path="/management" exact component ={Management}/>
                <Route path="/confirm" exact component ={Confirm}/>
                
            </Switch>
          

        </BrowserRouter>
       </div>
       
    );
}