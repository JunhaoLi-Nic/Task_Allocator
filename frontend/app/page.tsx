import { error } from "console";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import Header from "@/app/ui/header";
import Cards from "./ui/cards";

export default function Page() {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <div className="mx-20"> 
        <Cards/> 
      </div>
    </main>

  );
}