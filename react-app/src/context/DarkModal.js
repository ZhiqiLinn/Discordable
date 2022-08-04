import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

const DarkModalContext = React.createContext();

export function DarkModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])
    
    return (
        <>
            <DarkModalContext.Provider value={value}>
                {children}
            </DarkModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function DarkModal({ onClose, children }) {
    const modalNode = useContext(DarkModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
}