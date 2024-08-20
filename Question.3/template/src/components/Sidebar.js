import React, { useState } from 'react';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { TbDashboard } from 'react-icons/tb';
import { MdOutlineTextsms, MdOutlineContentCopy } from 'react-icons/md';
import { GiPowerButton } from 'react-icons/gi';
import { LiaCreditCardSolid } from 'react-icons/lia';
import { TfiLayoutGrid4Alt } from 'react-icons/tfi';
import { FaArrowUpRightDots } from 'react-icons/fa6';
import { LiaStarOfLifeSolid } from 'react-icons/lia';
import { FaMinusCircle } from "react-icons/fa";

import './CardList.css';

function Sidebar({ onMenuItemClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(''); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item) => {
    setActiveItem(item); 
    onMenuItemClick(item); 
  };

  return (
    <div>
      <button
        className="btn d-md-none"
        onClick={toggleSidebar}
        style={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }}
      >
        <IoReorderThreeOutline size={30} />
      </button>
      <div className={`bg-light p-3 ${isOpen ? 'd-block' : 'd-none'} d-md-block`} style={{ width: '200px', height: '100vh' }}>
        <ul className="list-unstyled">
          <li
            onClick={() => handleMenuItemClick('dashboard')}
            className={`sidebar-item ${activeItem === 'dashboard' ? 'active' : ''}`}
          >
            <TbDashboard size={20} className="sidebar-icon" /> Dashboard
          </li>
          <li
            onClick={() => handleMenuItemClick('alerts')}
            className={`sidebar-item ${activeItem === 'alerts' ? 'active' : ''}`}
          >
            <MdOutlineTextsms size={20} className="sidebar-icon" /> Alerts
          </li>
          <li
            onClick={() => handleMenuItemClick('badges')}
            className={`sidebar-item ${activeItem === 'badges' ? 'active' : ''}`}
          >
            <MdOutlineContentCopy size={20} className="sidebar-icon" /> Badges
          </li>
          <li
            onClick={() => handleMenuItemClick('buttons')}
            className={`sidebar-item ${activeItem === 'buttons' ? 'active' : ''}`}
          >
            <GiPowerButton size={20} className="sidebar-icon" /> Buttons
          </li>
          <li
            onClick={() => handleMenuItemClick('cards')}
            className={`sidebar-item ${activeItem === 'cards' ? 'active' : ''}`}
          >
            <LiaCreditCardSolid size={20} className="sidebar-icon" /> Cards
          </li>
          <li
            onClick={() => handleMenuItemClick('layout')}
            className={`sidebar-item ${activeItem === 'layout' ? 'active' : ''}`}
          >
            <TfiLayoutGrid4Alt size={20} className="sidebar-icon" /> Layout
          </li>
          <li
            onClick={() => handleMenuItemClick('pagination')}
            className={`sidebar-item ${activeItem === 'pagination' ? 'active' : ''}`}
          >
            <FaArrowUpRightDots size={20} className="sidebar-icon" /> Pagination
          </li>
          <li
            onClick={() => handleMenuItemClick('popover')}
            className={`sidebar-item ${activeItem === 'popover' ? 'active' : ''}`}
          >
            <FaMinusCircle size={20} className="sidebar-icon" /> Popover
          </li>
          <li
            onClick={() => handleMenuItemClick('tooltips')}
            className={`sidebar-item ${activeItem === 'tooltips' ? 'active' : ''}`}
          >
            <LiaStarOfLifeSolid size={20} className="sidebar-icon" /> Tooltips
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
