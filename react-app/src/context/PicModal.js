import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

const PicModalContext = React.createContext();

export function PicModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])
    
    return (
        <>
            <PicModalContext.Provider value={value}>
                {children}
            </PicModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function PicModal({ onClose, children }) {
    const modalNode = useContext(PicModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="picmodal">
            <div id="picmodal-background" onClick={onClose} />
            <div id="picmodal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
}