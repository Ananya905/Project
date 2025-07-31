import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { CustomContext } from '../../context/AuthContext'
import { deleteBidding, getAllBiddingsByUserId } from '../../api/BiddingService'
import { toast } from 'react-toastify';
import { TOAST_PROP } from '../../App';
import { Link } from 'react-router-dom';
import ConfirmModal from '../../utilities/ConfirmModal';

export default function UserBiddingDashboard() {

  const context = CustomContext();

  const [biddings, setBiddings] = useState([]);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  useEffect(() => {
    getAllBiddingsByUserId(context?.user?.id).then(res => {
      setBiddings(res.data)
    }).catch(err => {
      console.log(err);
      toast.error("Error loading biddings!!", TOAST_PROP)
    })
  }, [])

  function handleDelete(id) {
    toast.promise(deleteBidding(id), {
      pending: "Deleting...",
      success: "Bidding deleted successfully...",
      error: "Error while removing the bidding"
    }, { position: "top-center", hideProgressBar: true })
    const newBiddings = biddings.filter(bidding => bidding.id !== id);
    setBiddings([...newBiddings]);
  }

  return (
    <Container>
      <div className='my-2 p-2'>
        {
          biddings?.length !== 0 ? (
            <>
              <h1>Your Biddings</h1>
              <div>
                {
                  biddings?.map((bidding, index) => (
                    <Card className='p-2 my-3' key={index}>
                      <Row className='d-flex justify-content-between align-items-center'>
                        <Col xs={6} md={3} className='my-2 d-flex flex-column gap-2'>
                          <span className='text-s'>Bid Date</span>
                          <span>{bidding?.bidDate}</span>
                        </Col>
                        <Col xs={6} md={3} className='my-2 d-flex flex-column gap-2 align-items-end align-items-md-start'>
                          <span className='text-p'>Last Date</span>
                          <span>{bidding?.lastDate}</span>
                        </Col>
                        <Col xs={6} md={3} className='my-2 d-flex flex-column gap-2'>
                          <span className='text-s'>Bid Amount</span>
                          <span>{"₹" + bidding?.bidAmount}</span>
                        </Col>
                        <Col xs={6} md={3} className='my-2 d-flex flex-column align-items-end'>
                          <Button className='color-p' onClick={toggle}>Delete</Button>
                          <ConfirmModal
                            show={show}
                            toggle={toggle}
                            title={"Delete Bidding"}
                            body={"Are you sure want to delete this bidding?"}
                            action={() => handleDelete(bidding?.id)}
                          />
                        </Col>
                      </Row>
                    </Card>
                  ))
                }
              </div>
            </>
          ) : (
            <div className='d-flex justify-content-center align-items-center flex-column' style={{ minHeight: '90vh' }}>
              <h1>No Biddings</h1>
              <span>
                <Link to="/car-gallery" className='text-success text-decoration-underline'>
                  Click Here
                </Link>
                &nbsp;to bid a car
              </span>
            </div>
          )
        }
      </div>
    </Container>
  )
}
