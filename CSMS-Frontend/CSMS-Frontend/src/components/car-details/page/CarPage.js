import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Dropdown, FormControl, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBidding, getAllBiddingsByCarId } from '../../../api/BiddingService';
import { getAllImagesByCarID, getSingleCarDetails } from '../../../api/CarDetailService';
import { TOAST_PROP } from '../../../App';
import { CustomContext } from '../../../context/AuthContext';
import Login from '../../authentication/Login';
import AboutCar from '../car-page-utilities/AboutCar';
import GetSellerDetails from '../car-page-utilities/GetSellerDetails';

export default function Car() {

    const location = useLocation();

    const context = CustomContext();

    const navigate = useNavigate();

    const carId = location.state?.carId;

    const bidPrice = ["500000", "600000", "700000", "800000", "900000", "1000000", "1100000", "1200000"]

    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);

    const [showSellerDetail, setShowshowSellerDetail] = useState(false);

    const toggleSellerDetail = () => setShowshowSellerDetail(!showSellerDetail);

    const [car, setCar] = useState(null);

    const [carImages, setCarImages] = useState([]);

    const [bidInput, setBidInput] = useState('');

    const [carBiddings, setCarBiddings] = useState([]);

    const [isBidded, setIsBidded] = useState(null);

    function loadSingleCarDetails() {
        getSingleCarDetails(carId).then(res => {
            // console.log(res.data);
            setCar(res.data)
        }).catch(err => {
            console.log(err);
            toast.error("Couldn't load car details!!", { position: 'top-center', hideProgressBar: true })
        })
    }

    function loadCarImages() {
        getAllImagesByCarID(carId).then(res => {
            setCarImages(res.data)
        }).catch(err => {
            console.log(err);
            toast.error("Couldn't load image!!", { position: 'top-center', hideProgressBar: true })
        })
    }

    function loadAllBiddingsOfcar() {
        getAllBiddingsByCarId(carId).then(res => {
            // console.log(res.data);
            setCarBiddings(res.data);
        }).catch(err => {
            console.log(err);
            toast.error("Failed to load biddings", TOAST_PROP)
        })
    }

    useEffect(() => {
        //load particular car details and the related images on page load
        loadSingleCarDetails();
        loadCarImages();
        loadAllBiddingsOfcar();
    }, [])

    useEffect(() => {
        loadAllBiddingsOfcar();
    }, [isBidded])

    function submitBidding() {
        const bidData = { bidAmount: bidInput }
        if (car?.user.id === context?.user?.id) {
            toast.error("You cannot bid your own car", { position: "top-center", hideProgressBar: true })
            return;
        } else {
            toast.promise(createBidding(context?.user?.id, carId, bidData), {
                pending: "Submitting...",
                error: "Error occured while bidding!!",
                success: "Bidding added successfully!!"
            }, {
                position: 'top-center',
                hideProgressBar: true
            }).then(res => {
                console.log(res.data);
                setBidInput('');
            }).catch(err => console.log(err))
        }
    }

    return (
        <Container>
            <Row>
                {/* Display Car Images */}
                <Col md={12}>
                    <Carousel fade className='w-100 my-3 bg-dark'>
                        {carImages.map((carImage, index) => (
                            <Carousel.Item key={index} className="d-flex justify-content-center shadow">
                                <img
                                    className="d-block"
                                    src={carImage}
                                    style={{ height: '70vh', width: '60vw', objectFit: 'fill' }}
                                    alt="Car Pic"
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>

                {/* About Car Section */}
                <Col md={12} sm={12} xs={12}>
                    <Row>
                        <Col md={8}>
                            <div className='my-3'>
                                <div className='d-flex justify-content-between align-items-center my-3'>
                                    <h1 className='text-s'>About Car</h1>
                                    <div className='w-25'>
                                        <Button className='color-p w-100 my-2'
                                            onClick={context?.isAuthenticated ? toggleSellerDetail : toggle}>
                                            Get Seller Details
                                        </Button>
                                        {context?.isAuthenticated
                                            ? <GetSellerDetails car={car} show={showSellerDetail} toggle={toggleSellerDetail} />
                                            : <Login show={show} toggle={toggle} />
                                        }
                                    </div>
                                </div>
                                <AboutCar car={car} />
                            </div>
                        </Col>

                        {/* Bidding Section */}
                        <Col md={4}>
                            <div className='my-3 p-1'>
                                <h3>Make An Offer</h3>
                                <div className='my-2'>
                                    <span className='my-2'>Select A Bid Amount</span>
                                    <Dropdown className='w-100 my-2'>
                                        <Dropdown.Toggle className='color-p w-100'>
                                            <span className='w-100' onClick={() => setIsBidded(false)}>{bidInput === "" ? 'Amount' : "₹" + bidInput}
                                            </span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className='w-100 mt-2'>
                                            <div className='d-flex justify-content-center my-2'>
                                                <FormControl
                                                    className='w-75'
                                                    type="number"
                                                    placeholder='₹ Enter an amount'
                                                    value={bidInput}
                                                    onChange={(e) => setBidInput(e.target.value)}
                                                />
                                            </div>
                                            {bidPrice.map((bid, index) => (
                                                <Dropdown.Item key={index}
                                                    className='text-dark' onClick={(e) => {
                                                        setBidInput(bid)
                                                        setIsBidded(false);
                                                    }} as={"span"}>
                                                    ₹{bid}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                        <Button className='btn btn-sm btn-secondary mt-2'
                                            onClick={() => {
                                                context?.isAuthenticated ? submitBidding() : toggle()
                                                setIsBidded(true);
                                            }}>
                                            Submit</Button>
                                        <Login show={show} toggle={toggle} />
                                    </Dropdown><hr />

                                    {/* View Recent Biddings Section */}
                                    <div className='my-3'>
                                        <h5 >Recent Biddings</h5>
                                        {carBiddings?.length !== 0 ?
                                            <div className='mt-3'>
                                                {carBiddings?.slice(0, 2)?.map((bidding, index) => (
                                                    <Card className='my-2' key={index}>
                                                        <div className='d-flex justify-content-between align-items-center px-2'>
                                                            <p className='d-flex flex-column p-1 m-0'>
                                                                <span>Date</span>
                                                                <span>{bidding?.bidDate}</span>
                                                            </p>
                                                            <p className='d-flex flex-column p-1 m-0'>
                                                                <span>Amount</span>
                                                                <span>{"₹" + bidding?.bidAmount}</span>
                                                            </p>
                                                        </div>
                                                    </Card>
                                                ))}
                                                <Button className='color-p mt-1'
                                                    onClick={() => {
                                                        navigate("/bidding/dashboard",
                                                            { state: { car: car, biddings: carBiddings } })
                                                    }}>
                                                    See All Biddings
                                                </Button>
                                            </div>
                                            : <div className='d-flex justify-content-center align-items-center' style={{ height: '15vh' }}>
                                                <h5 className='text-center'>No Biddings</h5>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}