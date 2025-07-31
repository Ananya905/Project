import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Image, Card, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllCarsByUserId } from '../../api/CarDetailService';
import { TOAST_PROP } from '../../App';
import { CustomContext } from '../../context/AuthContext';
import CarCard from '../car-details/car-page-utilities/CarCard';
import avatar from '../../assets/avatar.jpg'
import { BASE_URL, deleteUser } from '../../api/UserService';
import axios from 'axios';
import ConfirmModal from '../../utilities/ConfirmModal';

export default function UserProfile() {

  const { user } = CustomContext();

  const [cars, setCars] = useState([]);

  const [profilePic, setProfilePic] = useState(null);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const userRole = user?.roles?.filter(role => role.id !== 601)[0];

  const role = userRole?.role;

  useEffect(() => {
    (role === "ROLE_SELLER") &&
      getAllCarsByUserId(user?.id).then(res => {
        setCars(res.data)
      }).catch(err => {
        console.log(err);
        toast.error("Failed to load car details!!", TOAST_PROP);
      })
  }, [role])

  useEffect(() => {
    const url = `${BASE_URL}/users/${user?.id}/download/image`
    axios.get(url).then(res => {
      setProfilePic(url)
    }).catch(err => {
      console.clear()
      setProfilePic(avatar);
    })
  }, [user?.id])

  function handleDelete() {
    deleteUser(user?.id).then(res => {
      toast.success("Account deleted successfully....")
    }).catch(err => {
      console.log(err);
      toast.error("Failed to delete your account..")
    })
  }

  return (
    <Container className="mt-4">
      <Row className={(role !== "ROLE_SELLER") && 'd-flex justify-content-center align-items-center flex-column'}>
        <Col md={(role === "ROLE_SELLER") ? 4 : 6}>
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
            {/* <div className='d-flex justify-content-between px-2'>
              <Button className='color-p'>Update Account</Button>
              <Button variant="secondary" onClick={toggle}>Delete Account</Button>
              <ConfirmModal show={show}
                toggle={toggle}
                title={"Delete Account"}
                body={"Are you sure want to delete your account"}
                action={handleDelete}
              />
            </div> */}
          </Card>
        </Col>
        {(role === "ROLE_SELLER") && (
          <Col md={8}>
            <h3 className="mb-4 text-p">My Listings</h3>
            <Row className='m-0'>
              {(cars?.length !== 0) ?
                <>
                  {cars.map((car, index) => (
                    <Col md={6} sm={6} xs={12} key={index} >
                      <CarCard car={car} />
                    </Col>
                  ))
                  }
                </>
                : (
                  <div className='d-flex justify-content-center align-items-center flex-column' style={{ height: '90vh' }}>
                    <h3>No cars Posted</h3>
                    <div>
                      <Link to="/add-car" className='text-success text-decoration-underline'>Click Here</Link>
                      <span>&nbsp;to sell a car!!</span>
                    </div>
                  </div>
                )
              }
            </Row>
          </Col>
        )}
      </Row>
    </Container >
  );
}
