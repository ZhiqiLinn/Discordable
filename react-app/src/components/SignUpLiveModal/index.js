import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';


const SignupLiveModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div  onClick={() => setShowModal(true)}>SignUp </div>
            {showModal && (
                <div>
                    <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm />
                    </Modal>
                </div>
            )}
        </>
    )
}
    

export default SignupLiveModal;