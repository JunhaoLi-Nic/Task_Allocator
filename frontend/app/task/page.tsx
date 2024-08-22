import { error } from "console";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import Header from "@/app/ui/header";
import Container from "@/app/ui/task/container";

export default function Page() {
  return (
    <main className="h-lvh w-lvw">
      <Header />
      <div className="flex flex-row h-3/4 space-x-20 justify-center">
        <div
          className="relative w-2/6 h-7/8">
          <Container
            householdId="1"
            state="Todo"
          />
        </div>

        <div
          className="relative w-2/6 h-7/8">
          <Container
            householdId="2"
            state="Done"
          />
        </div>
      </div>
    </main>
  );
}