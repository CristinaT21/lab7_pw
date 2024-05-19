import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import './Header.css';

const Header = () => {
  return (
    <header className="mdl-layout__header header-1">
				<div className="mdl-layout__header-row">
            <div className="mdl-layout-title">Daily Inspiration</div>
                <ThemeSwitcher />
            </div>
    </header>
  );
};

export default Header;