import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCarDetails } from '../../../api/CarDetailService';
import { uploadCarImage } from '../../../api/UserService';
import { CustomContext } from '../../../context/AuthContext';
import { Brands } from '../../../data/Data'

export default function AddCar() {

    const context = CustomContext();

    const navigate = useNavigate();

    const [brands, setBrands] = useState([]);
    const [inputVal, setInputVal] = useState({ model: '', price: '' });
    const [selectOpt, setSelectOpt] = useState({
        brand: '', ownership: '', variant: '', year: '', insurance: ''
    })

    const [images, setImages] = useState([]);

    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(20), (val, index) => year - index);

    const ownerships = ["First Owner", "Second Owner", "Third Owner", "Fourth Owner",]

    useEffect(() => {
        setBrands(Brands);
    }, [])

    function handleInputChange(event) {
        const { name, value } = event.target;
        setInputVal((prev) => {
            return { ...prev, [name]: value };
        })
    }

    function handleSelectChange(event) {
        const { name, text } = event.target;
        setSelectOpt((prev) => {
            return { ...prev, [name]: text };
        })
    }

    function handleImageChange(event) {
        console.log(event.target.files);
        setImages([...event.target?.files]);
    }

    async function handleClick(event) {
        if (inputVal.model.length === 0 || inputVal.price.length === 0 || selectOpt.brand.length === 0 || selectOpt.ownership.length === 0 || selectOpt.variant.length === 0 || selectOpt.year.length === 0) {
            toast.error("Details cannot be empty!!", { position: "top-center" })
            event.preventDefault()
            return;
        }

        const sellerId = context?.user?.id;

        const carData = {
            model: inputVal.model,
            brand: selectOpt.brand,
            ownership: selectOpt.ownership,
            insurance: selectOpt.insurance === "Cleared" ? true : false,
            price: inputVal.price,
            variant: selectOpt.variant,
            year: selectOpt.year
        }

        try {
            const response = await createCarDetails(sellerId, carData);
            console.log(response);
            toast.success("Car details added successfully!!", { position: "top-center" })

            //Uploading images
            const carId = response?.data?.id;
            uploadCarImage(carId, images).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
                toast.error("Error while uploading images!!", { position: "top-center" })
            })
            navigate(`/car/${response.data?.model}`, { state: { carId: carId } })
        } catch (err) {
            console.log(err);
            toast.error("Couldn't add car details!!", { position: "top-center" })
        }
    }

    function handleReset() {
        setInputVal({ model: '', price: '' })
        setImages([])
        setSelectOpt({ brand: '', ownership: '', variant: '', year: '', insurance: '' })
    }

    return (
        <Container fluid="xl">
            <div className='add-car w-100 m-auto'>
                <div className=' w-100 shadow p-3'>
                    <h1 className='fs-1 fw-bold text-center'>Add a car</h1>
                    <Row className='my-2'>
                        <Col md={6} className='my-2'>
                            <Form.Label htmlFor='model'>Model</Form.Label>
                            <Form.Control type="text" placeholder='Enter Model' id="model" name="model" value={inputVal.model} onChange={handleInputChange} />
                        </Col>
                        <Col md={6} className='my-2'>
                            <Form.Label htmlFor='price'>Price</Form.Label>
                            <Form.Control type="number" placeholder='Enter Price' id="price" name="price" value={inputVal.price} onChange={handleInputChange} />
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col md={12} className='my-2'>
                            <Form.Label htmlFor='image'>Upload Car Images</Form.Label>
                            <Form.Control type="file" id='image' name="image" onChange={handleImageChange} multiple />
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col md={4} className="my-2">
                            <Dropdown className='border w-100'>
                                <Dropdown.Toggle className='color-p w-100'>
                                    {!selectOpt.brand ? 'Brand' : selectOpt.brand}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='w-100' style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                                    {brands?.map((brand, index) => (
                                        <Dropdown.Item className='text-dark' name="brand" value={brand} key={index}
                                            onClick={handleSelectChange} >{brand}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md={4} className="my-2">
                            <Dropdown className='w-100'>
                                <Dropdown.Toggle className=' w-100 color-p'>
                                    {!selectOpt.year ? 'Year' : selectOpt.year}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='w-100' style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                                    {years?.map((year, index) => (
                                        <Dropdown.Item className='text-dark' name="year" key={index} onClick={handleSelectChange} >{year}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md={4} className="my-2">
                            <Dropdown className='w-100'>
                                <Dropdown.Toggle className='color-p w-100'>
                                    {!selectOpt.ownership ? 'Ownership' : selectOpt.ownership}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='w-100'>
                                    {ownerships?.map((ownership, index) => (
                                        <Dropdown.Item className='text-dark' name="ownership" key={index} onClick={handleSelectChange} >{ownership}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col md={4} className="my-2">
                            <Dropdown className='w-100'>
                                <Dropdown.Toggle className='color-p w-100'>
                                    {!selectOpt.insurance ? 'Insurance' : selectOpt.insurance}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='w-100'>
                                    <Dropdown.Item className='text-dark' name="insurance" onClick={handleSelectChange}>Cleared</Dropdown.Item>
                                    <Dropdown.Item className='text-dark' name="insurance" onClick={handleSelectChange}>Not Cleared</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md={4} className="my-2">
                            <Dropdown className='w-100' >
                                <Dropdown.Toggle className='color-p w-100'>
                                    {!selectOpt.variant ? 'Variant' : selectOpt.variant}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='w-100'>
                                    <Dropdown.Item className='text-dark' name="variant" onClick={handleSelectChange}>Petrol</Dropdown.Item>
                                    <Dropdown.Item className='text-dark' name="variant" onClick={handleSelectChange}>Diesel</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <div className='w-100 d-flex justify-content-center gap-3 my-4'>
                        <Button variant='secondary' className=' w-50' onClick={handleReset}>Reset</Button>
                        <Button variant='success' className=' w-50' onClick={handleClick}>Add Car</Button>
                    </div>
                </div>
            </div>
        </Container >
    )
}