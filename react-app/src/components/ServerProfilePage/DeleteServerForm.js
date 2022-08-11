import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'
import { deleteServerThunk } from "../../store/server";
import React, { useState } from 'react';
import { SmallModal } from '../../context/SmallModal';
import './ServerProfile.css'
const DeleteServerForm = ({serverId}) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDeleteSubmit = () => {
        dispatch(deleteServerThunk(serverId));
        history.push('/servers');

    }
    return (
        <>
            <div  onClick={() => setShowModal(true)} style={{cursor:"pointer"}}> 🗑️ </div>
            {showModal && (
                <div>
                    <SmallModal onClose={() => setShowModal(false)}>
                    <div className='delete-server-container'>
                        <h2>Please confirm that you would like to delete your server.</h2>
                        <div >
                            <button className='btn' onClick={() => setShowModal(false)}>No</button>
                            <br></br>
                            <button className='btn' onClick={handleDeleteSubmit}>Yes</button>
                        </div>
                    </div>
                    </SmallModal>
                </div>
            )}
        </>
    )
}

export default DeleteServerForm

