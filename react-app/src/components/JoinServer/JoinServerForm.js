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


    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData();
      }, []);

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
    // const reset = () => {
    //     setServerId('')
    // }


    return(
        <> 
        <button onClick={() => setShowModal(true)}>join</button>
        {showModal && (
            <div >
                <Modal onClose={() => setShowModal(false)}>
                    <div >
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
                </Modal>
            </div>
            )}
        </>
    )
}

export default JoinServerForm