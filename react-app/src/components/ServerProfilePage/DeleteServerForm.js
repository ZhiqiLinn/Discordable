import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'
import { deleteServerThunk } from "../../store/server";
import React, { useState } from 'react';
import { SmallModal } from '../../context/SmallModal';
import './ServerProfile.css'
const DeleteServerForm = ({serverId}) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDeleteSubmit = () => {
        dispatch(deleteServerThunk(serverId));
        history.push('/servers');

    }
    return (
        <>
            
        </>
    )
}

export default DeleteServerForm

