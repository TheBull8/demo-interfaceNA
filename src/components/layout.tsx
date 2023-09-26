import React, { ReactNode, useState } from 'react';
import Navbar from './navbar'; // Import the Navbar component
import Sidebar from './sidebar'
import BoxContainer from './box-container'
interface LayoutProps {
  children?: ReactNode; // Make the children prop optional
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showBox, setShowBox] = useState(true);
  const [componentName, setComponentName] = useState('chat')
  const toggleBox = () => {
    setShowBox(!showBox);
  };
  const handleSideBarButton = () => {
    setShowBox(true);
    setComponentName('chat')
  }
  const handleTokenButton = () => {
    setShowBox(true);
    setComponentName('token')
  }
  return (
    <div className="layout">
      <div className="navbar">
        {/* Include the Navbar component */}
        <Navbar />
      </div>
      <div className="sidebar-and-content">
        {/* Sidebar */}
        <Sidebar isOpen={showBox} toggleBox={handleSideBarButton} />
        <BoxContainer isOpen={showBox} togglebox={toggleBox} componentName={componentName} setComponentName={handleTokenButton} />
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
