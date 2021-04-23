import React from 'react';
import './dashboard.scss';
import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import useAuth from '../../useAuth';
import axios from 'axios';

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  return (
    <Container>
      <div>{code}</div>
    </Container>
  );
};

export default Dashboard;
