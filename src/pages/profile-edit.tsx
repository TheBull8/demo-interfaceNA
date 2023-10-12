import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaCamera, FaUpload } from "react-icons/fa6";
import { MdContactEmergency, MdCake, MdPerson, MdNoteAlt } from "react-icons/md";
const ProfileEdit = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const [selectedDay, setSelectedDay] = useState("dd");
    const [selectedMonth, setSelectedMonth] = useState("mm");
    const [selectedYear, setSelectedYear] = useState("yyyy");

    // Generate options for days (1-31)
    const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);

    // Sample options for months
    const monthOptions = [
        "January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December"
    ];

    // Generate options for years (e.g., from 1900 to the current year)
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

    // Event handlers to update the selected values
    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };
    return (
        <div className="h-screen w-full z-20 absolute bg-white">
            <div className="flex justify-center ">
                <div className="w-1/8 h-screen pt-24 pr-5 border-r-[2px]">
                    <div className="tabs tabs-boxed flex-col bg-white">
                        <a
                            className={`tab w-48 bg-white ${activeTab === 1 ? "tab-active" : ""}`}
                            onClick={() => handleTabClick(1)}
                        >
                            Edit Profile
                        </a>
                        <a
                            className={`tab w-48 my-5 bg-white ${activeTab === 2 ? "tab-active" : ""}`}
                            onClick={() => handleTabClick(2)}
                        >
                            Your Wallet
                        </a>
                        <a
                            className={`tab w-48 bg-white ${activeTab === 3 ? "tab-active" : ""}`}
                            onClick={() => handleTabClick(3)}
                        >
                            Account Settings
                        </a>
                    </div>
                </div>
                <div className="mt-24 w-3/5 overflow-y-auto">
                    {activeTab === 1 && <div>
                        <div className="flex items-center">
                            <LazyLoadImage
                                src="/images/avatars/mario.png"
                                width={100}
                                alt="NFTree"
                                className="send-icon mx-12 rounded-full"
                            />
                            <button className="btn btn-sm btn-outline btn-primary rounded-full custom-outline  hover:text-white mr-5 w-48 normal-case">
                                <FaCamera />
                                Use camera
                            </button>
                            <button className="btn btn-sm btn-outline rounded-full w-48 normal-case">
                                <FaUpload />
                                Upload image
                            </button>
                        </div>
                        <div className="ml-12 mt-4 w-3/5">
                            <div className="flex">
                                <MdContactEmergency color="#666564" size="1.5rem" />
                                <p className="text-primary-text font-bold ml-3">Name*</p>
                            </div>
                            <div className="ml-8">
                                <input type="text" placeholder="eg. Steve" className="input input-bordered w-full mt-3" />
                                <label className="label">
                                    <span className="label-text-alt text-primay-text">First name</span>
                                </label>
                                <input type="text" placeholder="eg. Jobs" className="input input-bordered w-full" />
                                <label className="label">
                                    <span className="label-text-alt text-primay-text">Last name</span>
                                </label>
                            </div>
                            <div className="flex mt-3">
                                <MdCake color="#666564" size="1.5rem" />
                                <p className="text-primary-text font-bold ml-3">Birthday*</p>
                            </div>
                            <div className="flex">
                                <div className="ml-8 mt-3">
                                    <select className="select text-primary-text border-1 border-gray-300 focus:outline-none w-32" value={selectedDay} onChange={handleDayChange}>
                                        <option disabled value="dd" className="text-primary-gray">dd</option>
                                        {dayOptions.map((day) => (
                                            <option className="text-primary-text" key={day} value={day}>{day}</option>
                                        ))}
                                    </select>
                                    <label className="label">
                                        <span className="label-text-alt">Date</span>
                                    </label>
                                </div>
                                <div className="ml-8 mt-3">
                                    <select className="select text-primary-text border-1 border-gray-300 focus:outline-none w-32" value={selectedMonth} onChange={handleMonthChange}>
                                        <option disabled value="mm" className="text-primary-gray">mm</option>
                                        {monthOptions.map((month) => (
                                            <option className="text-primary-text" key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                    <label className="label">
                                        <span className="label-text-alt">Month</span>
                                    </label>
                                </div>
                                <div className="ml-8 mt-3">
                                    <select className="select text-primary-text border-1 border-gray-300 focus:outline-none w-32" value={selectedYear} onChange={handleYearChange}>
                                        <option disabled value="yyyy" className="text-primary-gray">yyyy</option>
                                        {yearOptions.map((year) => (
                                            <option className="text-primary-text" key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                    <label className="label">
                                        <span className="label-text-alt">Year</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex mt-3">
                                <MdPerson color="#666564" size="1.5rem" />
                                <p className="text-primary-text font-bold ml-3">Gender*</p>
                            </div>
                            <select className="select text-primary-text ml-8 mt-3 border-1 border-gray-300  w-32 focus:outline-none">
                                <option disabled selected className="text-primary-gray">-Select-</option>
                                <option className="text-primary-text">Male</option>
                                <option className="text-primary-text">Female</option>
                            </select>
                            <div className="flex mt-3">
                                <MdNoteAlt color="#666564" size="1.5rem" />
                                <p className="text-primary-text font-bold ml-3">About me*</p>
                            </div>
                            <textarea className="textarea ml-8 mt-3 border-1 border-gray-300 w-full focus:outline-none" placeholder="Bio"></textarea>
                        </div>
                        <div className="flex justify-end mt-8">
                            <Link to="/" className="btn mr-4 btn-outline rounded-lg w-48 normal-case">
                                Discard
                            </Link>
                            <button className="btn mr-96 btn-outline btn-primary rounded-lg custom-outline  hover:text-white mr-5 w-48 normal-case">
                                Save changes
                            </button>
                        </div>
                    </div>}
                    {activeTab === 2 && <div>Wallet Settings</div>}
                    {activeTab === 3 && <div>Account Settings</div>}
                </div>
            </div>
        </div>
    )
}

export default ProfileEdit;