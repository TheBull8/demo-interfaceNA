import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom'
import { FaPlus, FaEllipsisVertical, FaCommentDots } from "react-icons/fa6";

import { FaBirthdayCake, FaMapMarkerAlt } from "react-icons/fa";
import {
  MdEmail,
  MdPhone,
  MdNoteAlt,
  MdRemoveRedEye,
  MdPerson,
} from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import withAuthenticationRequired from "@auth0/auth0-react";
import { itemAPI } from "./apis/fetchData";
import { useAccount } from "wagmi";

const CHAT_ID = import.meta.env.VITE_CHAT_ID;
const CHAT_AUTH = import.meta.env.VITE_CHAT_AUTH;

const Profile = ({ toChat }) => {
  // get user address
  const address = useAccount().address;

  //   get user data
  //const { user, isAuthenticated, isLoading } = useAuth0();
  const isAuthenticated = true;

  //   set nft trees
  const [nfts, setNfts] = useState<[] | null>();
  const [profileExist, setProfileExist] = useState<Boolean>()

  //   fetch all NFTs
  const nftItems = itemAPI.getItemsByOwnerWithOwnership(
    `ETHEREUM:${address}`,
    "600"
  );
  console.log("i am here");

  useEffect(() => {
    // fetch nfts to display in profile page

    nftItems
      .then((result) => {
        const greenantNft = result.items.filter((nftItem) => {
          return (
            nftItem.item.contract ===
            "POLYGON:0x9b400b6f474f6c2d5a5ea96adb4e244e616a9097"
          );
        });
        setNfts(greenantNft);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <img src="https://i.gifer.com/ZKZg.gif" alt="loader" />;
  }
  return (
    <>
      {
        profileExist ? isAuthenticated &&
          nfts && (
            <div className="overflow-y-auto profile-container">
              <div className="flex justify-between items-center border-b-[1px] pb-4 pl-8">
                <div className="flex justify-center">
                  <LazyLoadImage
                    src={user.picture}
                    width={60}
                    alt="/images/alt-img.svg"
                    className="send-icon"
                  />
                  <div className="ml-5">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <div className="flex">
                      <h4 className="text-primary-gray text-sm">Farmer</h4>{" "}
                      <span className="dot text-primary-gray">
                        &nbsp;&nbsp;•&nbsp;&nbsp;
                      </span>
                      <h4 className="text-primary-gray text-sm">
                        Ho Chi Minh City, Vietnam
                      </h4>
                    </div>
                  </div>
                </div>
                <details className="dropdown dropdown-bottom dropdown-end bg-white ">
                  <summary
                    tabIndex={0}
                    className="btn custom-dropdown bg-white border-none hover:bg-white hover:text-primary"
                  >
                    <FaEllipsisVertical size="1.5em" />
                  </summary>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[8] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Edit Profile</a>
                    </li>
                    <li>
                      <a>Account Settings</a>
                    </li>
                  </ul>
                </details>
              </div>
              <div className="pl-8 pt-5 border-b-[1px] pb-4">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">My wallet</h2>
                  <button className="btn btn-primary btn-outline btn-sm mr-4 rounded-full normal-case custom-outline">
                    <FaPlus />
                    Tokenize tree
                  </button>
                </div>
                <div className="">
                  <div className="flex mt-3">
                    <div className="bg-light-yellow rounded-lg w-[210px] py-4 px-8">
                      <LazyLoadImage
                        src="/images/wallet-coin.svg"
                        width={40}
                        alt="/images/alt-img.svg"
                        className="send-icon"
                      />
                      <div className="flex justify-end">
                        <h1 className="text-2xl font-bold ml-auto">100,000</h1>
                      </div>
                      <div className="flex justify-end mt-1">
                        <p className="ml-auto text-sm">Tokens</p>
                      </div>
                    </div>
                    <div className="bg-light-green rounded-lg w-[210px] py-4 px-8 ml-2">
                      <LazyLoadImage
                        src="/images/wallet-carbon.svg"
                        width={50}
                        alt="/images/alt-img.svg"
                        className="send-icon"
                      />
                      <div className="flex justify-end mt-5">
                        <h1 className="text-2xl font-bold ml-auto">10</h1>
                      </div>
                      <div className="flex justify-end mt-1">
                        <p className="ml-auto text-sm">Kg of Carbon stored</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-2">
                    <div className="bg-light-gray rounded-lg w-[210px] py-4 px-8">
                      <div className="flex justify-between items-center">
                        <LazyLoadImage
                          src="/images/wallet-clock.svg"
                          width={40}
                          alt="/images/alt-img.svg"
                          className="send-icon"
                        />
                        <h1 className="text-3xl font-bold ml-auto">2</h1>
                      </div>
                      <div className="flex justify-end mt-4">
                        <p className="ml-auto text-sm">Pending tokenization</p>
                      </div>
                    </div>
                    <div className="bg-light-gray rounded-lg w-[210px] py-4 px-8 ml-2">
                      <div className="flex justify-between items-center">
                        <LazyLoadImage
                          src="/images/wallet-tree.svg"
                          width={45}
                          alt="/images/alt-img.svg"
                          className="send-icon"
                        />
                        <h1 className="text-3xl font-bold ml-auto">{nfts.length}</h1>
                      </div>
                      <div className="flex justify-end mt-4">
                        <p className="ml-auto text-sm">Owned trees</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="personal-info border-b-[1px] pl-8 py-4">
                <div className="email">
                  <div className="flex items-center gap-6">
                    <MdEmail color="#666564" size="1.5rem" />
                    <h1 className="text-primary-gray">Email</h1>
                  </div>
                  <h2 className="ml-12 text-sm"> {user.email}</h2>
                </div>
                <div className="contact mt-3">
                  <div className="flex items-center gap-6">
                    <MdPhone color="#666564" size="1.5rem" />
                    <h1 className="text-primary-gray">Contact</h1>
                  </div>
                  <h2 className="ml-12 text-sm"> +123 234 2343 </h2>
                </div>
                <div className="contact mt-3">
                  <div className="flex items-center gap-6">
                    <MdNoteAlt color="#666564" size="1.5rem" />
                    <h1 className="text-primary-gray">About Me</h1>
                  </div>
                  <h2 className="ml-12 text-sm"> not stated </h2>
                </div>
              </div>
              <div className="personal-info border-b-[1px] pl-8 py-4">
                <div className="email mb-2">
                  <div className="flex items-center gap-4">
                    <MdRemoveRedEye color="#666564" size="1rem" />
                    <h1 className="text-primary-gray text-sm">Private to you</h1>
                  </div>
                </div>
                <div className="email">
                  <div className="flex items-center gap-6">
                    <FaBirthdayCake color="#666564" size="1.5rem" />
                    <h1 className="text-primary-gray">Birthday</h1>
                  </div>
                  <h2 className="ml-12 text-sm"> mm / dd / yyyy </h2>
                </div>
                <div className="contact mt-3">
                  <div className="flex items-center gap-6">
                    <MdPerson color="#666564" size="1.5rem" />
                    <h1 className="text-primary-gray">Gender</h1>
                  </div>
                  <h2 className="ml-12 text-sm"> Not stated </h2>
                </div>
                <div className="contact mt-3">
                  <div className="flex items-center gap-6">
                    <FaMapMarkerAlt color="#666564" size="1.5rem" />
                    <h1 className="text-primary-gray">Address</h1>
                  </div>
                  <h2 className="ml-12 text-sm"> not stated </h2>
                </div>
              </div>
            </div>
          ) :
          <div className="overflow-y-auto profile-container">
            <h2 className="font-semibold ml-5 mt-3">My Dashboard</h2>
            <LazyLoadImage
              src="/images/profile.svg"
              width={150}
              alt="/images/alt-img.svg"
              className="send-icon mt-16 mx-auto"
            />
            <p className="text-primary-text font-semibold text-xl mx-auto mt-8">You don't have a profile yet</p>
            <p className="text-primary-text text-sm w-3/5 text-center mx-auto mt-5">You need a profile to access the full feature of Desidera</p>
            <Link className="text-white mx-auto mt-8" to="/profile-edit">
              <div onClick={toChat} className="flex items-center mx-auto rounded-full text-sm font-semibold hover:bg-[#1173D0] transition duration-300 mr-4 text-white bg-primary rounded custom-button px-6 py-[8px]">
                <div className="inline-block">
                  <FaPlus />
                </div>
                <span className="ml-2 text-sm inline-block">Create Profile</span>
              </div>
            </Link>
            <p className="text-primary-text font-semibold text-xl mx-auto mt-8">OR</p>
            <p className="text-primary-text text-sm mx-auto mt-8">Use the Assistant to explore more</p>
            <div onClick={toChat} className="mx-auto rounded-full font-semibold hover:bg-primary-hover transition duration-300 py-[6px] items-center justify-center px-6 text-xs custom-outline cursor-pointer text-primary flex border border-[#3394EE] mt-3 normal-case">
              <LazyLoadImage
                src="/images/chat.svg"
                width={16}
                height={16}
                alt="NFTree"
                className="send-icon inline-block"
              />
              <span className="ml-2 text-sm inline-block">Assistant</span>
            </div>

          </div>
      }

    </>
  );
};
export default withAuthenticationRequired(Profile);
