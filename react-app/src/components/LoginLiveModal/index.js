import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


const LoginLiveModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                <button  onClick={() => setShowModal(true)}>Login </button>
            </div>
            {showModal && (
                <div>
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm />
                    </Modal>
                </div>
            )}
        </>
    )
}
    

export default LoginLiveModal;