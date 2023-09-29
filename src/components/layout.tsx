import React, { ReactNode, useState, Children, cloneElement, ReactElement } from 'react';
import Navbar from './navbar'; // Import the Navbar component
import Sidebar from './sidebar'
import BoxContainer from './box-container'
interface LayoutProps {
  children?: ReactNode; // Make the children prop optional
}
interface HoveredData {
  lat: number;
  lon: number;
  index: number;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showBox, setShowBox] = useState(true);
  const [componentName, setComponentName] = useState('chat')

  const [hoveredData, setHoveredData] = useState<HoveredData | null>(null);
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
  const handleProfileName = () => {
    setShowBox(true);
    setComponentName('profile')
  }
  const handleHoverTokenTree = (hoveredData) => {
    // Do something with the hovered data in the great-grandparent component
    setHoveredData(hoveredData);
    console.log(hoveredData)
  };

  return (
    <div className="layout">
      <div className="navbar">
        {/* Include the Navbar component */}
        <Navbar />
      </div>
      <div className="sidebar-and-content">
        {/* Sidebar */}
        <Sidebar isOpen={showBox} toggleBox={handleSideBarButton} setComponentName={handleProfileName} />
        <BoxContainer isOpen={showBox} togglebox={toggleBox} componentName={componentName} setComponentName={handleTokenButton} onHover={handleHoverTokenTree} />
        {/* Main content */}
        <div className="main-content">
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child as React.ReactElement, { hoveredData })
          )}
        </div>

      </div>
    </div>
  );
};

export default Layout;
