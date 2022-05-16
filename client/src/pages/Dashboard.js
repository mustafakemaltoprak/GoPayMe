import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import CardItem from '../components/Card';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

import 'hammerjs';

// import { xorBy } from 'lodash';

function Dashboard() {
  const { fundraisers } = useSelector((state) => state.fundraiser);

  const { loginSuccess } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [projectsCreated, setProjectsCreated] = useState(0);
  const [totalRaised, setTotalRaised] = useState(0);
  const [donators, setDonators] = useState(0);
  const [views, setViews] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Charts States
  // money per project
  const [projectNames, setProjectNames] = useState(['']); // ['Street Artists', 'GoUkraine', 'ForFood']
  const [projectRaised, setProjectRaised] = useState([0]); // [3000, 1000, 2000]

  // money per donators
  const [donatorNames, setDonatorNames] = useState([]); // ['Mustafa', 'Daniel', 'Busayo']
  const [donatorPaid, setDonatorPaid] = useState([]); // [150, 100, 200]

   // views per project
  const [projectViewsNames, setProjectViewsNames] = useState([]); // ['Street Artists', 'GoUkraine', 'ForFood']
  const [projectViews, setProjectViews] = useState([]); // [15, 1, 200]

  const [chartPickedByUser, setChartPickedByUser] = useState('');

  console.log('checking projectsCreated', projectsCreated);
  console.log('checking totalRaised', totalRaised);
  console.log('checking donators', donators);
  console.log('checking views', views);
  console.log('checking data', data);

  const pieData = data.map((el) => {
    return { kind: el.name, share: el.currentAmount };
  });

  //IMPLEMENTING PIE CHART
  ChartJS.register(ArcElement, Tooltip, Legend, Title);
  const dataPieChart = {
    labels: projectNames,
    // labels: [donators],
    datasets: [
      {
        label: '# Target Amount',
        // data: [totalRaised],
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
    labels: ['Donator 1', 'Donator 2', 'Donator 3', 'Donator 4'],
    datasets: [
      {
        label: '# Target Amount',
        data: [300, 80, 1000, 600],
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

  // first load of dashboard
  if (!chartPickedByUser) {
    setProjectNames(data.map((item) => item.title));
    setProjectRaised(data.map((item) => item.currentAmount));
    setChartPickedByUser(dataPieChart);
    console.log('first loading dashboard')
  }

  const handleOnChange = (arg) => {
    let testObj = JSON.parse(arg.target.value);
    setChartPickedByUser(testObj);
  };

  const labelContent = (e) => e.category;

  const reactDonutChartBackgroundColor = ['#00E396', '#FEB019', '#FF4560', '#775DD0'];

  const reactDonutChartInnerRadius = 0.5;
  const reactDonutChartSelectedOffset = 0.04;
  const reactDonutChartHandleClick = (item, toggled) => {
    if (toggled) {
      console.log(item);
    }
  };
  let reactDonutChartStrokeColor = '#FFFFFF';
  const reactDonutChartOnMouseEnter = (item) => {
    let color = pieData.find((q) => q.label === item.label).color;
    reactDonutChartStrokeColor = color;
  };

  useEffect(() => {
    if (fundraisers.length > 0) {
      const filteredFundraisers = fundraisers.filter((item) => item.writer === loginSuccess.userId);
      setData(filteredFundraisers);
    }
    setLoaded(true);
  }, [fundraisers, loginSuccess]);

  useEffect(() => {
    if (loaded) {
      setProjectNames(data.map((item) => item.title));
      setProjectRaised(data.map((item) => item.currentAmount));

      setProjectViewsNames(data.map((item) => item.title));
      setProjectViews(data.map((item) => item.views));


      for (let i = 0; i < data.length; i++) {
        setTotalRaised((prev) => prev + data[i].currentAmount);
        setDonators((prev) => prev + data[i].backers);
        setViews((prev) => prev + data[i].views);
        setProjectsCreated(projectsCreated + data.length);
        setDonatorNames(data[i].prevDonations.map((item) => item.sender))
        setDonatorPaid(data[i].prevDonations.map((item) => item.amount));
      }
    }
  }, [loaded]);

  console.log('donator names', donatorNames);
  console.log('donator amount', donatorPaid);

  // console.log(projectNames.length);
  // if (projectNames.length === 0) {
  //   console.log("I'm in the first if");
  //   setProjectNames([{ name: data[i].title }]);
  //   console.log('after', projectNames.length);
  // } else {
  //   console.log("I'm in the else");
  //   setProjectNames((prevState) => [
  //     ...prevState,
  //     {
  //       name: data[i].title,
  //     },
  //   ]);
  // }

  //**
  //         address: "6 Caliban Mews, CV34 6FS"
  // backers: 3
  // categories: ['humanitarian']
  // comments: []
  // currentAmount: 9000
  // deadlineDate: "2022-05-15T15:50:00.000Z"
  // description: "give food for poor people"
  // image: "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
  // likes: 1
  // location: {type: 'Point', coordinates: Array(2), country: 'US'}
  // prevDonations: (3) [{…}, {…}, {…}]
  // targetAmount: 25000
  // title: "Get food"
  // views: 5
  // writer: "2WWjFhvSuyclY83dsnj3oZYsqHN2"
  // __v: 3
  // _id: "627e53774ce2f6c29ba972c0"
  // [[Prototype]]: Object

  //

  const onClick = (e) => {
    console.log(e);
  };

  if (!data.length) {
    return <div>loading...</div>;
  }

  console.log('names', projectNames);

  return (
    <div
      className="profileContainer"
      style={{ border: 'red 2px solid', padding: '1rem', backgroundColor: 'white' }}
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
          style={{
            flex: '1',
            padding: '10px',
            'border-radius': '5px',
            border: 'black 1px solid',
            gap: '5px',
            margin: '5px 5px',
          }}
        >
          <div className="headerProjects">
            <div className="titleField">
              <span className="projectsText">Projects Created</span>
            </div>
            <div className="dataField">
              <span className="projectsData">{projectsCreated}</span>
            </div>
          </div>
        </div>
        <div
          className="summaryCard"
          style={{
            flex: '1',
            padding: '10px',
            'border-radius': '5px',
            border: 'black 1px solid',
            gap: '5px',
            margin: '5px 5px',
          }}
        >
          <div className="headerTotalRaised">
            <div className="titleField">
              <span className="totalRaisedText">Total Raised</span>
            </div>
            <div className="dataField">
              <span className="moneyData">{totalRaised}$</span>
            </div>
          </div>
        </div>
        <div
          className="summaryCard"
          style={{
            flex: '1',
            padding: '10px',
            'border-radius': '5px',
            border: 'black 1px solid',
            gap: '5px',
            margin: '5px 5px',
          }}
        >
          <div className="headerDonators">
            <div className="titleField">
              <span className="donatorsText">Donators</span>
            </div>
            <div className="dataField">
              <span className="donatorsData">{donators}</span>
            </div>
          </div>
        </div>
        <div
          className="summaryCard"
          style={{
            flex: '1',
            padding: '10px',
            'border-radius': '5px',
            border: 'black 1px solid',
            gap: '5px',
            margin: '5px 5px',
          }}
        >
          <div className="headerViews">
            <div className="titleField">
              <span className="viewsText">Views</span>
            </div>
            <div className="dataField">
              <span className="viewsData">{views}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="projectContentContainer"
        style={{
          border: 'black 1px solid',
          padding: '1rem',
          'margin-top': '30px',
          margin: '5px 5px',
        }}
      >
        <div className="contentTitle">
          <span className="contentTitleField">Your Projects</span>
        </div>
        <div
          className="projectContentDetails"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            border: 'blue 1px solid',
          }}
        >
          {/* <div className="contentLeftDetails"
            style={{ flex: '1', border: 'orange 1px solid', margin: '5px 5px' }}
          >
            <Grid.Row>
              {data.length > 0 ? (
                data.map((dataItem) => <CardItem data={dataItem} />)
              ) : (
                <p>You havent published any data yet</p>
              )}
            </Grid.Row>
          </div> */}
          <div
            className="contentRightCharts"
            style={{
              position: 'relative',
              'margin-left': '0px',
              width: '30%',
              // border: 'orange 1px solid',
              // margin: '5px 5px',
              // width: '40%',
              // height: '100vh',
            }}
          >
            <Grid
              columns={2}
              divided
              style={{ width: '60rem', justify: 'flex-end', margin: 'auto' }}
            >
              <select className="chartInfo" name="chartSelected" onChange={handleOnChange}>
                <option value=""> -- Chart Selection -- </option>
                <option value={JSON.stringify(dataPieChart)}>Amount Raised by Project</option>
                <option value={JSON.stringify(dataPieChart2)}>Amount Raised by Donators</option>
                <option value={JSON.stringify(dataPieChart3)}>Views by Project</option>
              </select>
              <Grid.Row>
                <Grid.Column>
                  <Pie
                    data={chartPickedByUser}
                    options={{
                      cutout: '70%',
                      responsive: true,
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
                      border: 'black 1px solid',
                      // responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Doughnut
                    data={dataPieChart2}
                    style={{
                      // height: '50%',
                      // width: '100%',
                      border: 'black 1px solid',
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
  );
}

export default Dashboard;
