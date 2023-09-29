import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  // login user
  const { loginWithRedirect } = useAuth0();

  //   logout user
  const { logout } = useAuth0();

  //   get user data
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const languageOptions = [
    { value: "en", label: "English", flag: "English" },
    { value: "sp", label: "Spanish", flag: "Spain" },
    { value: "th", label: "Thailand", flag: "Thailand" },
    { value: "vt", label: "Vietnam", flag: "Vietnam" },
    // Add more language options with flags here
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    const defaultLanguage = languageOptions.find(
      (option) => option.label === "English"
    );
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
        <a className="normal-case text-xl">
          <img src="/images/header-logo.svg" />
        </a>
      </div>
      <div className="flex-none">
        {isAuthenticated && <h2>{`hi, ${user.given_name}`}</h2>}
        {/* <div className='custom-dropdown'>
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
                </div> */}

        {isAuthenticated ? (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="btn btn-primary login_btn text-white mr-3 ml-3 py-2"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="btn btn-primary login_btn text-white mr-3 ml-3 py-2"
          >
            Log in
          </button>
        )}
        <w3m-button />
        <details className="dropdown dropdown-bottom dropdown-end bg-white ">
          <summary
            tabIndex={0}
            className="btn custom-dropdown bg-white border-none hover:bg-white hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </summary>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52"
          >
            <li className="p-3">
              <a className="custom-link text-black hover:text-primary hover:bg-white">
                About Us
              </a>
            </li>
            <li className="p-3">
              <a className="custom-link text-black hover:text-primary hover:bg-white">
                GA Map
              </a>
            </li>
            <li className="p-3">
              <a className="custom-link text-black hover:text-primary hover:bg-white">
                Docs
              </a>
            </li>
            <li className="p-3">
              <a className="custom-link text-black hover:text-primary hover:bg-white">
                Community
              </a>
            </li>
            <li className="p-3">
              <a className="custom-link text-black hover:text-primary hover:bg-white">
                Contact Us
              </a>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Navbar;
