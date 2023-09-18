import React, { useState } from 'react';

const Sidebar = () => {

    return (
        <div className="sidebar">
            <ul className="sidebar-menu d-flex justify-center align-items-center">
                <li><a href="/">
                    <div className="text-center">
                        <img className="mx-auto" src="/images/chat.svg" width="40" height="40" />
                    </div>
                    <div className="text-primary text-sm text-center mx-auto">
                        <h6>
                            Assistant
                        </h6>
                    </div>
                </a></li>
                <li><a href="/">
                    <div className="text-center">
                        <img className="mx-auto" src="/images/cart.svg" width="40" height="40" />
                    </div>
                    <div className="text-sm text-black text-center mx-auto">
                        <h6>
                            Shop
                        </h6>
                    </div>
                </a></li>
            </ul>
            <ul className="sidebar-menu d-flex justify-center align-items-center">
                <li><a href="/">
                    <div className="text-center">
                        <img className="mx-auto" src="/images/faq.svg" width="40" height="40" />
                    </div>
                    <div className="text-sm text-black text-center mx-auto">
                        <h6>
                            Faq
                        </h6>
                    </div>
                </a></li>
            </ul>


        </div>
    );
};

export default Sidebar;
