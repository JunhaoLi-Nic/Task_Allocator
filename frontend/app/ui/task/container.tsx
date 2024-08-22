'use client'
import { motion } from 'framer-motion';
import React, {useState} from 'react';

interface ContainerProps {
    householdId: string,
    state: string
}
const tasks = [
    "Violette needs to clean everything.",
    "Oliver needs to organize the garage.",
    "Emma needs to water the garden.",
    "Liam needs to wash the car. Sophia needs to prepare the guest room.",
    "Sophia needs to prepare the guest room.",
    "Mason needs to repaint the kitchen.",
    "Isabella needs to sort the mail.",
    "Ethan needs to fix the leaking faucet.",
    "Ava needs to bake cookies for the sale.",
];


const Container: React.FC<ContainerProps> = ({ householdId, state }) => {
    const [completed, setCompleted] = useState(Array(tasks.length).fill(state === 'Done'))

    const toggleCompletion = (index:number) =>{
        const newCompleted = [...completed];
        newCompleted[index] = !newCompleted[index]
        setCompleted(newCompleted)
    }

    return (
        <motion.div
            animate={{
                backgroundColor: 'white',
                width: '100%',
                height: '100%',
                borderRadius: '1.2rem',
                boxShadow: '5px 5px 10px 2px rgba(0, 0, 0, 0.3)'
            }}

            style={{
                // Ensure it's positioned relative to its container, if necessary
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <motion.h2 className='font-cheese text-3xl m-10'>{state}</motion.h2>
            <ul>
                {tasks.map((task, index) => (
                    <motion.div className="mx-10 text-lg flex flex-row w-4/5 py-3 border-b border-gray-300">
                        <input
                        type = "checkbox"
                        className = 'mx-5 scale-125 text-lg'
                        checked={completed[index]}
                        onChange={()=>toggleCompletion(index)}
                        >
                        
                        </input>
                        < li key={index} className={`font-cheese ${completed[index] ? 'text-gray-500 line-through' : 'text-black'}`}
                        >
                        {task}
                        </li>
                    </motion.div>
                ))}
            </ul>
        </motion.div>
    );
}
export default Container;
