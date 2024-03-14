import React from 'react'
import ReactDom from 'react-dom'

const ModelStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: '#34383c',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '80%',
  width: '80%'
}

const OverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OverlayStyles} />
      <div style={ModelStyles}>
        <button className='btn bg-info fs-4' style={{ marginLeft: "92%", marginTop: "-34px" }} onClick={onClose}> X </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}

