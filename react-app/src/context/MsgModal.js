import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

const MsgModalContext = React.createContext();

export function MsgModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])
    
    return (
        <>
            <MsgModalContext.Provider value={value}>
                {children}
            </MsgModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function MsgModal({ onClose, children }) {
    const modalNode = useContext(MsgModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="msg-modal">
            <div id="msg-modal-background" onClick={onClose} />
            <div id="msg-modal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
}