import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const OPTIONS = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        y: {
            ticks: {
                color: "rgb(255,255,255)",
                font: {
                    size: 14,
                },
            },
            grid: {
                display: true,
            },
        },
        x: {
            ticks: {
                color: "rgb(255,255,255)",
                font: {
                    size: 14,
                },
            },
            grid: {
                display: false,
            },
        },
    },
};

const LineChart = ({data, labels, selectedCrypto}) => {

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: selectedCrypto.name,
                data: data,
                borderColor: "rgb(255,255,255)",
                backgroundColor: "rgb(255,255,255)",
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="lineChart">
            <div className="title">
                <h3>{selectedCrypto.name}</h3>
                <h3>{Math.round(
                    selectedCrypto.priceUsd * 100
                ) / 100}
                </h3>
            </div>
            <Line options={OPTIONS} data={data} />
        </div>
    );
};

export default LineChart;