import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomContext } from '../../context/AuthContext';

export default function Logout(props) {
    const context = CustomContext();
    return (
        <>
            <Modal show={props.show} onHide={props.toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure ant to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => {
                            props.toggle();
                            context.logout();
                        }}
                    >
                        YES
                    </Button>
                    <Button className='color-p' onClick={props.toggle}>
                        NO
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}