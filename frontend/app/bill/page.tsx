'use client'
import { error } from "console";
import Image from "next/image";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Header from "@/app/ui/header";

export default function Page() {
  return (
    <main className="h-full w-full">
      <Header />
      <motion.div
        animate={{
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          borderRadius: '1.2rem',
          boxShadow: '5px 5px 10px 2px rgba(0, 0, 0, 0.3)'
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxSizing: 'border-box',
          overflow: 'hidden', // Hide overflow on the outer container
        }}>
          <p> hello </p>
      </motion.div>
    </main>
  );
}