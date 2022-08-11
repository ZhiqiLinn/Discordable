import React, { useEffect, useState } from 'react';
import { SmallModal } from '../../context/SmallModal';
import CreateChannelForm from './CreateChannelForm';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getServerThunk } from "../../store/server";

const CreateChannelLiveModal = ({sessionUser}) => {
    const dispatch = useDispatch();
    const {serverId} = useParams();
    const [showModal, setShowModal] = useState(false);
    const currentServer = useSelector(state => state.serverState[serverId])
    const hideForm = () => {
        setShowModal(false)
    }

    useEffect(() => {
        dispatch(getServerThunk(serverId))
        // dispatch(getAllChannelsByServerThunk(serverId))
    },[dispatch, serverId])

    return (
        <>
            <div className='create-channel-container'>
                <div className='create-channel-divs' onClick={() => setShowModal(true)}>
                    <div className='text-channel' >
                    <i className="fa-solid fa-caret-down" style={{cursor:"pointer"}}></i>  TEXT CHANNEL
                    </div>
                    { sessionUser.id === currentServer.user_id &&
                        <div>
                            <i className="fa-solid fa-plus" style={{cursor:"pointer"}}></i>
                        </div>
                    }
                </div>
            </div>
            {showModal &&  sessionUser.id === currentServer.user_id && (
                <div>
                    <SmallModal onClose={() => setShowModal(false)} >
                        <CreateChannelForm hideForm={hideForm}/>
                    </SmallModal>
                </div>
            )}
        </>
    )
}
    

export default CreateChannelLiveModal;