import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import {joinAServerThunk} from '../../store/joinedServer';
import { Modal } from '../../context/Modal';
import { getAllServersThunk } from '../../store/server';


function JoinServerForm() {
    const {serverId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState({});
    const [joined, setJoined] = useState(false)
    const [owned, setOwned] = useState(false)

    const allServers = Object.values(useSelector(state => state.serverState))
    const userJoinedServersArr = Object.values(sessionUser.userJoinedServers)
    //iterate thourgh all joined server, if this server is joined by the user
    const joinedByUser = userJoinedServersArr.filter(server => serverId == +server.joinedServer_id)
    //iterate through all servers, if this server is owned by the session user
    const ownedByUser = allServers.filter(server => server.user_id == +sessionUser.id)
    const ownedServerIds = ownedByUser.map(server => server.id)

    console.log("session user id", sessionUser.id)
    console.log("server user id", ownedByUser)
    useEffect(()=> {
        if (ownedByUser.includes(serverId)) setOwned(true)
        if (joinedByUser?.length > 0) setJoined(true)
      }, [joinedByUser, ownedByUser])



    const handleCreate = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const payload = {
            member_id:sessionUser.id,
            server_id:serverId
        }
        if (payload && !errors.length) {
            await dispatch(joinAServerThunk(payload))
            // reset();
            setHasSubmitted(false)
            history.push(`/servers/${serverId}`)
        }
    }

    let joinPageJSX;
    if(owned || joined){
        joinPageJSX = (
            <div>
                <h1>
                    You Already joined!!!
                </h1>
                <button onClick={() => history.push(`/servers/${serverId}`)}>Check out Server!</button>

            </div>
        )
    }else{
        joinPageJSX = (

            <div>
                <h1>Join a Server</h1>
                <div>
                    {hasSubmitted && errors &&
                        <div >
                            {errors.map((error, idx) => <div key={idx}> * {error}</div>)}
                        </div>
                    }
                </div>
                <form onSubmit={handleCreate}>
                    <div>
                        <div>INIVITE LINK *</div>
                        <input
                            placeholder='Please enter server ID'
                            type='text'
                            hidden={true}
                            value={serverId}
                        />
                    </div>
                    <div>
                        <button type='submit'>Join</button>
                    </div>
                </form>

            </div>
        )
    }
    useEffect(() => {
            dispatch(getAllServersThunk())
        }, [sessionUser.id]);

    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData();
      }, []);


    // const reset = () => {
    //     setServerId('')
    // }


    return(
        <> 
            {joinPageJSX}
        </>
    )
}

export default JoinServerForm