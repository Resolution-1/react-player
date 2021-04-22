import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';

const App = () => {
  const code = new URLSearchParams(window.location.search).get('code');

  return <div>{code ? <Dashboard code={code} /> : <Login />}</div>;
};

export default App;
