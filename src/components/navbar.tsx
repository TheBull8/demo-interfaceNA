import React, { useState } from 'react';

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="normal-case text-xl"><img src="/images/header-logo.svg" /></a>
            </div>
            <div className="flex-none">
                <select className="select w-full max-w-xs mr-3" defaultValue="English">
                    <option>
                        English
                    </option>
                    <option>
                        Germany
                    </option>
                    <option>
                        Spanish
                    </option>

                </select>
                <a href="/login" className="btn btn-primary text-white mr-3">
                    Sign in
                </a>


                <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex={0} className="btn m-1"><svg xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="p-3"><a className="text-primary">About Us</a></li>
                        <li className="p-3"><a className="text-primary ">Contact Us</a></li>
                        <li className="p-3"><a className="text-primary ">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
