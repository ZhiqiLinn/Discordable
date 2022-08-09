import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateServerForm from './CreateServerForm';
import './CreateServer.css'

const CreateServerLiveModal = () => {
    const [showModal, setShowModal] = useState(false);

    const hideForm = () => {
        setShowModal(false)
    }
    
    return (
        <>
            <div>
                <button className="create-join-server-btn" onClick={() => setShowModal(true)}> + </button>
            </div>
            {showModal && (
                <div>
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateServerForm hideForm={hideForm}/>
                    </Modal>
                </div>
            )}
        </>
    )
}
    

export default CreateServerLiveModal;