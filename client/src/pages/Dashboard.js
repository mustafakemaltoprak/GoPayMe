import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

// import { Container } from 'semantic-ui-react';

//Bar imports
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// Pie imports
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


function Dashboard() {

  //Pie chart data
  // ChartJS.register(ArcElement, Tooltip, Legend);
  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   datasets: [
  //     {
  //       label: '# Target Amount',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  /* BarChart */
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  const [chartData, setChartData] = useState({datasets: [],});

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["John", "Kevin", "Geroge", "Micheal", "Oreo"],
      datasets: [
        {
          label: "Whom'st let the dogs out",
          data: [12, 55, 34, 120, 720],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Whom'st let the dogs out",
        },
      },
    });
  }, []);

  return (
    // <Container></Container>
    <div className='profileContainer' style={{ border: 'red 2px solid', padding: '1rem' }}>
      <div className='summaryHeaderContainer' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div className='summaryCard' style={{ flex: '1', padding: '10px', 'border-radius': '5px', border: 'black 1px solid', gap: '5px', margin: '5px 5px' }}>
          <div className='headerProjects'>
            <div className='titleField'>
              <span className='projectsText'>Projects Created</span>
            </div>
            <div className='dataField'>
              <span className='projectsData'>10</span>
            </div>
          </div>
        </div>
        <div className='summaryCard' style={{ flex: '1', padding: '10px', 'border-radius': '5px', border: 'black 1px solid', gap: '5px', margin: '5px 5px' }}>
          <div className='headerTotalRaised'>
            <div className='titleField'>
              <span className='totalRaisedText'>Total Raised</span>
            </div>
            <div className='dataField'>
              <span className='moneyData'>$1000</span>
            </div>
          </div>
        </div>
        <div className='summaryCard' style={{ flex: '1', padding: '10px', 'border-radius': '5px', border: 'black 1px solid', gap: '5px', margin: '5px 5px' }}>
          <div className='headerDonators'>
            <div className='titleField'>
              <span className='donatorsText'>Donators</span>
            </div>
            <div className='dataField'>
              <span className='donatorsData'>187</span>
            </div>
          </div>
        </div>
        <div className='summaryCard' style={{ flex: '1', padding: '10px', 'border-radius': '5px', border: 'black 1px solid', gap: '5px', margin: '5px 5px' }}>
          <div className='headerViews'>
            <div className='titleField'>
              <span className='viewsText'>Views</span>
            </div>
            <div className='dataField'>
              <span className='viewsData'>9872</span>
            </div>
          </div>
        </div>
      </div>
      <div className='projectContentContainer' style={{ border: 'black 1px solid', padding: '1rem', 'margin-top': '30px', margin: '5px 5px' }}>
        <div className='contentTitle'>
          <span className='contentTitleField'>Your Projects</span>
        </div>
        <div className='projectContentDetails' style={{ display: 'flex', justifyContent: 'space-between', border: 'blue 1px solid'}}>
          <div className='contentLeftDetails' style={{ flex: '1', border: 'orange 1px solid', margin: '5px 5px'}}>
            <span>Awaiting project cards components</span>
          </div>
          <div className='contentRightCharts' style={{ flex: '1', border: 'orange 1px solid', margin: '5px 5px'}}>
            <span>Charts Space</span>
            {/* <Pie data={data} /> */}
            <Bar options={chartOptions} data={chartData}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard