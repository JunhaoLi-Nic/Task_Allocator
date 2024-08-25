import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import CardContent from "./components/card-content"


interface CardProps {
    task: string;
    item: string;
    isOpen: boolean;
    isDimmed: boolean;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ task, item, isOpen, isDimmed, onClick }) => {

    const [hover, setHover] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handleExitClick = () => {
        setTimeout(() => {
            setShowContent(true);
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
                initial={{borderRadius: '0.6rem' }}
                animate={{
                    borderRadius: isOpen ? '1.2rem' : '0.6rem',
                    width: isOpen ? '50%' : '80%',  // Open to full width or initial width
                    height: isOpen ? 700 : '100%',  // Open to full height or initial height
                    zIndex: isOpen ? 1000 : 1,  // Bring to front if open
                    backgroundColor: isDimmed ? 'rgba(200, 200, 200, 0.5)' : 'white',
                    boxShadow:'5px 5px 7px 2px rgba(0, 0, 0, 0.3)',
                }}
                transition={{
                    duration: 0.8,
                    ease: 'easeInOut'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black',
                    flexDirection: 'column',
                    cursor: isOpen ? 'default' : 'pointer',
                    position: isOpen ? 'fixed' : 'relative',  // Fixed if open
                    left: isOpen ? '25%' : undefined,
                    overflow: 'hidden'
                }}
                onMouseLeave={() => setHover(false)}  //init hover

            >
                <motion.h2
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        fontSize: '24px',
                        fontWeight: '500',
                        color: 'darkslategray',
                        fontFamily: 'Cheese Matcha'

                    }}>{task}</motion.h2>

                <motion.div
                    style={{
                        display: 'flex',
                        flexDirection: 'row', // Changed from 'column' to 'row'
                        height: '80%', // Ensure the container takes full height of its parent
                        width: '100%',
                        position: 'relative' // Needed for absolute positioning of the child elements
                    }}
                >
                    <motion.img className = {`md:block ${isOpen ? 'hidden': ''}`}
                        src={`./${task}.png`}
                        alt= {task}
                        style={{
                            position: 'absolute',
                            top: isOpen ? '50px' : '70px',
                            left: isOpen ? '200px' : '40px',
                            scale: isOpen ? '0.9' : '1.3',
                            zIndex:'-1'
                        }}
                    />
                    {showContent && (
                        <CardContent item={item} />
                    )}
                </motion.div>

                {showContent && (
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
                            setShowContent(false);
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                )}



            </motion.div>
        </AnimatePresence >
    );
};

export default Card;
