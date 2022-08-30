import React, {  useState } from 'react';
import { useDispatch} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { deleteMessageThunk } from '../../store/messages';
import { SmallModal } from '../../context/SmallModal';


const DeleteMessageModal = ({msgId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {serverId, chanId} = useParams();
    const [showModal, setShowModal] = useState(false);
    // console.log("msgiod",msgId)
    const handleDeleteSubmit = () => {
        dispatch(deleteMessageThunk(msgId))
        history.push(`/servers/${serverId}/${chanId}`);

    }



    return (
        <>
            <span  onClick={() => setShowModal(true)}> <i className="fa-solid fa-trash-can" style={{cursor:"pointer"}}></i> </span>
            {showModal && (
                <div>
                    <SmallModal onClose={() => setShowModal(false)}>
                        <div className='delete-message-container'>
                            <h2>Please confirm that you would like to delete your message</h2>
                            <div >
                                <button className='btn' onClick={() => setShowModal(false)}>No</button>
                                <br></br>
                                <button className='btn' onClick={handleDeleteSubmit}>Yes</button>
                            </div>
                        </div>
                    </SmallModal>
                </div>
            )}
        </>
    )
}
    

export default DeleteMessageModal;