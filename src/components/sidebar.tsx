import React, { useState } from 'react';
import { Link } from 'react-router-dom'
const Sidebar = ({ isOpen, toggleChatBox }) => {
    const textColor = isOpen ? 'text-primary' : 'text-primary-gray'
    return (
        <div className="sidebar">
            <ul className="sidebar-menu d-flex justify-center align-items-center">
                <li onClick={toggleChatBox}>
                    <Link className="  text-white mr-3" to="/">
                        <div className="text-center">
                            {isOpen ? (
                                <img className="mx-auto" src="/images/chat.svg" width="40" height="40" />
                            ) : (<img className="mx-auto" src="/images/chat_disable.svg" width="40" height="40" />)}
                        </div>
                        <div className={`${textColor} text-sm text-center mx-auto`}>
                            <h6 className='font-light'>
                                Assistant
                            </h6>
                        </div>
                    </Link>
                </li>
                {/* <li>
                    <Link className="  text-white mr-3" to="/">
                        <div className="text-center">
                            <img className="mx-auto" src="/images/cart.svg" width="40" height="40" />
                        </div>
                        <div className="text-sm text-black text-center mx-auto">
                            <h6>
                                Shop
                            </h6>
                        </div>
                    </Link>

                </li> */}
            </ul>
            {/* <ul className="sidebar-menu d-flex justify-center align-items-center">
                <li>
                    <Link className="  text-white mr-3" to="/">
                        <div className="text-center">
                            <img className="mx-auto" src="/images/faq.svg" width="40" height="40" />
                        </div>
                        <div className="text-sm text-black text-center mx-auto">
                            <h6>
                                Faq
                            </h6>
                        </div>
                    </Link>
                </li>
            </ul> */}


        </div>
    );
};

export default Sidebar;
