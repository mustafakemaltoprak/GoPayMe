import React, { useState, useEffect } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import CardItem from '../components/Card';
import { useSelector } from 'react-redux';
// import { Doughnut } from 'react-chartjs-2';
// import {Chart} from '@progress/kendo-react-charts';
// import { xorBy } from 'lodash';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import 'hammerjs';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { fetchUserCreatedFundraisers } from '../services/fundraisers-services';
import { DashboardHeader } from '../components/DashboardHeader';
import { DashboardCharts } from '../components/DashboardCharts';

function Dashboard() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (

        <div
          className="profileContainer"
          style={{
            padding: '1rem',
            backgroundColor: '#FBFBFF',
            marginTop: '3rem',
            'border-radius': '40px',
          }}
        >
          <DashboardHeader loading={loading} setLoading={setLoading}></DashboardHeader>
          <DashboardCharts loading={loading} setLoading={setLoading}></DashboardCharts>
        </div>
      )}
    </>
  );
}

export default Dashboard;
