import React from 'react';

const ChatComponent: React.FC = () => {
    return (
        <div className="absolute inset-x-0 bottom-[160px]">
            <div className="text-center">
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
        </div>
    );
};

export default ChatComponent;