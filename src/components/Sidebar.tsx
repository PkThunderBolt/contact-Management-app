import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const closeSidebarOnClick = () => {
    // Check if the viewport width is less than the breakpoint (e.g., 768px)
    if (window.innerWidth <= 768) {
      toggleSidebar(); // Close the sidebar
    }
  };

  return (
    <div>
      {/* <button className="md:hidden text-white p-4" onClick={toggleSidebar}>
        {isOpen ? '✖' : '☰'}
      </button> */}
      <div
        className={`fixed inset-0 md:relative transform md:transform-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-gray-800 text-white p-4 h-screen`}
      >
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li className="mb-2">
            <Link to="/contacts" className="hover:bg-gray-700 p-2 rounded block" onClick={closeSidebarOnClick}>
              Contacts
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/charts-and-maps" className="hover:bg-gray-700 p-2 rounded block" onClick={closeSidebarOnClick}>
              Charts and Maps
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
