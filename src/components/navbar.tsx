import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const languageOptions = [
        { value: 'en', label: 'English', flag: 'English' },
        { value: 'sp', label: 'Spanish', flag: 'Spain' },
        { value: 'th', label: 'Thailand', flag: 'Thailand' },
        { value: 'vt', label: 'Vietnam', flag: 'Vietnam' },
        // Add more language options with flags here
    ];
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    useEffect(() => {
        const defaultLanguage = languageOptions.find(option => option.label === 'English');
        setSelectedLanguage(defaultLanguage);
    }, []);

    const handleLanguageChange = (selectedOption) => {
        setSelectedLanguage(selectedOption);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="normal-case text-xl"><img src="/images/header-logo.svg" /></a>
            </div>
            <div className="flex-none">
                <div className='custom-dropdown'>
                    <Select
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        options={languageOptions}
                        isSearchable={false}
                        formatOptionLabel={({ label, flag }) => (
                            <div className="option-label flex items-center">
                                <img src={`/images/flags/${flag}.svg`} className="mr-3" />
                                <span>
                                    {label}
                                </span>
                            </div>
                        )}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                border: 'none', // Remove the border
                            }),
                            indicatorSeparator: (provided, state) => ({
                                ...provided,
                                backgroundColor: 'transparent', // Remove the separator line
                            }),
                            dropdownIndicator: (provided, state) => ({
                                ...provided,
                                color: '#ccc', // Change the color of the down caret
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                display: 'flex',
                                alignItems: 'center',
                            }),
                            singleValue: (provided, state) => ({
                                ...provided,
                                display: 'flex',
                                alignItems: 'center',
                            }),
                        }}
                    />
                </div>

                <Link className="btn btn-primary text-white mr-3 ml-3" to="/login">
                    Sign in
                </Link>

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
