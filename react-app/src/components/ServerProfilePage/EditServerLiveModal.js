import React, { useState } from 'react';
import { MsgModal } from '../../context/MsgModal';
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
                    <MsgModal onClose={() => setShowModal(false)}>
                        <EditServerForm hideForm={hideForm} serverId={serverId}/>
                    </MsgModal>
                </div>
            )}
        </>
    )
}
    

export default EditServerLiveModal;