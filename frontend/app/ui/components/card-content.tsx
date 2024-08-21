import React from "react";
import { motion } from 'framer-motion';

interface CardContentProps {
    item: string;
}

const tasks = [
    "Violette needs to clean everything.",
    "Oliver needs to organize the garage.",
    "Emma needs to water the garden.",
    "Liam needs to wash the car.",
    "Sophia needs to prepare the guest room.",
    "Mason needs to repaint the kitchen.",
    "Isabella needs to sort the mail.",
    "Ethan needs to fix the leaking faucet.",
    "Ava needs to bake cookies for the sale.",
    "James needs to clean the windows. Ava needs to bake cookies for the sale."
];


const CardContent: React.FC<CardContentProps> = ({ item }) => {

    return (
        <motion.div
            layoutId={`card-detail-${item}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ul>
                
                    {tasks.map((task, index) => (
                        <motion.div className="mx-10 text-lg flex flex-row w-3/5 py-3 border-b border-gray-300">
                            <input type="checkbox" className="mx-4 scale-125 text-lg" />
                            <li key={index} className="font-cheese">{task}</li>
                        </motion.div>
                    ))}
                
            </ul>

        </motion.div>
    );
}

export default CardContent;