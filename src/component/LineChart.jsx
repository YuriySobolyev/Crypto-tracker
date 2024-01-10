// import React from 'react';
// import {Line} from 'react-chartjs-2';
// import {
//     CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip,
// } from 'chart.js';
//
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);
//
// const OPTIONS = {
//     responsive: true, maintainAspectRatio: false, // aspectRatio: 1|1,
//     plugins: {
//         legend: {
//             display: false,
//         }, filler: {
//             propagate: true
//         },
//     }, scales: {
//         y: {
//             ticks: {
//                 color: 'rgb(255,255,255)', font: {
//                     size: 10,
//                 },
//             }, grid: {
//                 display: true, color: 'rgba(255,255,255,0.05)',
//             },
//         }, x: {
//             ticks: {
//                 color: 'rgb(255,255,255)', font: {
//                     size: 10,
//                 },
//             }, grid: {
//                 display: true, color: 'rgba(255,255,255,0.05)',
//             },
//         },
//     },
// };
//
// const determineColors = (data, useTransparentColors) => {
//     const colors = [];
//     for (let i = 0; i < data.length - 1; i++) {
//         if (data[i] < data[i + 1]) {
//             colors.push(useTransparentColors ? 'rgba(0, 255, 0, 0.3)' : 'green'); // Зеленый для роста
//         } else {
//             colors.push(useTransparentColors ? 'rgba(255, 0, 0, 0.3)' : 'red'); // Красный для падения
//         }
//     }
//     return colors;
// };
// export const LineChart = ({data, labels, selectedCrypto}) => {
//     if (!selectedCrypto) {
//         return null;
//     }
//
//     const chartData = {
//         labels: labels, datasets: [{
//             label: selectedCrypto.name,
//             data: data, // fill: true,
//             borderColor: determineColors(data, false),
//             backgroundColor: determineColors(data, true),
//             borderWidth: 1.5,
//             pointRadius: 2,
//             tension: 0.4,
//             fill: {
//                 display: true, target: 'origin', above: determineColors(data, true),
//             },
//         },],
//     };
//
//     const priceChange = data[data.length - 1] - data[0];
//     const priceColor = priceChange > 0 ? 'green' : 'red';
//     const arrowIcon = priceChange > 0 ? '↑' : '↓';
//
//     return (<div className="lineChart">
//             <div className="header">
//                 <div className="crypto_name">
//                     <h3>
//                         {selectedCrypto.name}({selectedCrypto.symbol})
//                     </h3>
//                 </div>
//                 <div className="crypto_img">
//                     <img
//                         src={`https://assets.coincap.io/assets/icons/${selectedCrypto.symbol.toLowerCase()}@2x.png`}
//                         alt="Crypto_img"
//                     />
//                 </div>
//                     <div className="crypto_price">
//                     <h3 style={{color: priceColor}}>
//                         $ {Math.round(selectedCrypto.priceUsd * 100) / 100} {arrowIcon}
//                     </h3>
//                 </div>
//             </div>
//             <div className="chart-container">
//                 <Line options={OPTIONS} data={chartData}/>
//             </div>
//         </div>);
// };
//
// export default LineChart;
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        filler: {
            propagate: true,
        },
    },
    scales: {
        y: {
            ticks: {
                color: 'rgb(255,255,255)',
                font: {
                    size: 10,
                },
            },
            grid: {
                display: true,
                color: 'rgba(255,255,255,0.05)',
            },
        },
        x: {
            ticks: {
                color: 'rgb(255,255,255)',
                font: {
                    size: 10,
                },
            },
            grid: {
                display: true,
                color: 'rgba(255,255,255,0.05)',
            },
        },
    },
};

const determineColors = (data, useTransparentColors) => {
    const gradientColors = [];
    for (let i = 0; i < data.length - 1; i++) {
        if (data[i] < data[i + 1]) {
            gradientColors.push(
                useTransparentColors
                    // ? 'linear-gradient(180deg, rgba(9,255,0,1) 0%, rgba(9,255,0,0) 100%)'
                    ? 'rgba(0, 255, 0, 0.15)'
                    : 'green'
            );
        } else {
            gradientColors.push(
                useTransparentColors
                    // ? 'linear-gradient(180deg, rgba(255, 0, 0, 0.3) 0%, rgba(255, 0, 0,0) 70%)'
                    ? 'rgba(255, 0, 0, 0.15)'
                    : 'red'
            );
        }
    }
    return gradientColors;
};

export const LineChart = ({ data, labels, selectedCrypto }) => {
    if (!selectedCrypto) {
        return null;
    }

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: selectedCrypto.name,
                data: data,
                borderColor: determineColors(data, false),
                backgroundColor: determineColors(data, true),
                borderWidth: 1.5,
                pointRadius: 2,
                tension: 0.4,
                fill: {
                    display: true,
                    target: 'origin',
                    above: determineColors(data, true),
                },
            },
        ],
    };

    const priceChange = data[data.length - 1] - data[0];
    const priceColor = priceChange > 0 ? 'green' : 'red';
    const arrowIcon = priceChange > 0 ? '▲' : '▼';

    return (
        <div className="lineChart">
            <div className="header">
                <div className="crypto_name">
                    <h3>
                        {selectedCrypto.name}({selectedCrypto.symbol})
                    </h3>
                </div>
                <div className="crypto_img">
                    <img
                        src={`https://assets.coincap.io/assets/icons/${selectedCrypto.symbol.toLowerCase()}@2x.png`}
                        alt="Crypto_img"
                    />
                </div>
                <div className="crypto_price">
                    <h3 style={{ color: priceColor }}>
                        {arrowIcon} $ {Math.round(selectedCrypto.priceUsd * 100) / 100}
                    </h3>
                </div>
            </div>
            <div className="chart-container">
                <Line options={OPTIONS} data={chartData} />
            <div className="chart-container_bg">
            <img
                        src={`https://assets.coincap.io/assets/icons/${selectedCrypto.symbol.toLowerCase()}@2x.png`}
                        alt="Crypto_img"
                    />
            </div>
            </div>           
        </div>
    );
};

export default LineChart;
