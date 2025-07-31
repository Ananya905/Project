import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BiLogOut } from 'react-icons/bi'
import { FaRegUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CustomContext } from '../../../context/AuthContext'
import Logout from '../../authentication/Logout'

export default function UserProfileDropdown() {

    const context = CustomContext();

    const [logoutModal, setLogoutModal] = useState(false);

    const toggleLogoutModal = () => setLogoutModal(!logoutModal);

    return (
        <div className='user-profile-dropdown'>
            <Dropdown>
                <Dropdown.Toggle className='btn-s'>
                    <FaRegUserCircle size={'1.8rem'} />
                </Dropdown.Toggle>

                <Dropdown.Menu align={"end"}>
                    <Dropdown.Item as={Link} to={'/users/profile'} className='text-p'>
                        <span>Profile </span>
                        <span className='text-capitalize'>({context?.user?.name})</span>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={"/users/bidding"} className="text-p">
                        My Biddings
                    </Dropdown.Item>
                    <Dropdown.Item as={"span"}
                        className='text-p d-flex gap-1 align-items-center'
                        onClick={toggleLogoutModal}
                    >
                        <span>Logout</span>
                        <BiLogOut size={'1.1rem'} />
                        <Logout toggle={toggleLogoutModal} show={logoutModal} />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
