import React, { useEffect, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCarDetails, getAllImagesByCarID } from '../../../api/CarDetailService';
import { TOAST_PROP } from '../../../App';
import car2 from '../../../assets/car2.jpg'
import { CustomContext } from '../../../context/AuthContext';
import ConfirmModal from '../../../utilities/ConfirmModal';

export default function CarCard({ car }) {

    const { pathname } = useLocation();

    const { isAuthenticated, user } = CustomContext();

    const [carImages, setCarImages] = useState([]);

    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);

    useEffect(() => {
        getAllImagesByCarID(car?.id).then(res => {
            setCarImages(res.data);
        }).catch(err => {
            console.log(err);
            console.clear();
        })
    }, [car?.id])

    function handleDelete() {
        deleteCarDetails(car?.id).then(res => {
            toast.success("Car delete successfully!!", TOAST_PROP)
        }).catch(err => {
            console.log(err);
            toast.error("Failed to delete car", TOAST_PROP)
        })
    }

    return (
        <div>
            <Card className="w-100">
                <Card.Img variant="top" src={carImages.length === 0 ? car2 : carImages[0] || carImages[1]} style={{ width: '100%', height: '200px', objectFit: 'fill' }} />
                <Card.Body>
                    <div className='text-capitalize d-flex justify-content-between'
                        style={{ fontSize: '1.1rem' }}
                    >
                        <span style={{ fontSize: '1.1rem' }}>{car?.brand}&nbsp;{car?.model}</span>
                        <span>₹{car?.price}</span>
                    </div>
                    <div className='d-flex justify-content-between my-2'>
                        <div className='d-flex flex-column text-capitalize'>
                            <span style={{ fontSize: '0.85rem' }} className='text-s fw-bold'>year</span>
                            <span>{car?.year !== null ? car?.year : "NA"}</span>
                        </div>
                        <div className='d-flex flex-column text-capitalize'>
                            <span style={{ fontSize: '0.85rem' }} className='text-s fw-bold'>Variant</span>
                            <span>{car?.variant}</span>
                        </div>
                    </div>
                    <Link to={`/car/${car?.model}`} state={{ carId: car?.id }}>
                        <Button className={'color-p w-100'}>
                            View Car
                        </Button>
                    </Link>
                    {(isAuthenticated
                        && (car?.user?.name === user?.name)
                        && pathname === "/users/profile"
                    ) && (
                            <>
                                <Button variant='secondary' className='my-2 w-100'
                                    onClick={toggle}>
                                    Delete
                                </Button>
                                <ConfirmModal show={show}
                                    toggle={toggle}
                                    title={"Delete Car"}
                                    body={"Are you sure want to delete this car and its details?"}
                                    action={handleDelete}
                                />
                            </>
                        )
                    }
                </Card.Body>
            </Card>
        </div>
    )
}
