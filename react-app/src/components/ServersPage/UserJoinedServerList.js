import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

function UserJoinedServerList() {
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  console.log("USER LSIT!!!!!!!!!!!!!!!", users)

  const userComponents = users.map((user) => (
  <>
    { user.id === sessionUser.id && 
    <div key={user.id} className="user-joined-server-sidebar">
      {Object.values(user.userJoinedServers).map(server=> (
         <NavLink to={`/servers/${server.joinedServer_id}`}>

          <img className="server-sidebar-round-img" src={server.joinedServer_server_pic} alt={server.joinedServer_name}>
          </img>
        </NavLink>
        ))
      }
    </div>
    }
  </>
  
  ));

  return (
    <>
      {userComponents}
    </>
  );
}

export default UserJoinedServerList
