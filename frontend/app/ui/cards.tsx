import React from 'react';
import Card from './card'; // Ensure this path is correct

function Cards() {
    const numRows = 2;
    const numCubesPerRow = 4;

    return (
        <div className="flex flex-col items-center">
            {Array.from({ length: numRows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex flex-row space-x-8 my-4">
                    {Array.from({ length: numCubesPerRow }).map((_, cardIndex) => (
                        <Card key={cardIndex} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Cards;
