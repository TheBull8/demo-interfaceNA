import React, { useState, useEffect, useRef } from "react";
import { FaAngleRight, FaAngleLeft, FaThumbsUp, FaThumbsDown, FaRegThumbsDown } from 'react-icons/fa6';
import ChatBox from "./chat-box";
import TokenTree from "./token-tree";

const BoxContainer = props => {
    const chatboxClass = props.isOpen ? "chatbox" : "chatbox open";

    return (
        <div className={chatboxClass}>
            {props.componentName === 'token' ? <TokenTree /> : <></>}
            {props.componentName === 'chat' ? <ChatBox /> : <></>}
            <button onClick={props.togglebox} className="chatbox-toggle pl-1">
                {props.isOpen ? <FaAngleLeft color="#666564" size="2em" /> : <FaAngleRight color="#666564" size="2em" />}
            </button>
            <div className="tree-buttons">
                <button className="btn btn-sm bg-white rounded-full mr-4">Available trees</button>
                <button onClick={props.setComponentName} className="btn btn-sm bg-white rounded-full">My Tokenized trees</button>
            </div>
        </div >
    );
};
export default BoxContainer;



