import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

const SmallModalContext = React.createContext();

export function SmallModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])
    
    return (
        <>
            <SmallModalContext.Provider value={value}>
                {children}
            </SmallModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function SmallModal({ onClose, children }) {
    const modalNode = useContext(SmallModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="Small-modal">
            <div id="Small-modal-background" onClick={onClose} />
            <div id="Small-modal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
}