import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import './Header.css';
import Login from './Login';

const Header = ({handleLogin}) => {
  return (
    <header className="mdl-layout__header header-1">
      <div className="mdl-layout__header-row">
        <Login handleLogin={handleLogin}/>
            <div className="mdl-layout-title">Daily Inspiration</div>
                <ThemeSwitcher />
            </div>
    </header>
  );
};

export default Header;