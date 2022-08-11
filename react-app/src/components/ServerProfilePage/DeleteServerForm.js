import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'
import { deleteServerThunk } from "../../store/server";
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

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
            <div  onClick={() => setShowModal(true)}> 🗑️ </div>
            {showModal && (
                <div>
                    <Modal onClose={() => setShowModal(false)}>
                    <div >
                        <h1>Please confirm that you would like to delete your server.</h1>
                        <div >
                            <button onClick={() => history.push(`/servers/${serverId}`)}>No</button>
                            <button onClick={handleDeleteSubmit}>Yes</button>
                        </div>
                    </div>
                    </Modal>
                </div>
            )}
        </>
    )
}

export default DeleteServerForm

