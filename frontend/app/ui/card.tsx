import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';


interface CardProps {
    task: string;
    item: number;
    isOpen: boolean;
    isDimmed: boolean;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ task, item, isOpen, isDimmed, onClick }) => {

    const [hover, setHover] = useState(false);
    const [showExitButton, setShowExitButton] = useState(false);

    const handleExitClick = () => {
        setTimeout(() => {
            setShowExitButton(true);
        }, 900);
    };


    return (
        <AnimatePresence>
            <motion.div
                layoutId={`card-container-${item}`}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    if (!isOpen) {
                        onClick();
                        handleExitClick();
                    }
                    e.stopPropagation(); // Prevents closing when opening the card
                }}
                initial={{ borderRadius: '0.6rem' }}
                animate={{
                    borderRadius: isOpen ? '1.2rem' : '0.6rem',
                    width: isOpen ? 900 : 300,  // Open to full width or initial width
                    height: isOpen ? 700 : 300,  // Open to full height or initial height
                    zIndex: isOpen ? 1000 : 1,  // Bring to front if open
                    backgroundColor: isDimmed ? 'rgba(200, 200, 200, 0.5)' : 'white'
                }}
                transition={{
                    duration: 0.8,
                    ease: 'easeInOut'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1}}
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black',
                    flexDirection: 'column',
                    cursor: isOpen ? 'default' : 'pointer',
                    position: isOpen ? 'fixed' : 'relative',  // Fixed if open
                    top: isOpen ? '30%' : undefined,
                    overflow: 'hidden'
                }}
                onMouseLeave={() => setHover(false)}  //init hover

            >
                <motion.h2
                    style ={{
                        position: 'absolute',
                        top:'10px',
                        left:'10px',
                        fontSize: '24px',
                        fontWeight: '500',
                        color: 'darkslategray',
                        fontFamily: 'Cheese Matcha'

                    }}>{task}</motion.h2>
                <motion.img 
                    src = "./kitchen.avif"
                    alt = " kitchen "
                    style = {{
                        position:'absolute',
                        top:'90px'
                    
                    }}
                />
                {isOpen && (

                    <motion.div
                        layoutId={`card-detail-${item}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        
                    >
                        <p className="p-30 leading-10">Animating Box</p>

                        {showExitButton  && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    cursor: 'pointer',
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    border: "none",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: hover ? '#A3A3A3' : '#F6F2F2', // Darker when hovered
                                }}

                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}

                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents the card from toggling open when closing
                                    onClick();
                                    setShowExitButton(false);
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                        )}

                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default Card;
