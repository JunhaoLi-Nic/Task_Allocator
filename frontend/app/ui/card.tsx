"use client"
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";


function Card() {

    return (
        <motion.div
        animate={{
            borderRadius: "20%",
        }}
        transition={{
            duration: 0.5,
            loop: Infinity, // Optional: Makes the animation loop
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        style={{
            width: 300, // Width of the div in pixels
            height: 300, // Height of the div in pixels
            backgroundColor: 'white', // Make it visible with a background color
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black'
        }}
    >
        {/* Optionally add content */}
        <span>Animating Box</span>
        </motion.div>
    );
};

export default Card