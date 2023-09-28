import React, { useState, useEffect, useCallback } from "react";
import { FaPen, FaRegCircleXmark } from 'react-icons/fa6';
import { useAuth0 } from "@auth0/auth0-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CHAT_ID = import.meta.env.VITE_CHAT_ID;
const CHAT_AUTH = import.meta.env.VITE_CHAT_AUTH;

const TokenTree = () => {
    const { user, isAuthenticated } = useAuth0();

    const handleClick = () => {
        const modal = document.getElementById('my_modal1');
        if (modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    }

    return (
        <>
            <h1 className="text-xl font-bold mt-[110px] ml-12 pb-5">My tokenized trees</h1>
            <div className="token-card overflow-y-auto">
                <TreeItem />
                <TreeItem />
                <TreeItem />
                <TreeItem />
                <TreeItem />
                <TreeItem />
            </div>
        </>
    );
};
export default TokenTree;


const TreeItem = () => {

    return (
        <>
            <dialog id="my_modal1" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="flex flex-col justify-center py-3 " onClick={() => document.getElementById('my_modal1').showModal()}>
                        <LazyLoadImage src="/images/alt-modal.svg" alt="Send" className="send-icon mt-4" />
                        <h1 className="text-xl font-bold mt-5">Project Sputnik</h1>
                        <p className="text-primary-gray text-sm mt-5">20kg carbon stored as of date</p>
                        <div className="divider my-2"></div>
                        <div className="flex items-center my-2 ml-3">
                            <h6 className="flex text-primary-gray min-w-[40%] text-sm">Tree Specie</h6>
                            <p className="text-sm">Alstonia Scholaris</p>
                        </div>
                        <div className="flex items-center my-2 ml-3">
                            <h6 className="flex text-primary-gray min-w-[40%] text-sm">Location</h6>
                            <p className="text-sm">Ho Chi Minh City, Vietnam</p>
                        </div>
                        <div className="flex items-center my-2 ml-3">
                            <h6 className="flex text-primary-gray min-w-[40%] text-sm">Geo-coordinates</h6>
                            <p className="text-sm">41.32532, 23.34563</p>
                        </div>
                        <div className="flex items-center my-2 ml-3">
                            <h6 className="flex text-primary-gray min-w-[40%] text-sm">Contract Date</h6>
                            <p className="text-sm">25 Sep 2023 - 26 Sep 2024</p>
                        </div>
                        <div className="flex items-center my-2 ml-3">
                            <h6 className="flex text-primary-gray min-w-[40%] text-sm">Date tokenized</h6>
                            <p className="text-sm">25 Sep 2023 </p>
                        </div>
                        <div className="flex items-center my-2 ml-3">
                            <h6 className="flex text-primary-gray min-w-[40%] text-sm">Date planned</h6>
                            <p className="text-sm">25 Sep 2023</p>
                        </div>
                        <div className="flex items-center justify-center my-8">
                            <button className="btn btn-primary text-white mr-5 w-48 normal-case">
                                <FaPen />
                                Edit project
                            </button>
                            <button className="btn w-48 normal-case">
                                <FaRegCircleXmark />
                                Withdraw project
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
            <div className="flex justify-center border-b-[2px] py-3 cursor-pointer hover:bg-light-gray" onClick={() => document.getElementById('my_modal1').showModal()}>
                <LazyLoadImage src="/images/alt-img.svg" width={100} alt="Send" className="send-icon" />
                <div className="flex flex-col ml-5">
                    <h1 className="text-xl font-bold">Project Sputnik</h1>
                    <p className="text-primary-gray text-sm">20kg carbon stored as of date</p>
                    <div className="divider my-2"></div>
                    <div className="flex items-center">
                        <h6 className="flex text-primary-gray min-w-[40%] text-sm">Tree Specie</h6>
                        <p className="text-sm">Alstonia Scholaris</p>
                    </div>
                    <div className="flex items-center">
                        <h6 className="flex text-primary-gray min-w-[40%] text-sm">Location</h6>
                        <p className="text-sm">Ho Chi Minh City, Vietnam</p>
                    </div>
                    <div className="flex items-center">
                        <h6 className="flex text-primary-gray min-w-[40%] text-sm">Contract Date</h6>
                        <p className="text-sm">25 Sep 2023 - 26 Sep 2024</p>
                    </div>
                </div>
            </div>
        </>
    )
}


