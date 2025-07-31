import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function GetSellerDetails(props) {
    const car = props.car;
    return (
        <Modal show={props.show} onHide={props.toggle}>
            <Modal.Header closeButton>
                <Modal.Title className='text-p'>Seller Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-capitalize'>
                <p>Name : {car?.user?.name}</p>
                <p>Email : {car?.user?.email}</p>
                <p>Phone : {car?.user?.phone}</p>
                <p>City : {car?.user?.city}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.toggle}>
                    Close
                </Button>
                <Button className='color-p' onClick={props.toggle}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
