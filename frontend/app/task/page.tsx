import { error } from "console";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import Header from "@/app/ui/header";
import Container from "@/app/ui/task/container";
import Pagination from '@/app/ui/task/pagination';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 5;

  return (
    <main className="min-h-screen w-full">
      <Header />
      <div className="p-20 flex flex-col space-y-10 justify-center md:flex-row md:space-y-0 md:space-x-10">
        <div
          className=" w-3/8 h-[40rem]">
          <Container
            householdId="1"
            state="Todo"
          />
        </div>


        <div
          className=" w-3/8 h-[40rem]">
          <Container
            householdId="2"
            state="Done"
          />
        </div>
      </div>
    </main>
  );
}