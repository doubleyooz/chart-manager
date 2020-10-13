import React from 'react';
import { Link } from 'react-router-dom';
import { Chart } from "react-google-charts";

import './styles.css'
 
function Dashboard(){
    return(
        
        <div className="page-dashboard">
            <Link to='/management'>
                <span>Management</span>
                    
            </Link> 
            <div className="chart-container">
                <div className="pie-chart">
    
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Task', 'Hours per Day'],
                            ['Work', 11],
                            ['Eat', 2],
                            ['Commute', 2],
                            ['Watch TV', 2],
                            ['Sleep', 7],
                        ]}
                        options={{
                            title: 'My Daily Activities',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            </div>
        </div> 
        
       
    )
    
}
export default Dashboard;