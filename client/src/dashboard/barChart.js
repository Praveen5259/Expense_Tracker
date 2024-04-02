import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { getDataForLastSevenDays } from './utils'; 

const BarGraph = ({ totalExpense }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const dataForLastSevenDays = getDataForLastSevenDays(totalExpense);
    const labels = dataForLastSevenDays.map((data) => data.date) || [];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Previous Week Expense',
        data: dataForLastSevenDays.map(expense => expense.expense), 
        backgroundColor:[ '#7E909A',
                          '#488A99',
                        '#A5D8DD',
                      '#EA6A47',
                    '#6AB187',
                  '#D32D41',
                '#DBAE58'] 
      }]
    };

    setChartData(data);
  }, [totalExpense]);

  useEffect(() => {
    if (chartData && chartContainer.current) {
      // Destroy existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      // Create new chart instance
      chartInstance.current = new Chart(chartContainer.current, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [chartData]);

  return (
    <div>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};

export default BarGraph;
