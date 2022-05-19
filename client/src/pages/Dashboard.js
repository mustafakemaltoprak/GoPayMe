import React, { useState, useEffect } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import CardItem from '../components/Card';
import { useSelector } from 'react-redux';
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart,
//   ChartLegend,
//   ChartSeries,
//   ChartSeriesItem,
//   ChartSeriesLabels,
// } from '@progress/kendo-react-charts';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

import 'hammerjs';
import Loader from '../components/Loader';

import { motion } from 'framer-motion';
import { fetchUserCreatedFundraisers } from '../services/fundraisers-services';

// import { xorBy } from 'lodash';

function Dashboard() {
  const { fundraisers } = useSelector((state) => state.fundraiser);

  const { loginSuccess } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [projectsCreated, setProjectsCreated] = useState(0);
  const [totalRaised, setTotalRaised] = useState(0);
  const [donators, setDonators] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chartText, setChartText] = useState('Select the dropdown to view statistics')
  const [views, setViews] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Charts States
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

  // console.log('checking projectsCreated', projectsCreated);
  // console.log('checking totalRaised', totalRaised);
  // console.log('checking donators', donators);
  // console.log('checking views', views);
  // console.log('checking data', data);

  const pieData = data.map((el) => {
    return { kind: el.name, share: el.currentAmount };
  });

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
    // labels: [donators],
    datasets: [
      {
        label: '# Target Amount',
        // data: [totalRaised],
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
    // labels: [donators],
    datasets: [
      {
        label: '# Target Amount',
        // data: [totalRaised],
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
    console.log('first loading dashboard');
  }

  let leftChartText = '';
  const handleOnChange = (arg) => {

    console.log('ARGU', arg.target.value)
    console.log('leftChartText arg', arg.target.value);
    let testObj = JSON.parse(arg.target.value);
    setChartPickedByUser(testObj);
    if (arg.target.value === JSON.stringify(dataPieChart)) {
      console.log('fireddd fundraisers')
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
    console.log('leftChartText', leftChartText);
    return leftChartText;
  };
  const dynamicStringSpan = '<p>{leftChartText}</p>';

  // const labelContent = (e) => e.category;

  // const reactDonutChartBackgroundColor = ['#00E396', '#FEB019', '#FF4560', '#775DD0'];

  // const reactDonutChartInnerRadius = 0.5;
  // const reactDonutChartSelectedOffset = 0.04;
  // const reactDonutChartHandleClick = (item, toggled) => {
  //   if (toggled) {
  //     console.log(item);
  //   }
  // };
  // let reactDonutChartStrokeColor = '#FFFFFF';
  // const reactDonutChartOnMouseEnter = (item) => {
  //   let color = pieData.find((q) => q.label === item.label).color;
  //   reactDonutChartStrokeColor = color;
  // };

  useEffect(() => {
    setLoading(true);
    // if (fundraisers.length > 0) {
    //   const filteredFundraisers = fundraisers.filter((item) => item.writer === loginSuccess.userId);
    //   setData(filteredFundraisers);
    // }

    fetchUserCreatedFundraisers(loginSuccess.userId).then((response) => {
      setData(response);
      setLoaded(true);
    });

    // setLoaded(true);
    setLoading(false);
  }, [fundraisers, loginSuccess]);

  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }

  let todayFormatted = getFormattedDate(new Date());

  const [totalTwentyFourHours, setTotalTwentyFourHours] = useState([]);

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
        setTotalRaised((prev) => prev + data[i].currentAmount);
        setDonators((prev) => prev + data[i].backers);
        setViews((prev) => prev + data[i].views);
        setProjectsCreated(projectsCreated + data.length);
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

  // console.log('donator names', donatorNames.flat());
  // console.log('donator amount', donatorPaid.flat());

  // console.log("test", totalTwentyFourHours)

  const onClick = (e) => {
    console.log(e);
  };

  // if (!data.length) {
  //   return <div>...please add your first Fundraiser on menu: My fundraisers...</div>;
  // }

  // console.log('names', projectNames);

  return (
    // {loading ?  <Loader  /> :}
    // <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <>
      {loading ? (
        <Loader />
      ) : (

        <div
          className="profileContainer"
          style={{
            // border: 'red 2px solid',
            padding: '1rem',
            // backgroundColor: '#4e567d'
            backgroundColor: '#FBFBFF',
            marginTop: '3rem',
            'border-radius': '40px',
          }}
        >
          <div
            className="summaryHeaderContainer"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              className="summaryCard"
              style={
                {
                  // flex: '1',
                  // padding: '10px',
                  // 'border-radius': '5px',
                  // // border: 'black 1px solid',
                  // gap: '5px',
                  // margin: '5px 5px',
                  // backgroundColor: '#cbf4f1',
                }
              }
            >
              <div className="headerProjects">
                <div className="titleField">
                  <span
                    className="projectsData"
                    style={{
                      display: 'table',
                      margin: 'auto',
                      fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                      // color: '#E0A030',
                      fontSize: '1.8em',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    <Icon
                      name="small tasks"
                      style={{
                        'margin-left': '3px',
                        // color: '#E0A030',
                      }}
                    />
                    {projectsCreated}
                  </span>
                </div>
                <div className="dataField">
                  {/* <span className="projectsData">{projectsCreated}</span> */}
                  <span
                    className="projectsText"
                    style={{
                      display: 'table',
                      margin: 'auto',
                      marginTop: '5px',
                      fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                      // color: '#E0A030',
                      fontSize: '1.0em',
                      textAlign: 'center',
                    }}
                  >
                    Projects Created
                  </span>
                </div>
              </div>
            </div>
            <div
              className="summaryCard"
              style={
                {
                  // flex: '1',
                  // padding: '10px',
                  // 'border-radius': '5px',
                  // // border: 'black 1px solid',
                  // gap: '5px',
                  // margin: '5px 5px',
                  // backgroundColor: '#cbf4f1',
                }
              }
            >
              <div className="headerTotalRaised">
                <div className="titleField">
                  <span
                    className="projectsData"
                    style={{
                      display: 'table',
                      margin: 'auto',
                      fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                      // color: '#E0A030',
                      fontSize: '1.8em',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    <Icon
                      name="small money bill alternate outline"
                      style={{
                        'margin-left': '3px',
                        // color: '#E0A030',
                      }}
                    />
                    {totalRaised}$
                  </span>
                </div>
                <div className="dataField">
                  <span
                    className="projectsText"
                    style={{
                      display: 'table',
                      margin: 'auto',
                      marginTop: '5px',
                      fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                      // color: '#E0A030',
                      fontSize: '1.0em',
                      textAlign: 'center',
                    }}
                  >
                    Total Raised
                  </span>
                </div>
              </div>
            </div>
            <div
              className="summaryCard"
              style={
                {
                  // flex: '1',
                  // padding: '10px',
                  // 'border-radius': '5px',
                  // // border: 'black 1px solid',
                  // gap: '5px',
                  // margin: '5px 5px',
                  // backgroundColor: '#cbf4f1',
                }
              }
            >
              <div className="headerDonators">
                <div className="titleField" style={{ textAlign: 'center' }}>
                  <span
                    className="projectsData"
                    style={{
                      display: 'table',
                      margin: 'auto',
                      fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                      // color: '#E0A030',
                      fontSize: '1.8em',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    <Icon
                      name="small users"
                      style={{
                        'margin-left': '3px',
                        // color: '#E0A030',
                      }}
                    />
                    {donators}
                  </span>
                  <div className="dataField">
                    <span
                      className="projectsText"
                      style={{
                        display: 'table',
                        margin: 'auto',
                        marginTop: '5px',
                        fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                        // color: '#E0A030',
                        fontSize: '1.0em',
                        textAlign: 'center',
                      }}
                    >
                      Donors
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="summaryCard"
              style={
                {
                  // flex: '1',
                  // padding: '10px',
                  // 'border-radius': '5px',
                  // // border: 'black 1px solid',
                  // gap: '5px',
                  // margin: '5px 5px',
                  // backgroundColor: '#cbf4f1',
                }
              }
            >
              <div className="headerViews">
                <div className="titleField" style={{ textAlign: 'center' }}>
                  <span
                    className="projectsData"
                    style={{
                      display: 'table',
                      margin: 'auto',
                      fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                      // color: '#E0A030',
                      fontSize: '1.8em',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    <Icon
                      name="small eye"
                      style={{
                        'margin-left': '3px',
                        // color: '#E0A030',
                      }}
                    />
                    {views}
                  </span>
                  <div className="dataField">
                    <span
                      className="projectsText"
                      style={{
                        display: 'table',
                        margin: 'auto',
                        marginTop: '5px',
                        fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                        // color: '#E0A030',
                        fontSize: '1.0em',
                        textAlign: 'center',
                      }}
                    >
                      Views
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="projectContentContainer"
            style={{
              // border: 'black 1px solid',
              padding: '1rem',
              'margin-top': '30px',
              margin: '5px 5px',
            }}
          >
            {/* <div className="contentTitle">
              <strong className="contentTitleField">Your Projects</strong>
            </div> */}
            <div
              className="projectContentDetails"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                // border: 'blue 1px solid',
              }}
            >
              <div
                className="contentRightCharts"
                style={{
                  position: 'relative',
                  width: '100%',
                  border: 'orange 1px solid',
                  borderRadius: 15
                  // margin: '5px 5px',
                  // width: '40%',
                  // height: '100vh',
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
                      // backgroundColor: '#0C6980',
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
                          // height: '50%',
                          // width: '100%',
                          // border: 'black 1px solid',
                          // responsive: true,
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
                          // height: '50%',
                          // width: '100%',
                          // border: 'black 1px solid',
                          padding: '5px',
                          marginLeft: '3rem',
                          // responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
