import React, { useState } from "react";
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
    "James needs to clean the windows. Ava needs to bake cookies for the sale.",
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
    const [completed, setCompleted] = useState(Array(tasks.length).fill(false))

    // Toggle completion status of a task
    const toggleCompletion = (index: number) => {
        const newCompleted = [...completed];  //JavaScript code utilizes the spread operator (...) to create a new copy of the completed array. 
        newCompleted[index] = !newCompleted[index];
        setCompleted(newCompleted);
    };

    return (
        <motion.div
            layoutId={`card-detail-${item}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxSizing: 'border-box',
                overflow: 'hidden',// Hide overflow on the outer container
                width:'50%'
                
            }}
        >
            <div className="overflow-y-auto scrollbar-webkit">
                <ul>
                    {tasks.map((task, index) => (
                        <motion.div className="mx-10 text-lg flex flex-row w-5/6 py-3 border-b border-gray-300">
                            <input
                                type="checkbox"
                                className="mx-4 scale-125 text-lg"
                                checked={completed[index]}
                                onChange={() => toggleCompletion(index)
                                }
                            />
                            <li key={index} className={`font-cheese ${completed[index] ? 'text-gray-500 line-through' : 'text-black'}`}>
                                {task}
                            </li>
                        </motion.div>
                    ))}

                </ul>
            </div>

        </motion.div>
    );
}

export default CardContent;