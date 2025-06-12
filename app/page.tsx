import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Todos from "@/components/Todos";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Navbar />
      <Header />
      <Todos />
    </div>
  );
}
