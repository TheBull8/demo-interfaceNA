import React, { ReactNode, useState } from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import Sidebar from './sidebar'
import ChatBox from './chat-box';
interface LayoutProps {
  children?: ReactNode; // Make the children prop optional
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showChatBox, setShowChatBox] = useState(false);
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
        <Sidebar />
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
