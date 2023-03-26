import React from 'react'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import SearchUsers from './SearchUsers'
export default function Popup() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Add Member{' '}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Search For Member </Modal.Title>
        </Modal.Header>
        <SearchUsers />
      </Modal>
    </>
  )
}
