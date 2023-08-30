import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMicrophone, FaUpload, FaAngleDown, FaLongArrowAltRight } from 'react-icons/fa';
import OpenAI from 'openai';
import Map from 'react-map-gl';

import DrawControl from '../draw-control';
import ControlPanel from './control-panel';

const TOKEN = import.meta.env.VITE_MAPBOX_KEY;

const QueryComponent: React.FC = () => {
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_KEY,
        dangerouslyAllowBrowser: true
    });

    const [messages, setMessages] = useState([]);
    const [inputFocused, setInputFocused] = useState(false);
    const [userInput, setUserInput] = useState('');


    useEffect(() => {
        setMessages([{ text: "How can I help you?", isBot: true }]);
    }, []);

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const [features, setFeatures] = useState({});
    const onUpdate = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
    }, []);

    const onDelete = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
        });
    }, []);

    const handleInputKeyDown = async (event) => {
        if (event.key === 'Enter' && userInput.trim() !== '') {
            const userMessage = { text: userInput, isBot: false };
            const loadingMessage = { text: 'loading', isBot: true };

            setMessages([...messages, userMessage, loadingMessage]);
            setUserInput('');

            try {
                const botResponse = await getChatGptResponse(userInput);
                const botMessage = { text: botResponse, isBot: true };
                setMessages((prevMessages) => [
                    ...prevMessages.slice(0, -1), // Remove loading message
                    botMessage // Add bot response
                ]);

            } catch (error) {
                console.error("Error fetching bot response:", error);
            }
        }
    };


    const getChatGptResponse = async (userInput) => {
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: userInput }],
            model: import.meta.env.VITE_OPENAI_MODEL,
        });

        return response.choices[0].message.content;
    };

    const containerStartSpanClass = `query-span join-item w-1/6 justify-center flex ${inputFocused ? 'rounded-bl-lg' : 'rounded-l-lg'
        } bg-white text-white border-2 border-white border-r-0 px-10 bg-opacity-30`;

    const containerEndSpanClass = `query-button items-center w-1/6 justify-center flex join-item ${inputFocused ? 'rounded-br-lg' : 'rounded-r-lg'
        } bg-white text-white border-2 border-white border-l-0 px-2 bg-opacity-30`;

    return (
        <div className="query-container flex flex-col justify-end">
            <Map
                initialViewState={{
                    longitude: 102.08,
                    latitude: 14.97,
                    zoom: 16
                }}

                mapStyle="mapbox://styles/mapbox/satellite-v9"
                mapboxAccessToken={TOKEN}
            >
                <DrawControl
                    position="top-left"
                    displayControlsDefault={false}
                    controls={{
                        polygon: true,
                        trash: true
                    }}
                    defaultMode="draw_polygon"
                    onCreate={onUpdate}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            </Map>

            <ControlPanel />
            <div className="absolute w-1/2 bottom-20 left-1/2 transform -translate-x-1/2">
                <div className="text-center pt-5 flex-col justify-center">
                    {inputFocused && (
                        <div
                            className="overflow-auto border-2 bg-opacity-30 bg-white rounded-tl-lg rounded-tr-lg border-white border-b-0 w-full mx-auto h-[32rem] px-10 pt-3 pb-5">
                            <button
                                onClick={() => setInputFocused(false)}
                                className="chat chat-end btn bg-opacity-20 hover:bg-opacity-50 border-2 btn-md  ml-auto text-white px-auto items-center flex justify-center"><FaAngleDown size="2rem" /></button>
                            {messages.map((message, index) => (
                                <ChatMessage
                                    key={index}
                                    sender={message.isBot ? 'start' : 'end'}
                                    content={message.text}

                                />
                            ))}
                            <div className="chat chat-start hidden">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src="/images/logo.svg" />
                                    </div>
                                </div>
                                <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                            </div>

                        </div>
                    )}
                    <div className="flex justify-center">
                        <div className={containerStartSpanClass}><FaSearch size="2em" /></div>
                        <input type="text" placeholder="Type in your question "
                            onFocus={handleInputFocus}
                            onKeyDown={handleInputKeyDown}
                            onChange={(event) => setUserInput(event.target.value)}
                            value={userInput}
                            className="text-white input input-bordered rounded-none w-2/3 input-lg query-input border-white border-2 bg-opacity-30 placeholder-white" />
                        <div className={containerEndSpanClass}>
                            <button className="btn btn-ghost">
                                <FaMicrophone size="2em" />
                            </button>
                            <button className="btn btn-ghost">
                                <FaUpload size="2em" />
                            </button>
                        </div>
                    </div>
                    <Link className="btn bg-opacity-20 hover:bg-opacity-50 border-2 btn-md text-white w-1/12 mx-auto mt-5" to="/login">
                        <FaLongArrowAltRight size="3em" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QueryComponent;
function ChatMessage({ key, sender, content }) {
    const avatarImage = sender === 'start' ? '/images/logo.svg' : '/images/avatar.svg';

    return (
        <div className={`chat chat-${sender}`}>
            <div className="chat-image avatar">
                <div className={`w-${sender === 'start' ? 24 : 20} rounded-full`}>
                    <img src={avatarImage} alt={`Avatar of ${sender}`} />
                </div>
            </div>
            <div className={`chat-bubble mb-8 mr-3 bg-slate-200 text-slate-600 text-left`}>
                {content === "loading" ? <span className="loading loading-dots loading-md"></span> : content}
            </div>
        </div>
    );
}


