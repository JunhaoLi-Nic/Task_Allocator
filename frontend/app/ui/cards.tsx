"use client"
import React, { useState } from 'react';
import Card from './card'; // Ensure this path is correct
import { LayoutGroup } from 'framer-motion';

// Assuming this is your array of items
const items = [
    { id: 1, label: 'Kitchen' },       // Cooking and dining area
    { id: 2, label: 'Living Room' },   // Common space for relaxation and family gatherings
    { id: 3, label: 'Master Bedroom' },// Primary bedroom
    { id: 4, label: 'Guest Room' },    // Room for guests
    { id: 5, label: 'Bathroom' },      // Sanitation space
    { id: 6, label: 'Dining Room' },   // Formal eating area
    { id: 7, label: 'Home Office' },   // Work space for home-based activities
    { id: 8, label: 'Garage' },        // Storage and vehicle parking
    { id: 9, label: 'Basement' },      // Additional lower-level space for various uses
    { id: 10, label: 'Attic' }        // Upper-level storage or living space
];

function Cards() {
    const numCubesPerRow = 4;
    const [openItemId, setOpenItemId] = useState<number | null>(null);

    const handleCardClick = (itemId: number) => {
        setOpenItemId(openItemId === itemId ? null : itemId);
    };

    const numRows = Math.ceil(items.length / numCubesPerRow);

    return (
        <LayoutGroup>
            <div className="flex flex-col items-center">
                {Array.from({ length: numRows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row space-x-8 my-4">
                        {/* slice(0,4) slice(5,8) slice(8,..) */}
                        {items.slice(rowIndex * numCubesPerRow, (rowIndex + 1) * numCubesPerRow).map((item) => (
                            <Card
                                task={item.label}
                                key={item.id}
                                item={item.id}
                                isOpen={openItemId === item.id}
                                isDimmed={openItemId !== null && openItemId !== item.id}
                                onClick={() => handleCardClick(item.id)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </LayoutGroup>
    );
}

export default Cards;
