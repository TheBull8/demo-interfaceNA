import React, { useState, useEffect, useCallback } from 'react';
import Map from 'react-map-gl';

import DrawControl from '../draw-control';


const TOKEN = import.meta.env.VITE_MAPBOX_KEY;

const QueryComponent: React.FC = () => {

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

   

    const containerStartSpanClass = `query-span join-item w-1/6 justify-center flex ${inputFocused ? 'rounded-bl-lg' : 'rounded-l-lg'
        } bg-white text-white border-2 border-white border-r-0 px-10 bg-opacity-30`;

    const containerEndSpanClass = `query-button items-center w-1/6 justify-center flex join-item ${inputFocused ? 'rounded-br-lg' : 'rounded-r-lg'
        } bg-white text-white border-2 border-white border-l-0 px-2 bg-opacity-30`;

    return (
        <div className="query-container">
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
                    position="bottom-right"
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

            {/* <ControlPanel /> */}
            {/* <div className="absolute w-1/2 bottom-20 left-1/2 transform -translate-x-1/2">
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
            </div> */}
        </div>
    );
};

export default QueryComponent;


