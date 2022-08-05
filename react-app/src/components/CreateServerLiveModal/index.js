import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateServerForm from './CreateServerForm';


const CreateServerLiveModal = () => {
    const [showModal, setShowModal] = useState(false);

    const hideForm = () => {
        setShowModal(false)
    }
    
    return (
        <>
            <div>
                <button  onClick={() => setShowModal(true)}> ➕ </button>
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