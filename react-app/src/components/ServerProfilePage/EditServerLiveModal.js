import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditServerForm from './EditServerForm';


const EditServerLiveModal = ({serverId}) => {
    const [showModal, setShowModal] = useState(false);
    const hideForm = () => {
        setShowModal(false)
    }
    return (
        <>
            <div  onClick={() => setShowModal(true)} style={{cursor:"pointer"}}> ⚙️ </div>
            {showModal && (
                <div>
                    <Modal onClose={() => setShowModal(false)}>
                        <EditServerForm hideForm={hideForm} serverId={serverId}/>
                    </Modal>
                </div>
            )}
        </>
    )
}
    

export default EditServerLiveModal;