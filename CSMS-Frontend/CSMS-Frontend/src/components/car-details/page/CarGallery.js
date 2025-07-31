import React, { useEffect, useState } from 'react'
import { Accordion, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getAllCarDetails } from '../../../api/CarDetailService';
import { Brands } from '../../../data/Data';
import CarCard from '../car-page-utilities/CarCard';

export default function CarGallery() {

    const [allCars, setAllCars] = useState([]);

    const [cars, setCars] = useState([]);

    const priceFilter = ["Above 300000", "Above 500000", "Above 700000", "Above 800000"];

    const variantFilter = ["Petrol", "Diesel"];

    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(10), (val, index) => year - index);

    useEffect(() => {
        getAllCarDetails().then(res => {
            console.log(res);
            setCars(res.data)
            setAllCars(res.data);
        }).catch(err => {
            toast.error("Error loading cars!!", { position: "top-center" })
        })
    }, [])

    function handleClick(event) {
        const { name, value } = event.target;
        if (name === "Brand") {
            const car = cars.filter(car => car.brand.toLowerCase() === value.toLowerCase())
            if (car.length !== 0) {
                setCars(car)
            }
            else {
                toast.error("No cars found", { position: 'top-center', hideProgressBar: true })
                setTimeout(() => {
                    setCars([...allCars])
                }, 500);
            }
        }
        if (name === "Year") {
            const car = cars.filter(car => car.year === value);
            if (car.length !== 0) {
                setCars(car)
            }
            else {
                toast.error("No cars found", { position: 'top-center', hideProgressBar: true })
                setTimeout(() => {
                    setCars([...allCars])
                }, 500);
            }
        }
        if (name === "Price") {
            const convertedValue = value.split(/\s/)[1];
            const car = cars.filter(car => car.price >= convertedValue);
            if (car.length !== 0) {
                setCars(car)
            }
            else {
                toast.error("No cars found", { position: 'top-center', hideProgressBar: true })
                setTimeout(() => {
                    setCars([...allCars])
                }, 500);
            }
        }
        if (name === "Variant") {
            const car = cars.filter(car => car.variant.toLowerCase() === value.toLowerCase());
            if (car.length !== 0) {
                setCars(car)
            }
            else {
                setCars([...allCars])
                setTimeout(() => {
                    toast.error("No cars found", { position: 'top-center', hideProgressBar: true })
                }, 500);
            }
        }
    }

    return (
        <Container fluid="xl">
            <div className='d-flex justify-content-center mt-3'>
                <Row className='w-100'>
                    {/* Filter section */}
                    <Col md={2} className="">
                        <div className='pt-3 d-flex align-items-center'>
                            <h3 className='w-100'>Filter</h3>
                            <span className='text-s text-decoration-underline'
                                onClick={() => setCars([...allCars])}
                                style={{ cursor: 'pointer' }}>
                                Reset
                            </span>
                        </div>
                        <hr className='pb-2' />
                        <Row>
                            <Col xs={6} md={12}>
                                <FilterComp title={'Year'} array={years} handleClick={handleClick} />
                            </Col>
                            <Col xs={6} md={12}>
                                <FilterComp title={'Price'} array={priceFilter} handleClick={handleClick} />
                            </Col>
                            <Col xs={6} md={12}>
                                <FilterComp title={'Variant'} array={variantFilter} handleClick={handleClick} />
                            </Col>
                            <Col xs={6} md={12}>
                                <FilterComp title={'Brand'} array={Brands} handleClick={handleClick} />
                            </Col>
                        </Row>
                    </Col>
                    {/* display section */}
                    <Col md={10}>
                        <div className='w-100 d-flex justify-content-center'>
                            {cars.length !== 0 ?
                                <Row className='w-100 d-flex justify-content-center'>
                                    {cars.map((car, index) => (
                                        <Col md={4} sm={6} xs={12} className="my-2">
                                            <CarCard car={car} key={index} />
                                        </Col>
                                    ))}
                                </Row>
                                :
                                (<h2>Loding...</h2>)
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

function FilterComp(props) {
    return (
        <Accordion className='my-2' alwaysOpen={false}>
            <Accordion.Item>
                <Accordion.Header>{props.title}</Accordion.Header>
                <Accordion.Body>
                    {props.array.map((element, index) => (
                        <Form.Check key={index} name={props.title} value={element} id={element} type="radio" label={element} onClick={(e) => {
                            props.handleClick(e)
                        }} />
                    ))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
