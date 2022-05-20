import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
// import { Doughnut } from 'react-chartjs-2';
// import {Chart} from '@progress/kendo-react-charts';
// import { xorBy } from 'lodash';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import 'hammerjs';
import { fetchUserCreatedFundraisers } from '../services/fundraisers-services';

export function DashboardCharts({ loading, setLoading }) {
  const { fundraisers } = useSelector((state) => state.fundraiser);
  const { loginSuccess } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // need on charts
  const [chartText, setChartText] = useState('Select the dropdown to view statistics')

  // money per project
  const [projectNames, setProjectNames] = useState(['']); // ['Street Artists', 'GoUkraine', 'ForFood']
  const [projectRaised, setProjectRaised] = useState([0]); // [3000, 1000, 2000]

  const [lastTwentyFourHours, setLastTwentyFourHours] = useState(0);

  // money per donators
  const [donatorNames, setDonatorNames] = useState([]); // ['Mustafa', 'Daniel', 'Busayo']
  const [donatorPaid, setDonatorPaid] = useState([]); // [150, 100, 200]

  // views per project
  const [projectViewsNames, setProjectViewsNames] = useState([]); // ['Street Artists', 'GoUkraine', 'ForFood']
  const [projectViews, setProjectViews] = useState([]); // [15, 1, 200]

  const [chartPickedByUser, setChartPickedByUser] = useState('');

  //IMPLEMENTING PIE CHART
  ChartJS.register(ArcElement, Tooltip, Legend, Title);
  const dataPieChart = {
    labels: projectNames,
    datasets: [
      {
        label: '# Target Amount',
        data: projectRaised,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataPieChart2 = {
    labels: donatorNames.flat(),
    datasets: [
      {
        label: '# Target Amount',
        data: donatorPaid.flat(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataPieChart3 = {
    labels: projectViewsNames,
    datasets: [
      {
        label: '# Target Amount',
        data: projectViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataPieChart4 = {
    labels: ['John'],
    datasets: [
      {
        label: '# Target Amount',
        data: [12],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  // first load of dashboard
  if (!chartPickedByUser) {
    setProjectNames(data.map((item) => item.title));

    setProjectRaised(data.map((item) => item.currentAmount));
    setChartPickedByUser(dataPieChart);
  }

  let leftChartText = '';
  const handleOnChange = (arg) => {
    let testObj = JSON.parse(arg.target.value);
    setChartPickedByUser(testObj);
    if (arg.target.value === JSON.stringify(dataPieChart)) {
      leftChartText = 'Fundraisers';
      setChartText('Fundraisers Statistics');
    } else if (arg.target.value === JSON.stringify(dataPieChart2)) {
      leftChartText = 'Donors';
      setChartText('Donors Statistics');
    } else if (arg.target.value === JSON.stringify(dataPieChart3)) {
      leftChartText = 'Views';
      setChartText('Views Statistics');
    } else {
      leftChartText = '';
    }
    return leftChartText;
  };
  const dynamicStringSpan = '<p>{leftChartText}</p>';

  useEffect(() => {
    setLoading(true);

    fetchUserCreatedFundraisers(loginSuccess.userId).then((response) => {
      setData(response);
      setLoaded(true);
    });

    setLoading(false);
  }, [fundraisers, loginSuccess]);

  useEffect(() => {
    if (loaded) {
      setProjectNames(data.map((item) => item.title));
      setProjectRaised(data.map((item) => item.currentAmount));

      setProjectViewsNames(data.map((item) => item.title));
      setProjectViews(data.map((item) => item.views));

      const lastDonations = data.flatMap((item) => item.prevDonations);
      const last24hDonations = lastDonations.filter((donation) => {
        return new Date(donation.date).getTime() > new Date().getTime() - 24 * 60 * 60 * 1000;
      });
      const sumLast24h = last24hDonations.reduce((acc, curr) => acc + parseInt(curr.amount), 0);
      console.log(sumLast24h);
      setLastTwentyFourHours(sumLast24h);

      for (let i = 0; i < data.length; i++) {
        setDonatorNames((prevState) => [
          ...prevState,
          data[i].prevDonations.map((item) => item.sender),
        ]);
        setDonatorPaid((prevState) => [
          ...prevState,
          data[i].prevDonations.map((item) => item.amount),
        ]);
      }
    }
  }, [loaded]);

  return (
    <>
      <div className="projectContentContainer"
        style={{
          padding: '1rem',
          marginTop: '30px',
          margin: '5px 5px',
        }}
      >
        <div
          className="projectContentDetails"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="contentRightCharts"
            style={{
              position: 'relative',
              width: '100%',
              border: 'orange 1px solid',
              borderRadius: 15,
            }}
          >
            <Grid
              columns={2}
              divided
              style={{ width: '50rem',display: 'flex',  margin: 'auto', paddingTop: '1rem' }}
            >
              <select
                className="chartInfo"
                name="chartSelected"
                onChange={handleOnChange}
                style={{
                  marginLeft: '15px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.2rem',
                  'border-radius': '36px',
                  'border-bottom': '2px solid rgb(84, 86, 81, 1)',
                  color: 'black',
                  backgroundColor: '#EAEAF2',
                  padding: '1px 10px',
                }}
              >
                <option value=""> -- Chart Selection -- </option>
                <option value={JSON.stringify(dataPieChart)}>Fundraiser statistics</option>
                <option value={JSON.stringify(dataPieChart2)}>Donors statistics</option>
                <option value={JSON.stringify(dataPieChart3)}>Views statistics</option>
              </select>
              <Grid.Row>
                <Grid.Column>
                  <div
                    style={{
                      position: 'absolute',
                      marginTop: '46%',
                      marginLeft: '46%',
                      textAlign: 'center',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <span style={{fontFamily:'"Trebuchet MS", Verdana, sans-serif',
                      fontSize: '1.2em',
                      fontVariantNumeric: 'slashed-zero',
                      color: '#ff9933',
                      }}>
                      {chartText}<br></br>
                    </span>
                  </div>
                  <Pie
                    data={chartPickedByUser}
                    options={{
                      cutout: '60%',
                      borderRadius: '30',
                      responsive: true,
                      animation: {
                        animationRotate: true,
                        duration: 2000,
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                        title: {
                          display: false,
                          text: 'Amount Raised By Project',
                        },
                      },
                    }}
                    style={{
                      maintainAspectRatio: false,
                    }}
                  />
                </Grid.Column>
                <Grid.Column >
                  <div
                    style={{
                      position: 'absolute',
                      marginTop: '46%',
                      marginLeft: '55%',
                      textAlign: 'center',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                        fontSize: '1.2em',
                        fontVariantNumeric: 'slashed-zero',
                        color: '#ff9933',
                      }}
                    >
                      {lastTwentyFourHours}$ raised<br></br>last 24 hours
                    </span>
                  </div>
                  <Doughnut
                    data={dataPieChart4}
                    options={{
                      cutout: '60%',
                      borderRadius: '30',
                      animation: {
                        animationRotate: true,
                        duration: 3000,
                      },
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      elements: {
                        arc: {
                          spacing: 1,
                        },
                      },
                    }}
                    style={{
                      padding: '5px',
                      marginLeft: '3rem',
                      maintainAspectRatio: false,
                    }}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </div>
    </>
  )
}
