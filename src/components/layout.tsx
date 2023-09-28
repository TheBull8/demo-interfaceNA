import React, { ReactNode, useState } from "react";
import Navbar from "./navbar"; // Import the Navbar component
import Sidebar from "./sidebar";
import BoxContainer from "./box-container";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  goerli,
} from "wagmi/chains";

interface LayoutProps {
  children?: ReactNode; // Make the children prop optional
}
const projectId = import.meta.env.VITE_PROJECT_ID;

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://guardian.ng/wp-content/uploads/2022/04/POP-1-640x360.jpg"],
};
const chains = [
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  goerli,
];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
createWeb3Modal({ wagmiConfig, projectId, chains });

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showBox, setShowBox] = useState(true);
  const [componentName, setComponentName] = useState("chat");
  const toggleBox = () => {
    setShowBox(!showBox);
  };
  const handleSideBarButton = () => {
    setShowBox(true);
    setComponentName("chat");
  };
  const handleTokenButton = () => {
    setShowBox(true);
    setComponentName("token");
  };
  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="layout">
        <div className="navbar">
          {/* Include the Navbar component */}
          <Navbar />
        </div>
        <div className="sidebar-and-content">
          {/* Sidebar */}
          <Sidebar isOpen={showBox} toggleBox={handleSideBarButton} />
          <BoxContainer
            isOpen={showBox}
            togglebox={toggleBox}
            componentName={componentName}
            setComponentName={handleTokenButton}
          />
          {/* Main content */}
          <div className="main-content">
            {/* Render the child components (route components) */}
            {children}
          </div>
        </div>
      </div>{" "}
    </WagmiConfig>
  );
};

export default Layout;
