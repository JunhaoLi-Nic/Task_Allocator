// Add this line to indicate this is a Client Component
"use client";

import { error } from "console";
import Image from "next/image";
import React, { useEffect, useState } from 'react';


interface UserData {
  name: string;
  userID: string;
}

export default function Home() {
  const [data, setData] = useState<UserData[]>([]); 

  useEffect(() => {
    fetch('http://localhost:5045/home/data')
    .then(response => response.json())
    .then(data =>{ console.log(data);  setData(data);})
    .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <main className= "flex min-h-screen flex-col p-6">
        
    </main>
  );
}