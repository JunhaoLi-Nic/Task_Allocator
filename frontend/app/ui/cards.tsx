"use client"
import React, { useState } from 'react';
import Card from './card'; // Ensure this path is correct
import { LayoutGroup } from 'framer-motion';

function Cards() {
    const numRows = 2;
    const numCubesPerRow = 4;
    const [openItemId, setOpenItemId] = useState<number | null>(null);

    const handleCardClick = (itemId: number) => {
        setOpenItemId(openItemId === itemId ? null : itemId);
    };

    return (
        <LayoutGroup>
            <div className="flex flex-col items-center">
                {Array.from({ length: numRows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row space-x-8 my-4">
                        {Array.from({ length: numCubesPerRow }).map((_, cardIndex) => {
                            const uniqueId = rowIndex * numCubesPerRow + cardIndex;
                            return (
                                <Card
                                    key={uniqueId}
                                    item={uniqueId}
                                    isOpen={openItemId === uniqueId}
                                    isDimmed={openItemId !== null && openItemId !== uniqueId}
                                    onClick={() => handleCardClick(uniqueId)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </LayoutGroup>
    );
}

export default Cards;
