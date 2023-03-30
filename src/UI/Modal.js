import React, { Fragment } from 'react'
import  ReactDOM  from 'react-dom'
import modalClasses from './Modal.module.css'

const Backdrop = props => {
    return <div className={modalClasses.backdrop} onClick={props.onClose}/>
}

const ModalOverlay = props => {
    return <div className={modalClasses.modal}>
        <div className={modalClasses.content}>{props.children}</div>
    </div>
}

const Modal = (props) => {
    const portalElement = document.getElementById('overlays')

  return (
    <Fragment>
        {ReactDOM.createPortal(<Backdrop onClick={props.onClose}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement )}
    </Fragment>
  )
}

export default Modal
