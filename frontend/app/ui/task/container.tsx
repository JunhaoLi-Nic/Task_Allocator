'use client'
import { motion } from 'framer-motion';
import React from 'react';

interface ContainerProps {
    householdId: string,
    state: string
}

const Container: React.FC<ContainerProps> = ({ householdId, state }) => {
    return (
        <motion.div
            animate={{
                backgroundColor: 'white',
                width: '100%',
                height: '100%',
                borderRadius: '1.2rem'
            }}

            style={{
      // Ensure it's positioned relative to its container, if necessary
                display:'flex',

            }}
        >

        </motion.div>
    );
}
export default Container;
