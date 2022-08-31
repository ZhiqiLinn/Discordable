import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import {joinAServerThunk} from '../../store/joinedServer';
import { Modal } from '../../context/Modal';
import { getAllServersThunk } from '../../store/server';
import joinPageBackground from './images/joinPageBackground.jpg'

function JoinServerForm() {
    const {serverId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [users, setUsers] = useState({});
    const [joined, setJoined] = useState(false)
    const [owned, setOwned] = useState(false)

    const allServers = Object.values(useSelector(state => state.serverState))
    const userJoinedServersArr = Object.values(sessionUser.userJoinedServers)

    //iterate thourgh all joined server, if this server is joined by the user
    const joinedByUser = userJoinedServersArr.filter(server => serverId == +server.joinedServer_id)
    //iterate through all servers, if this server is owned by the session user
    const ownedByUser = allServers.filter(server => server.user_id == +sessionUser.id)
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
            <div className='already-joined-container'>
                <h1>
                    You Already joined!!!
                </h1>
                <br></br>
                
                <button className="btn" onClick={() => history.push(`/servers/${serverId}`)}>Check out Server!</button>

            </div>
        )
    }else{
        joinPageJSX = (

            <div className='join-confirmation-container'>
                <h1>Do you want to join the server?</h1>
                <div>
                    {hasSubmitted && errors &&
                        <div >
                            {errors.map((error, idx) => <div key={idx}> * {error}</div>)}
                        </div>
                    }
                </div>
                <form onSubmit={handleCreate}>
                    <div>
                        <input
                            placeholder='Please enter server ID'
                            type='text'
                            hidden={true}
                            value={serverId}
                        />
                    </div>
                    <div>
                        <br></br>
                        <button className="btn" type='submit'>Yes</button>
                        <br></br>
                        <button className="btn" onClick={() => history.push('/servers')}>No</button>
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
        <div className='join-page-container' 
            style={{
                backgroundImage:`url(${joinPageBackground})`,
                backgroundSize:'cover',
                }}> 
            {joinPageJSX}
        </div>
    )
}

export default JoinServerForm