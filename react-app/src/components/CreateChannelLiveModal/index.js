import React, { useState } from 'react';
import { DarkModal } from '../../context/DarkModal';
import CreateChannelForm from './CreateChannelForm';


const CreateChannelLiveModal = () => {
    const [showModal, setShowModal] = useState(false);
    const hideForm = () => {
        setShowModal(false)
    }
    return (
        <>
            <div className='create-channel-container'>
                <div className='create-channel-divs' onClick={() => setShowModal(true)}>
                    <div className='text-channel' >
                    <i class="fa-solid fa-caret-down"></i>  TEXT CHANNEL
                    </div>
                    <div>
                    <i class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
            {showModal && (
                <div>
                    <DarkModal onClose={() => setShowModal(false)} >
                        <CreateChannelForm hideForm={hideForm}/>
                    </DarkModal>
                </div>
            )}
        </>
    )
}
    

export default CreateChannelLiveModal;