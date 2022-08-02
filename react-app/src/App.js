import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getAllServersThunk } from './store/server';
import { getAllChannelsThunk } from './store/channel';
import { getAllMessagesForChannelThunk } from './store/messages';
import ServersPage from './components/ServersPage';
import ServerDetailPage from './components/ServerDetailPage';
import ServerSideBar from './components/ServersPage/ServerSideBar';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>

      
      <ServerSideBar />
        <Switch>
          <ProtectedRoute path='/servers/:serverId' exact={true} >
            <ServerDetailPage />
          </ProtectedRoute>
          <ProtectedRoute path='/servers' exact={true} >
            <ServersPage />
          </ProtectedRoute>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
