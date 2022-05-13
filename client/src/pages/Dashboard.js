import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import CardItem from '../components/Card';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from '@progress/kendo-react-charts';
import 'hammerjs';

function Dashboard() {
  const { fundraisers } = useSelector((state) => state.fundraiser);
  const { loginSuccess } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [projectsCreated, setProjectsCreated] = useState(0);
  const [totalRaised, setTotalRaised] = useState(0);
  const [donators, setDonators] = useState(0);
  const [views, setViews] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const pieData = data.map((el) => {
    return { kind: el.name, share: el.currentAmount };
  });

  const labelContent = (e) => e.category;

  // const pieData = {
  //   labels: ['New Users', 'deleted users', 'Active users'],
  //   datasets: [
  //     {
  //       data: [99, 166, 24],
  //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //       hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const reactDonutChartBackgroundColor = [
    '#00E396',
    '#FEB019',
    '#FF4560',
    '#775DD0',
  ];

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
      console.log('fired');
      const filteredFundraisers = fundraisers.filter(
        (item) => item.writer === loginSuccess.userId
      );
      setData(filteredFundraisers);
    }
    console.log(data);
    setLoaded(true);
  }, [fundraisers, loginSuccess]);

  useEffect(() => {
    data.forEach((el) => {
      setTotalRaised((prev) => prev + el.currentAmount);
      setDonators((prev) => prev + el.backers);
      setViews((prev) => prev + el.views);
      setProjectsCreated(projectsCreated + data.length);
      console.log('inside test');
      console.log(data);
    });
  }, [loaded]);

  const onClick = (e) => {
    console.log(e);
  };

  return (
    // <Container></Container>
    <div
      className="profileContainer"
      style={{ border: 'red 2px solid', padding: '1rem' }}
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
          <div
            className="contentLeftDetails"
            style={{ flex: '1', border: 'orange 1px solid', margin: '5px 5px' }}
          >
            <Grid.Row>
              {data.length > 0 ? (
                data.map((dataItem) => <CardItem data={dataItem} />)
              ) : (
                <p>You havent published any data yet</p>
              )}

              {/* // } */}
            </Grid.Row>
          </div>
          <div
            className="contentRightCharts"
            style={{ flex: '1', border: 'orange 1px solid', margin: '5px 5px' }}
          >
            <Chart>
              <ChartSeries>
                <ChartSeriesItem
                  type="donut"
                  data={pieData}
                  categoryField="kind"
                  field="share"
                >
                  <ChartSeriesLabels
                    color="#fff"
                    background="none"
                    content={labelContent}
                  />
                </ChartSeriesItem>
              </ChartSeries>
              <ChartLegend visible={false} />
            </Chart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
