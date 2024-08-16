import { error } from "console";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import Header from "@/app/ui/header";
import CardStack from "./ui/card-stack";

export default function Page() {
  return (
    <main>
      <Header /> 
      <CardStack/>
    </main>
      
  );
}