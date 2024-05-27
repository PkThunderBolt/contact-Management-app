import React from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const location = useLocation();

  const getSectionName = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/contacts':
        return 'Contacts';
      case '/create-contact':
        return 'Contacts';
      case '/charts-and-maps':
        return 'Charts and Maps';
      default:
        return 'Contacts';
    }
  };

  const isMobileView = window.innerWidth <= 768; // Check if viewport width is less than or equal to 768px

  return (
    <header className={`bg-gray-200 p-4 shadow-md ${isMobileView ? 'w-full flex justify-between items-center' : ''}`}>
      {/* Hamburger for responsive and mobile view */}
      {isMobileView && (
        <button className="hamburger" onClick={toggleSidebar}>
          {isSidebarOpen ? '✖' : '☰'}
        </button>
      )}
      <h1 className="text-xl font-bold">{getSectionName()}</h1>
    </header>
  );
};

export default Header;
