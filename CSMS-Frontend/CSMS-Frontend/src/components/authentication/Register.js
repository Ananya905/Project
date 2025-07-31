import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createUser, getSingleUser, updateUser, uploadUserProfileImage } from '../../api/UserService'
import { TOAST_PROP } from '../../App'
import { validateRegisterInfo } from '../../validation/validate'
import avatar from '../../assets/avatar.jpg'

export default function Register() {

    const navigate = useNavigate();

    const { state } = useLocation();

    const [inputVal, setInputVal] = useState({
        name: '', email: '', phone: '', address: '', city: '', password: ''
    })

    const [role, setRole] = useState(state?.addRole);

    const [image, setImage] = useState(null);

    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        if (role === "seller") {
            getSingleUser(state?.userId).then(res => {
                const registeredUser = res.data;
                console.log(registeredUser);
                setInputVal({
                    name: registeredUser?.name,
                    email: registeredUser?.email,
                    phone: registeredUser?.phone,
                    address: registeredUser?.address,
                    city: registeredUser?.city,
                    password: registeredUser?.password
                })
            }).catch(err => {
                console.log(err);
            })
        } else return;
    }, [])

   function handleChange(event){
    setInputVal((prevVal) => {
      return { ...prevVal, [event.target.name]: event.target.value };
    });
  };

    function handleImageChange(event) {
        setImage(event.target.files[0])
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0] || avatar)
        fileReader.onload = () => {
            setProfilePic(fileReader.result);
        }
    }

    const handleClick = () => {
        if (!validateRegisterInfo(inputVal)) {
            return;
        }

        const userData = {
            name: inputVal.name,
            email: inputVal.email,
            password: inputVal.password,
            address: inputVal.address,
            city: inputVal.city,
            phone: inputVal.phone
        }

        if (role === "seller") {
            //updating user to add seller role
            updateUser(state?.userId, userData, role)
                .then(res => {
                    //remove the existing user data from localStorage and set new updated user data
                    localStorage.removeItem("user");
                    localStorage.setItem("user", JSON.stringify(res.data));
                    toast.success("Updated successfully!!", TOAST_PROP)
                    navigate("/add-car")
                }).catch(err => {
                    console.log(err)
                    toast.error("Something went wrong!! Try again later", TOAST_PROP)
                })
        } else {
            //for creating user
            createUser(userData).then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                console.log(res.data);
                uploadUserProfileImage(res.data?.id, image).catch(err => {
                    console.log(err);
                })
                toast.success("You are signed in Successfully... WELCOME!!", { position: 'top-center' })
                navigate("/")
            }).catch(err => {
                console.log(err);
                toast.error("Couldn't register user...", { position: 'top-center' })
            })
        }

    }

    return (
        <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='text-center my-3 text-p'>
                {role === "seller" ? "Confirm your Details" : 'Sign Up'}
            </h1>
            <Form className='w-75 py-3'>
                <Row>
                    <Col className='profile my-2'>
                        <div className='w-100 d-flex justify-content-center align-items-center'>
                            <label htmlFor="profile" style={{ cursor: 'pointer' }}>
                                <Image src={profilePic || avatar} className="rounded-circle" style={{ width: '10rem', maxHeight: '10rem', overflow: 'hidden' }} />
                            </label>
                            <input type='file' id="profile" onChange={handleImageChange} style={{ display: 'none' }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control name="name" id="name" type='text' placeholder='Enter your name' onChange={handleChange} value={inputVal.name} />
                    </Col>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control name="email" id="email" type='email' placeholder='Enter email' onChange={handleChange} value={inputVal.email} />
                    </Col>
                </Row>

                <Row>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="phone">Phone</Form.Label>
                        <Form.Control name="phone" id="phone" type='number' placeholder='Enter phone' onChange={handleChange} value={inputVal.phone} />
                    </Col>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="address">Address</Form.Label>
                        <Form.Control name="address" id="address" type='text' placeholder='Enter address' onChange={handleChange} value={inputVal.address} />
                    </Col>
                </Row>

                <Row>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="city">City</Form.Label>
                        <Form.Control name="city" id="city" type='text' placeholder='Enter city' onChange={handleChange} value={inputVal.city} />
                    </Col>
                    <Col md={6} xs={12} className='my-2'>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control name="password" id="password" type='password' placeholder='Enter password' onChange={handleChange} value={inputVal.password} />
                    </Col>
                </Row>
                <span className='d-flex justify-content-center mt-4'>
                    <Button color='color-p' className=' color-p w-50' onClick={handleClick}>
                        {role === "seller" ? "Confirm" : 'Register'}
                    </Button>
                </span>
                {
                    role !== "seller" && <div className='text-center mt-4'>Already registered? Then Login!!</div>
                }
            </Form>
        </div>
    )
}
