import React from "react";


const SVGColorChanger = ({setSelectedColor}) => {

    // generate random color
    const generateRandomColor = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setSelectedColor(randomColor);
    };
    
    return (
        <>
        <button className="custom-btn btn-8" onClick={generateRandomColor}>
            <span >Generate</span></button>
        </>
    );
};

export default SVGColorChanger;