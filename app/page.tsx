"use client"
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Todos from "@/components/TodoSection";
import { Suspense } from "react";

export default function Home() {

  return (
    <div className="flex flex-col gap-4">
      <Navbar />
      <Header />
      <Suspense fallback={null}>
        <Todos />
      </Suspense>
    </div >
  );
}
