import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { BASE_URL, getSingleUser } from '../../../api/UserService';
import avatar from '../../../assets/avatar.jpg'

export default function GetBidderDetails(props) {

    const { state } = useLocation();

    const [user, setUser] = useState(null);

    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        getSingleUser(state?.userId).then(res => {
            setUser(res.data)
        }).catch(err => {
            console.log(err);
        })


        const url = `${BASE_URL}/users/${state?.userId}/download/image`
        axios.get(url).then(res => {
            setProfilePic(url)
        }).catch(err => {
            console.clear()
            setProfilePic(avatar);
        })
    }, [state?.userId])

    console.log(user);

    return (

        <Container className="mt-4">
            <Row className={'d-flex justify-content-center align-items-center flex-column'}>
                <Col md={6}>
                    <Card className="mb-4 p-3 shadow-sm">
                        <div className="d-flex flex-column align-items-center">
                            <div className='profile'>
                                <Image src={profilePic || avatar} className="rounded-circle shadow-sm" style={{ width: '180px', maxHeight: '180px', overflow: 'hidden' }} alt="Profile Picture" />
                            </div>
                            <h4 className="text-center text-capitalize mt-2 text-s">{user?.name}</h4>
                        </div>
                        <Card.Body>
                            <h5 className="mb-3 text-s">Account Information</h5>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Phone:</strong> {user?.phone}</p>
                            <p className='text-capitalize'><strong >Address:</strong> {user?.address}</p>
                            <p className='text-capitalize'><strong >City:</strong> {user?.city}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    )
}
