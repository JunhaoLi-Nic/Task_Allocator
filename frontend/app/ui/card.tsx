import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';


interface CardProps {
    item: number;
    isOpen: boolean;
    isDimmed: boolean;
    onClick: () => void;
  }

const Card: React.FC<CardProps> = ({ item, isOpen, isDimmed, onClick }) => {
  return (
    <AnimatePresence>
      <motion.div
        layoutId={`card-container-${item}`}
        onClick={onClick}  // Handle click to toggle open/close
        initial={{ borderRadius: '0.6rem' }}
        animate={{
          borderRadius: isOpen ? '1.2rem' : '0.6rem',
          width: isOpen ? 700 : 250,  // Open to full width or initial width
          height: isOpen ? 600 : 250,  // Open to full height or initial height
          zIndex: isOpen ? 1000 : 1,  // Bring to front if open
          backgroundColor: isDimmed ? 'rgba(200, 200, 200, 1)' : 'white'
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
          flexDirection: 'column',
          cursor: 'pointer',
          position: isOpen ? 'fixed' : 'relative',  // Fixed if open
          top: isOpen ? '30%' : undefined,
        }}
      >
        <motion.h2>Framer Motion</motion.h2>
        {isOpen && (
          <motion.div
            layoutId={`card-detail-${item}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="p-30 leading-10">Animating Box bla</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Card;
