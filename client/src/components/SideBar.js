import React, { useEffect } from "react";
import './SideBar.css';

function SideBar({ favorites, onColorChange, onRemoveFavorite, palettes, setPalettes, getAllPalettes }) {
    
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpen = () => {
        if (!isOpen) {
            getAllPalettes();
        }
        setIsOpen(!isOpen);
    }

    return (
        <>
            <input id="slide-sidebar" type="checkbox" role="button" />
            <label class="close-menu noselect" for="slide-sidebar" onClick={handleOpen}><span className="sidebar-btn">≡</span></label>

            <div class="controls">
            <span className="favourite-title">Favorites</span>
                {/* add fav */}
                <ul>
                    {favorites.map((fav, index) => (
                        <li key={index} onClick={() => onColorChange(fav.color)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="fav-name" >{fav.name}</span>
                            <button className="x-btn" onClick={() => onRemoveFavorite(index)} style={{ cursor: 'pointer' }}>
                            X
                        </button>
                        </li>
                    ))}
                </ul>
            </div >
        </>
    );
}

export default SideBar;