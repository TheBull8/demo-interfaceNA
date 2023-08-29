import React, { useState, useEffect } from 'react';
import { FaSearch, FaMicrophone, FaUpload } from 'react-icons/fa';

import ControlPanel from './control-panel';

const QueryComponent: React.FC = () => {

    const [messages, setMessages] = useState([]);
    const [inputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        setMessages([...messages, { text: "Bot: How can I help you?", isBot: true }]);
    }, []);

    const handleInputFocus = () => {
        setInputFocused(true);
        setMessages([...messages, { text: "Bot: How can I help you?", isBot: true }]);
    };

    const handleUserInput = (text) => {
        setMessages([...messages, { text, isBot: false }]);
        setMessages([...messages, { text: "Bot: Thank you for your question!", isBot: true }]);
    };

    const containerStartSpanClass = `query-span join-item w-1/12 justify-center flex ${inputFocused ? 'rounded-bl-lg' : 'rounded-l-lg'
        } bg-white text-white border-2 border-white border-r-0 px-10 bg-opacity-30`;

    const containerEndSpanClass = `query-button items-center w-1/12 justify-center flex join-item ${inputFocused ? 'rounded-br-lg' : 'rounded-r-lg'
        } bg-white text-white border-2 border-white border-l-0 px-2 bg-opacity-30`;

    return (
        <div className="query-container flex flex-col justify-end pb-64">
            <ControlPanel />

            <div className="text-center pt-5 flex-col justify-center">
                {inputFocused && (
                    <div className="border-2 bg-opacity-30 bg-white rounded-tl-lg rounded-tr-lg border-white border-b-0 w-1/2 mx-auto h-96 px-10 pt-5 ">
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-24 rounded-full">
                                    <img src="/images/logo.svg" />
                                </div>
                            </div>
                            <div className="chat-bubble bg-slate-200 text-slate-500">Hello, How can I help you?</div>
                        </div>
                        <div className="chat chat-end ">
                            <div className="chat-image avatar">
                                <div className="w-20 rounded-full">
                                    <img src="/images/avatar.svg" />
                                </div>
                            </div>
                            <div className="chat-bubble mb-8 bg-slate-200 text-slate-500">How to tokenize tree?</div>
                        </div>
                    </div>
                )}
                <div className="flex justify-center">
                    <div className={containerStartSpanClass}><FaSearch size="2em" /></div>
                    <input type="text" placeholder="Type in your question "
                        onFocus={handleInputFocus}
                        onBlur={() => setInputFocused(false)}
                        className="text-white input input-bordered rounded-none w-1/3 input-lg query-input border-white border-2 bg-opacity-30 placeholder-white" />
                    <div className={containerEndSpanClass}>
                        <button className="btn btn-ghost">
                            <FaMicrophone size="2em" />
                        </button>
                        <button className="btn btn-ghost">
                            <FaUpload size="2em" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueryComponent;