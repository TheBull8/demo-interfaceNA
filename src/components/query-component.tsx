import React, { useState } from 'react';
import { FaSearch, FaMicrophone, FaUpload } from 'react-icons/fa';

import ControlPanel from './control-panel';

const QueryComponent: React.FC = () => {
    return (
        <div className="query-container flex flex-col justify-end pb-64">
            <ControlPanel />
            <div className="text-center pt-5 flex justify-center">
                <div className="query-span join-item rounded-l-lg bg-white text-white border-2 border-white border-r-0  px-10  bg-opacity-10"><FaSearch size="2em"  /></div>
                
                <input type="text" placeholder="Type in your question " className="text-white input input-bordered input-lg query-input border-white border-2 bg-opacity-30 placeholder-white" />
                <div className="query-button items-center  join-item rounded-r-lg bg-white text-white border-2 border-white border-l-0  px-2  bg-opacity-10">
                    <button className="btn btn-ghost">
                        <FaMicrophone size="2em" />
                    </button>
                    <button className="btn btn-ghost">
                        <FaUpload size="2em" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QueryComponent;