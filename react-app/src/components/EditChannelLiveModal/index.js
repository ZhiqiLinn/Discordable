import React, { useState } from 'react';
import { SmallModal } from '../../context/SmallModal';
import EditChannelForm from './EditChannelForm';


const EditChannelLiveModal = ({channel}) => {
    const [showModal, setShowModal] = useState(false);
    const hideForm = () => {
        setShowModal(false)
    }
    return (
        <>
            <span  onClick={() => setShowModal(true)} style={{cursor:"pointer"}}>⚙️</span>
            {showModal && (
                <div>
                    <SmallModal onClose={() => setShowModal(false)}>
                        <EditChannelForm channel={channel} hideForm={hideForm}/>
                    </SmallModal>
                </div>
            )}
        </>
    )
}
    

export default EditChannelLiveModal;