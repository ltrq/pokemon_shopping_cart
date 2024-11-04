import React, { useState } from "react";
import "./StorePreview.css";
import Sprite from "./Sprite";

function StorePreviewList() {
    const getUniqueSpriteIndices = (length, max, existingIndices = new Set()) => {
        const indices = new Set(existingIndices);
        while (indices.size < length) {
            indices.add(Math.floor(Math.random() * max) + 1);
        }
        return Array.from(indices);
    };

    const [visitedIndices, setVisitedIndices] = useState([getUniqueSpriteIndices(10, 1025)]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        const newIndices = getUniqueSpriteIndices(10, 1025);
        setVisitedIndices((prev) => [...prev, newIndices]);
        setCurrentIndex((prev) => prev + 1);
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        } else {
            const newIndices = getUniqueSpriteIndices(10, 1025);
            setVisitedIndices((prev) => [newIndices, ...prev]);
            setCurrentIndex(0);
        }
    };

    const currentIndices = visitedIndices[currentIndex];

    return (
        <div className="StorePreviewBlock">
            <NavigationButton direction="Previous" onClick={handlePrevious} />
            <div className="StorePreviewList">
                {currentIndices.map((index) => (
                    <StorePreview key={index} index={index} />
                ))}
            </div>
            <NavigationButton direction="Next" onClick={handleNext} />
        </div>
    );
}

const NavigationButton = ({ direction, onClick }) => {
    const isPrevious = direction === "Previous";
    return (
        <div className={direction} role="button" aria-label={direction} onClick={onClick}>
            <svg width="30" height="30" viewBox="0 0 24 24">
                <path
                    d={isPrevious ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
};

function StorePreview({ index }) {
    const handleClick = () => {
        // navigate(`/shop/${index}`); // Uncomment for navigation
    };

    return (
        <div className="StorePreview" onClick={handleClick}>
            <Sprite index={index} />
        </div>
    );
}

export default StorePreviewList;
