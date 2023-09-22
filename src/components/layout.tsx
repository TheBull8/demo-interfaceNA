import React, { ReactNode, useState } from 'react';
import Navbar from './navbar'; // Import the Navbar component
import Sidebar from './sidebar'
import ChatBox from './chat-box';
interface LayoutProps {
  children?: ReactNode; // Make the children prop optional
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showChatBox, setShowChatBox] = useState(true);
  const toggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };
  return (
    <div className="layout">
      <div className="navbar">
        {/* Include the Navbar component */}
        <Navbar />
      </div>
      <div className="sidebar-and-content">
        {/* Sidebar */}
        <Sidebar toggleChatBox={toggleChatBox} />
        <ChatBox isOpen={showChatBox} toggleChatbox={toggleChatBox} />
        {/* Main content */}
        <div className="main-content">
          {/* Render the child components (route components) */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
