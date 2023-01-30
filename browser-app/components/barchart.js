import React from 'react';
import { Bar } from 'react-chartjs-2';

import { CategoryScale, LinearScale } from "chart.js";
import Chart from 'chart.js/auto'
Chart.register(CategoryScale);
Chart.register(LinearScale);


const width = 400
const height = 75
const options = {
    maintainAspectRatio: true
}




const numbers = [12, 19, 3, 5, 2, 3]
const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orage']


const data_combined_us_surnameletter = {
    labels: labels,
    datasets: [{
        data: numbers,
        label: 'Number of Persons',
        backgroundColor: 'lightblue' 
    }]
}

const BarChart_Combined_US_SurnameLetter = () => ({
    render() {
        return (
            <div><Bar data={data_combined_us_surnameletter} width={width} height={height} options={options} /></div>);
    }});
export default BarChart_Combined_US_SurnameLetter