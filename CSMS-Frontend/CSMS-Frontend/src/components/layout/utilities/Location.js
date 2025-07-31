import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoLocationSharp } from 'react-icons/io5';
import { CustomContext } from '../../../context/AuthContext';
import { Cities } from '../../../data/Data';

export default function Location() {

    const { user } = CustomContext();

    const [location, setLocation] = useState(null);

    const [cities, setCities] = useState([]);

    const [counter, setCounter] = useState(Cities.length / 2);

    useEffect(() => {
        setCities(Cities)
        setLocation(user?.city)
    }, [user?.city])


    return (
        <Dropdown>
            <Dropdown.Toggle className='d-flex align-items-center gap-1 border-0 p-0 m-0' style={{ background: 'transparent' }}>
                <IoLocationSharp size={'1.2rem'} />
                <span className='text-capitalize'>{location || cities[0]}</span>
            </Dropdown.Toggle>

            {
                Cities.length !== 0 && (
                    <Dropdown.Menu className='mt-3' style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                        {
                            cities.filter((_, index) => (index <= counter)).map((city, index) => {
                                return (
                                    <Dropdown.Item key={index} className="text-dark"
                                        onMouseOver={(e) => {
                                            setLocation(e.target.text)
                                        }} >
                                        <span>{city}</span>
                                    </Dropdown.Item>
                                )
                            })
                        }
                        {
                            Cities.length &&
                            <Dropdown.Item className="text-dark" onMouseOver={() => {
                                setCounter(Cities.length)
                            }}>{Cities.length === 24 && ''} </Dropdown.Item>
                        }

                    </Dropdown.Menu>
                )
            }
        </Dropdown >
    )
}