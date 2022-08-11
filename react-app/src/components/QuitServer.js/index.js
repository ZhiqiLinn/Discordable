import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from 'react-router-dom'
import { quitAServerThunk } from "../../store/joinedServer";
import { SmallModal } from '../../context/SmallModal';
import React, { useState } from 'react';
import './QuitServer.css'

const QuitServer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {serverId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);

    const handleQuit = async (e) => {
        e.preventDefault()
        const payload = {
            server_id:serverId,
            member_id:sessionUser.id
        }
        await dispatch(quitAServerThunk(payload))
        history.push(`/servers`);

    }

    return(
        < >
            <button className="quit-server-btn" onClick={() => setShowModal(true)}> leave </button>
            {showModal && (
                <div>
                    <SmallModal onClose={() => setShowModal(false)}>
                        <div className="quit-server-container">
                            <h2>Please confirm that you would like to quit this server</h2>
                            <div >
                                <button className="btn" onClick={() => setShowModal(false)}>No</button>
                                <br></br>
                                <button className="btn" onClick={handleQuit}>Yes</button>

                            </div>
                        </div>
                    </SmallModal>
                </div>
            )}
        
        </>
    )
}

export default QuitServer