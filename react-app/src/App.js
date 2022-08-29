import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

import ServersPage from './components/ServersPage';
import ServerDetailPage from './components/ServerDetailPage';
// import ServerProfilePage from './components/ServerProfilePage';
import HomePage from './components/HomePage';
import MessagesBox from './components/MessagesBox';
import JoinServerForm from './components/JoinServer/JoinServerForm';
import LoginForm from './components/LoginLiveModal/LoginForm';
import SignUpForm from './components/SignUpLiveModal/SignUpForm';
import QuitServer from './components/QuitServer.js';
import ExploreServers from './components/JoinServer/ExploreServers';
import ServerSideBar from './components/ServersPage/ServerSideBar';
import { getAllServersThunk } from './store/server';
import { getAllChannelsThunk } from './store/channel';
import { getAllMessagesForChannelThunk } from './store/messages';
import Chat from './components/MessagesBox/Chat';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  const allServers = useSelector(state => state.serverState)

  useEffect(() => {
    dispatch(getAllChannelsThunk())
    dispatch(getAllServersThunk())
  },[])
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
      <Switch>

      <ProtectedRoute path='/servers/:serverId/:chanId/chat' exact={true} >
          <Chat />
        </ProtectedRoute>

        <ProtectedRoute path='/servers/join' exact={true} >
          <ExploreServers />
        </ProtectedRoute>

        <Route path='/' exact={true}>
          <NavBar />
          <HomePage/>
        </Route>

        <Route path='/login' exact={true}>
          <NavBar />
          <LoginForm/>
        </Route>

        <Route path='/signup' exact={true}>
          <NavBar />
          <SignUpForm/>
        </Route>

        <ProtectedRoute path='/servers/:serverId/join' exact={true} >
          <JoinServerForm />
        </ProtectedRoute>

        <ProtectedRoute path='/servers/:serverId/quit' exact={true} >
          <QuitServer />
        </ProtectedRoute>

        {/* <ProtectedRoute path='/servers/:serverId/profile' exact={true} >
          <ServerProfilePage />
        </ProtectedRoute> */}

        <ProtectedRoute path='/servers/:serverId/:chanId' exact={true} >
          <MessagesBox />
        </ProtectedRoute>

        <ProtectedRoute path='/servers/:serverId' exact={true} >
        <ServerDetailPage allServers={allServers}/>
        </ProtectedRoute>

        <ProtectedRoute path='/servers' exact={true} >
          <ServerSideBar />
          <ServersPage />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
