import React, { useState } from 'react';
import { DarkModal } from '../../context/DarkModal';
import EditChannelForm from './EditChannelForm';


const EditChannelLiveModal = ({channel}) => {
    const [showModal, setShowModal] = useState(false);
    const hideForm = () => {
        setShowModal(false)
    }
    return (
        <>
            <span  onClick={() => setShowModal(true)}>⚙️</span>
            {showModal && (
                <div>
                    <DarkModal onClose={() => setShowModal(false)}>
                        <div></div>
                        <EditChannelForm channel={channel} hideForm={hideForm}/>
                    </DarkModal>
                </div>
            )}
        </>
    )
}
    

export default EditChannelLiveModal;