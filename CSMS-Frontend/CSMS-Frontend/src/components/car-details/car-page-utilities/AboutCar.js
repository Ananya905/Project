import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function AboutCar({ car }) {
    return (
        <ListGroup as="ul">
            <ListGroup.Item action className='text-capitalize'>
                <span>Seller Name : </span>
                <span>{car?.user?.name}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Model Name : <span>{car?.model}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Brand Name : <span>{car?.brand}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Ownership : <span>{car?.ownership}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Price : <span>{car?.price}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Variant : <span>{car?.variant}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Year : <span>{!car?.year ? "Not mentioned" : car?.year}</span>
            </ListGroup.Item>
            <ListGroup.Item action className='text-capitalize'>
                Insurance : <span>{car?.insurance ? "Cleared" : "Not Cleared"}</span>
            </ListGroup.Item>
        </ListGroup>
    )
}
