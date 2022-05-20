import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import 'hammerjs';
import { fetchUserCreatedFundraisers } from '../services/fundraisers-services';

export function DashboardHeader({ loading, setLoading }) {
  const { fundraisers } = useSelector((state) => state.fundraiser);
  const { loginSuccess } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // need on header
  const [projectsCreated, setProjectsCreated] = useState(0);
  const [totalRaised, setTotalRaised] = useState(0);
  const [donators, setDonators] = useState(0);
  const [views, setViews] = useState(0);

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
      for (let i = 0; i < data.length; i++) {
        setTotalRaised((prev) => prev + data[i].currentAmount);
        setDonators((prev) => prev + data[i].backers);
        setViews((prev) => prev + data[i].views);
        setProjectsCreated(projectsCreated + data.length);;
      }
    }
  }, [loaded]);

  return (
    <>
      <div className="summaryHeaderContainer"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          className="summaryCard"
          style={{}}
        >
          <div className="headerProjects">
            <div className="titleField">
              <span
                className="projectsData"
                style={{
                  display: 'table',
                  margin: 'auto',
                  fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                  fontSize: '1.8em',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                <Icon
                  name="small tasks"
                  style={{
                    'margin-left': '3px',
                  }}
                />
                {projectsCreated}
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
          style={{}}
        >
          <div className="headerTotalRaised">
            <div className="titleField">
              <span
                className="projectsData"
                style={{
                  display: 'table',
                  margin: 'auto',
                  fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                  fontSize: '1.8em',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                <Icon
                  name="small money bill alternate outline"
                  style={{
                    'margin-left': '3px',
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
          style={{}}
        >
          <div className="headerDonators">
            <div className="titleField" style={{ textAlign: 'center' }}>
              <span
                className="projectsData"
                style={{
                  display: 'table',
                  margin: 'auto',
                  fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                  fontSize: '1.8em',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                <Icon
                  name="small users"
                  style={{
                    'margin-left': '3px',
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
          style={{}}
        >
          <div className="headerViews">
            <div className="titleField" style={{ textAlign: 'center' }}>
              <span
                className="projectsData"
                style={{
                  display: 'table',
                  margin: 'auto',
                  fontFamily: '"Trebuchet MS", Verdana, sans-serif',
                  fontSize: '1.8em',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                <Icon
                  name="small eye"
                  style={{
                    'margin-left': '3px',
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
    </>
  )
}
