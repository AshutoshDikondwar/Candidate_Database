import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChart = ({ data }) => {

  const skillCounts = data.reduce((acc, candidate) => {
    candidate.skills.split(',').forEach(skill => {
      skill = skill.trim();
      if (acc[skill]) {
        acc[skill]++;
      } else {
        acc[skill] = 1;
      }
    });
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(skillCounts),
    datasets: [
      {
        label: 'Number of Candidates',
        data: Object.values(skillCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        color:'white'
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Candidates by Skills',
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
