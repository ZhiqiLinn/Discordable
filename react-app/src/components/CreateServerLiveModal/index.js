import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateServerForm from './CreateServerForm';


const CreateServerLiveModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                <button  onClick={() => setShowModal(true)}>Create </button>
            </div>
            {showModal && (
                <div>
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateServerForm />
                    </Modal>
                </div>
            )}
        </>
    )
}
    

export default CreateServerLiveModal;