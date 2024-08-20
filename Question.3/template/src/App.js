import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CardList from './components/CardList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenu(menuItem);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'cards':
        return <CardList />;
      default:
        return <h5 className="mt-3">{selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1)}</h5>;
    }
  };

  return (
    <div className='mainapp'>
      <Navbar />
      <div className="d-flex">
        <Sidebar onMenuItemClick={handleMenuItemClick} />
        <div className="flex-grow-1 p-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;