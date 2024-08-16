"use client"
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";


function CardStack() {

    return (
        <motion.div
        animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
            duration: 2,
            ease: "easeInOut",
            loop: Infinity, // Optional: Makes the animation loop
        }}
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

export default CardStack