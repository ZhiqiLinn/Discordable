import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
// import { getAllServersThunk } from './store/server';
// import { getAllChannelsThunk } from './store/channel';
// import { getAllMessagesForChannelThunk } from './store/messages';
import ServersPage from './components/ServersPage';
import ServerDetailPage from './components/ServerDetailPage';
import ServerSideBar from './components/ServersPage/ServerSideBar';
import ServerProfilePage from './components/ServerProfilePage';
import HomePage from './components/HomePage';
import ChannelsSection from './components/ChannelsSection';
import MessagesBox from './components/MessagesBox';
import JoinServerForm from './components/CreateServerLiveModal/JoinServerForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  // const AllChannels = useSelector(state => state.channelState.serverChannels)
  // console.log("test!!!!!!!!!!!!!!",AllChannels)
  // useEffect(() => {
  //   dispatch(getAllChannelsBelongToServer(1))
  // },[])
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
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <ProtectedRoute path='/explore-server' exact={true} >
          <JoinServerForm />
        </ProtectedRoute>

        <Route path='/' exact={true}>
          <NavBar />
          <HomePage/>
        </Route>

        <ProtectedRoute path='/servers/:serverId/profile' exact={true} >
          <ServerProfilePage />
        </ProtectedRoute>

        <ProtectedRoute path='/servers/:serverId/:chanId' exact={true} >
          <MessagesBox />
        </ProtectedRoute>

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
