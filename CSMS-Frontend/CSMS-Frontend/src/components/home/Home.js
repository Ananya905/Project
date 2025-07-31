import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { getAllCarDetails } from '../../api/CarDetailService';
import HomeCarPic from '../../assets/car.jpg'
import CarCard from '../car-details/car-page-utilities/CarCard'

export default function Home() {

    const navigate = useNavigate();

    const [cars, setCars] = useState([]);

    useEffect(() => {
        getAllCarDetails().then(res => {
            setCars(res.data)
        }).catch(err => {
            toast.error("Failed to load cars!!", {
                position: 'top-center',
                hideProgressBar: true
            })
        })
    }, [])
    return (
        <div>
            <section className='hero-section position-relative d-flex justify-content-end align-items-center mt-5'>
                <div className='text-light mx-3 text-capitalize tracking-in-expand' style={{ width: '26rem', fontSize: '3.5rem' }}>
                    <h1 className="">Find the right car for you !! </h1>
                    <div className='w-100 d-flex justify-content-start'>
                        <Button className='p-3 color-p puff-in-center' onClick={() => navigate("/car-gallery")}>Browse Here</Button>
                    </div>
                </div>
            </section>


            {/* About Section */}
            <section id="about" className="py-3">
                <Container fluid>
                    <Row className=''>
                        <Col md={6} className='d-flex justify-content-center flex-column px-5'>
                            <h2 className='pb-3 fw-bold'>About Us</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ut quam! Natus facilis aliquam nobis doloribus eos harum, nostrum quisquam eum ipsam, maiores soluta provident labore. Possimus quia facere voluptatibus quae recusandae officiis, autem natus odit qui blanditiis? Sapiente rem saepe, molestiae quaerat quod tenetur eum dolorem sit repellendus iure mollitia fuga aperiam eos itaque, optio dicta cupiditate. Repellendus, aperiam.
                            </p>
                        </Col>
                        <Col md={6} className="d-flex justify-content-center p-0">
                            <div className=''>
                                <img src={HomeCarPic} alt="About Us" className=" shadow img-fluid"
                                    style={{ borderRadius: '50%' }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Recent cars display section */}
            <section className='recent-cars'>
                <h2 className='fw-bolder ms-5 my-3'>Recent Cars</h2>
                <Container fluid={'xl'}>
                    <Row className='w-100 m-0 p-4'>
                        {cars?.slice(0, 3)?.map((car, index) => (
                            <Col lg={4} md={4} sm={6} xs={12} key={index} className="my-2">
                                <CarCard car={car} />
                            </Col>
                        ))}
                    </Row>
                    <Link to="/car-gallery">
                        <Button className='mt-2 mb-4 color-p'>View All Cars</Button>
                    </Link>
                </Container>
            </section>
        </div>
    )
}
