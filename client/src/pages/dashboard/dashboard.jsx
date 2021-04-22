import React from 'react';
import './dashboard.scss';
import useAuth from '../../useAuth';

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  return (
    <div>
      <div>{code}</div>
    </div>
  );
};

export default Dashboard;
