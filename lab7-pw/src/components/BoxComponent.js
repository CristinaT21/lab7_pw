import React, { useState, useEffect } from "react";
import Chipiu from "./Chipiu";
import Bucket from "./Bucket";
import Palarie from "./Palarie";
import Geaca from "./Geaca";
import Maleta from "./Maleta";
import Polo from "./Polo";
import Pantaloni from "./Pantaloni";
import Fusta from "./Fusta";
import Sorti from "./Sorti";
import Botine from "./Botine";
import Pantofi from "./Pantofi";
import Slapi from "./Slapi";
import SVGColorChanger from "./SVGColorChanger";
import SideBar from "./SideBar";


const BoxComponent = () => {
    const [selectedColor, setSelectedColor] = useState('#000');

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
        });
    
    useEffect(() => {
        // Save the favorites to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Handle adding to favorites
    const handleAddToFavorites = () => {
        const colorName = prompt('Enter a name for your favorite color palette:');
        if(colorName) {
            setFavorites([...favorites, { name: colorName, color: selectedColor }]);
            console.log('Added to favorites!');
        }
    };
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
    // Function to handle item deletion from favorites
    const handleRemoveFavorite = (indexToRemove) => {
        // Filter out the item at the specific index
        const newFavorites = favorites.filter((_, index) => index !== indexToRemove);
        setFavorites(newFavorites);
    };

    return (
        <>
            <div>
                <SideBar favorites={favorites} onColorChange={handleColorChange} onRemoveFavorite={handleRemoveFavorite} />
                <div className="page-content mdl-grid">
					<div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone mdl-cell--3-col-tablet mdl-cell--middle">
						<div className="watch">
							<div className="rowgroup">
                                <Chipiu color={selectedColor} />
                                <Bucket color={selectedColor} />
                                <Palarie color={selectedColor} />
                            </div>
                            <div className="rowgroup">
                                <Geaca color={selectedColor} />
                                <Maleta color={selectedColor} />
                                <Polo color={selectedColor} />
                            </div>
                            <div className="rowgroup">
                                <Pantaloni color={selectedColor} />
                                <Fusta color={selectedColor} />
                                <Sorti color={selectedColor} />
                            </div>
                            <div className="rowgroup">
                                <Botine color={selectedColor} />
                                <Pantofi color={selectedColor} />
                                <Slapi color={selectedColor} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="color-changer-container">
                    <SVGColorChanger setSelectedColor={setSelectedColor} />
                    <button className="save_btn custom-btn btn-8" onClick={handleAddToFavorites}>
                        <span>Save</span> 
                    </button>
                </div>
            </div>
        </>
    )
};

export default BoxComponent;