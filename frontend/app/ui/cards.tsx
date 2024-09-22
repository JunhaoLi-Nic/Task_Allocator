"use client"
import React, { useState } from 'react';
import Card from './card'; // Ensure this path is correct
import { LayoutGroup } from 'framer-motion';

// Assuming this is your array of items
const items = [
    { id: '1', label: 'Kitchen' },       // Cooking and dining area
    { id: '2', label: 'Living Room' },   // Common space for relaxation and family gatherings
    { id: '3', label: 'Bedroom' },// Primary bedroom
    { id: '4', label: `Boy's BedRoom` },    // Room for guests
    { id: '5', label: 'Bathroom' },      // Sanitation space
    { id: '7', label: 'Home Office' },   // Work space for home-based activities
    { id: '8', label: 'Garage' },        // Storage and vehicle parking
    { id: '9', label: 'Laundry Room' },      // Additional lower-level space for various uses
    { id: '10', label: 'Garden' }         // Upper-level storage or living space
];


function Cards() {
    const [openItemId, setOpenItemId] = useState<string | null>(null);

    const handleCardClick = (itemId: string) => {
        setOpenItemId(openItemId === itemId ? null : itemId);
    };

    return (
        <LayoutGroup>
            <div className="flex flex-wrap justify-center gap-5 py-2 px-20 h-screen w-full">
                {items.map((item) => (
                    <div key={item.id} className="mt-5 justify-center w-1/3 xl:w-1/4 2xl:w-1/5">
                        <Card
                            task={item.label}
                            item={item.id}
                            isOpen={openItemId === item.id}
                            isDimmed={openItemId !== null && openItemId !== item.id}
                            onClick={() => handleCardClick(item.id)}
                        />
                    </div>
                ))}
            </div>
        </LayoutGroup>
    );
}

export default Cards;

