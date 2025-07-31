import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmModal(props) {
    return (
        <Modal show={props.show} onHide={props.toggle}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    props.toggle()
                    props.action()
                }}>
                    YES
                </Button>
                <Button className='color-p' onClick={props.toggle}>
                    NO
                </Button>
            </Modal.Footer>
        </Modal>
    );
}