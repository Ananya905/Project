import React, { useRef, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CustomContext } from '../../../context/AuthContext';
import Login from '../../authentication/Login';
import CarCard from '../car-page-utilities/CarCard'
import GetSellerDetails from '../car-page-utilities/GetSellerDetails';

export default function BiddingDashBoard() {

    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);

    const navigate = useNavigate();

    const context = CustomContext();

    const { state } = useLocation();

    const car = useRef(state?.car).current;

    const biddings = useRef(state?.biddings).current;

    const userRole = context?.user?.roles?.filter(role => role.id !== 601)[0];

    const role = userRole?.role;

    if (car === undefined || car === null || biddings === null) navigate("/car-gallery")

    console.log(role);

    return (
        <>
            <Row className='p-0 m-0'>
                <h1 className='text-center mt-3'>Bidding Dashboard</h1>
                <Col md={4} className="d-flex flex-column justify-content-center align-items-center" >
                    <div className='shadow'>
                        <CarCard car={car} />
                    </div>
                </Col>

                <Col md={8} className="">
                    <div className='my-3 w-100 d-flex justify-content-end'>
                        {context.isAuthenticated
                            ? <GetSellerDetails car={car} show={show} toggle={toggle} />
                            : <Login show={show} toggle={toggle} />
                        }
                        <Button variant="secondary" onClick={toggle}>Get Seller Details</Button>
                    </div>

                    <div className='shadow-sm rounded' style={{ height: '60vh', overflowY: "scroll" }}>
                        {biddings?.map((bidding, index) => (
                            <Card className='p-2 my-3' key={index}>
                                <Row className='d-flex justify-content-between align-items-center text-capitalize m-0'>
                                    <Col xs={6} md={3} className='d-flex flex-column align-items-start gap-2 my-2'>
                                        {(role === "ROLE_SELLER")
                                            ? <Link to="/bidder/details" state={{ userId: bidding.user?.id }}>
                                                <span className='text-s text-decoration-underline'>Bidder</span>
                                            </Link>
                                            : <span className='text-s'>Bidder</span>
                                        }
                                        <span className=''>{bidding?.user?.name}</span>
                                    </Col>
                                    <Col xs={6} md={3} className='d-flex flex-column align-items-md-start align-items-end gap-2 my-2'>
                                        <span>Bid Date</span>
                                        <span>{bidding?.bidDate}</span>
                                    </Col>
                                    <Col xs={6} md={3} className='d-flex flex-column align-items-start gap-2 my-2'>
                                        <span className='text-s'>Last Date</span>
                                        <span>{bidding?.lastDate}</span>
                                    </Col>
                                    <Col xs={6} md={3} className='d-flex flex-column align-items-end gap-2 my-2'>
                                        <span>Bid Amount</span>
                                        <span>{"₹" + bidding?.bidAmount}</span>
                                    </Col>
                                </Row>
                            </Card>
                        ))
                        }
                    </div>
                </Col>
            </Row>
        </>
    )
}
