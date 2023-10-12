import React, { useState, useEffect } from "react";
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

    // Sample options for months
    const monthOptions = [
        "January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December"
    ];

    // Generate options for years (e.g., from 1900 to the current year)
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

    const [dayOptions, setDayOptions] = useState([]);
    const updateDayOptions = () => {
        if (selectedMonth !== "mm") {
            const selectedMonthIndex = monthOptions.indexOf(selectedMonth);
            if (selectedMonthIndex >= 0) {
                const daysInMonth = new Date(parseInt(selectedYear), selectedMonthIndex + 1, 0).getDate();
                const newDayOptions = Array.from({ length: daysInMonth }, (_, i) => i + 1);
                setDayOptions(newDayOptions);
            } else {
                setDayOptions([]);
            }
        } else {
            // Set a default number of days (e.g., 30) when the month is selected but the year is not
            const newDayOptions = Array.from({ length: 30 }, (_, i) => i + 1);
            setDayOptions(newDayOptions);
        }
    };

    useEffect(() => {
        updateDayOptions();
    }, [selectedMonth, selectedYear]);

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
        <div className="h-screen w-full z-20 absolute bg-white overflow-y-auto">
            <div className="flex justify-center ">
                <div className="w-1/8 pt-24 pr-1 border-r-[1px] border-[#CCCBC8]">
                    <div className="tabs tabs-boxed flex-col bg-white">
                        <a
                            className={`tab text-primary-focus rounded font-bold justify-start custom-tab hover:bg-light-gray h-10 w-48 bg-white ${activeTab === 1 ? "tab-active" : ""}`}
                            onClick={() => handleTabClick(1)}
                        >
                            Edit Profile
                        </a>
                        <a
                            className={`tab text-primary-focus rounded font-bold justify-start h-10 w-48 hover:bg-light-gray my-5 bg-white ${activeTab === 2 ? "tab-active" : ""}`}
                            onClick={() => handleTabClick(2)}
                        >
                            Your Wallet
                        </a>
                        <a
                            className={`tab text-primary-focus rounded font-bold justify-start h-10 w-48 hover:bg-light-gray bg-white ${activeTab === 3 ? "tab-active" : ""}`}
                            onClick={() => handleTabClick(3)}
                        >
                            Account Settings
                        </a>
                    </div>
                </div>
                <div className="mt-24 w-3/5 ">
                    {activeTab === 1 && <div>
                        <div className="flex items-center h-28">
                            <LazyLoadImage
                                src="/images/avatars/mario.png"
                                alt="NFTree"
                                className="send-icon mx-12 rounded-full w-28 h-28"
                            />
                            <div className="rounded-full font-semibold hover:bg-primary-hover transition duration-300 py-[6px] items-center justify-center px-6 text-xs custom-outline cursor-pointer text-primary flex border border-[#3394EE]  mr-3 w-48 normal-case">
                                <LazyLoadImage
                                    src="/images/camera.svg"
                                    width={20}
                                    height={20}
                                    alt="NFTree"
                                    className="send-icon rounded-full inline-block"
                                />
                                <span className="ml-2 inline-block">Use camera</span>
                            </div>
                            <div className="rounded-full font-semibold hover:bg-light-gray  transition duration-300 py-[6px] items-center justify-center px-6 text-xs custom-outline cursor-pointer text-primary-text flex border border-primary-text  mr-3 w-48 normal-case">
                                <LazyLoadImage
                                    src="/images/upload.svg"
                                    width={20}
                                    height={20}
                                    alt="NFTree"
                                    className="send-icon rounded-full inline-block"
                                />
                                <span className="ml-2 inline-block"> Upload image</span>
                            </div>

                        </div>
                        <div className="ml-12 mt-4 w-3/5 border-t border-light-gray">
                            <span className="text-primary-text text-xs">(*) Required field</span>
                            <div className="flex items-center mt-2">
                                <LazyLoadImage
                                    src="/images/id_card_fill.svg"
                                    width={32}
                                    height={32}
                                    alt="NFTree"
                                    className="send-icon rounded-full inline-block"
                                />
                                <p className="text-xs text-primary-text font-bold ml-2">Name<span className="text-red-500"> *</span></p>
                            </div>
                            <div className="ml-10">
                                <input type="text" placeholder="eg. Steve" className="input input-bordered input-sm rounded w-full " />
                                <label className="label">
                                    <span className="label-text-alt text-primay-text">First name</span>
                                </label>
                                <input type="text" placeholder="eg. Jobs" className="input input-bordered input-sm rounded w-full" />
                                <label className="label">
                                    <span className="label-text-alt text-primay-text">Last name</span>
                                </label>
                            </div>
                            <div className="flex items-center mt-2">
                                <LazyLoadImage
                                    src="/images/birthday_fill.svg"
                                    width={32}
                                    height={32}
                                    alt="NFTree"
                                    className="send-icon rounded-full inline-block"
                                />
                                <p className="text-xs text-primary-text font-bold ml-2">Birthday<span className="text-red-500"> *</span></p>
                            </div>
                            <div className="flex">
                                <div className="ml-10 ">
                                    <select className="select rounded select-sm font-normal text-primary-text border-1 border-gray-300 focus:outline-none w-32" value={selectedYear} onChange={handleYearChange}>
                                        <option disabled hidden value="yyyy" className="text-primary-gray font-normal">yyyy</option>
                                        {yearOptions.map((year) => (
                                            <option className="text-primary-text" key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                    <label className="label">
                                        <span className="label-text-alt">Year</span>
                                    </label>
                                </div>
                                <div className="ml-8 ">
                                    <select className="select rounded select-sm font-normal text-primary-text border-1 border-gray-300 focus:outline-none w-32" value={selectedMonth} onChange={handleMonthChange}>
                                        <option disabled hidden value="mm" className="text-primary-gray font-normal">mm</option>
                                        {monthOptions.map((month) => (
                                            <option className="text-primary-text" key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                    <label className="label">
                                        <span className="label-text-alt">Month</span>
                                    </label>
                                </div>
                                <div className="ml-8 ">
                                    <select className="select rounded select-sm font-normal text-primary-text border-1 border-gray-300 focus:outline-none w-32" value={selectedDay} onChange={handleDayChange}>
                                        <option disabled hidden value="dd" className="text-primary-gray">dd</option>
                                        {dayOptions.map((day) => (
                                            <option className="text-primary-text font-normal" key={day} value={day}>{day}</option>
                                        ))}
                                    </select>
                                    <label className="label">
                                        <span className="label-text-alt">Date</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center mt-2">
                                <LazyLoadImage
                                    src="/images/user_duotone.svg"
                                    width={32}
                                    height={32}
                                    alt="NFTree"
                                    className="send-icon rounded-full inline-block"
                                />
                                <p className="text-xs text-primary-text font-bold ml-2">Gender</p>
                            </div>
                            <select placeholder="select" className="select rounded select-sm font-normal text-primary-text ml-10 border-1 border-gray-300  w-32 focus:outline-none">
                                <option disabled selected hidden className="text-light-gray">-Select-</option>
                                <option className="text-primary-text font-normal">Male</option>
                                <option className="text-primary-text font-normal">Female</option>
                                <option className="text-primary-text font-normal">Non-binary</option>
                                <option className="text-primary-text font-normal">Rather not say</option>
                            </select>
                            <div className="flex items-center mt-2">
                                <LazyLoadImage
                                    src="/images/notebook_fill.svg"
                                    width={32}
                                    height={32}
                                    alt="NFTree"
                                    className="send-icon rounded-full inline-block"
                                />
                                <p className="text-xs text-primary-text font-bold ml-2">About me</p>
                            </div>
                            <textarea className="textarea rounded ml-10 mt-3 border-1 border-gray-300 w-full focus:outline-none" placeholder="Bio"></textarea>
                        </div>
                        <div className="flex justify-center mt-6 mb-6">
                            <Link to="/" className="text-sm font-semibold hover:bg-light-gray transition duration-300 mr-4 border-2 border-primary-text text-primary-text rounded custom-button px-6 py-1">
                                Discard
                            </Link>
                            <button className="text-sm font-semibold hover:bg-[#1173D0] transition duration-300 mr-4 text-white bg-primary rounded custom-button px-6 py-1">
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