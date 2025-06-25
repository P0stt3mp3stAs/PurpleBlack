import Image from "next/image";
import LevelCanvas from "@/components/LevelCanvas";
export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen  pb-20 gap-16  font-[family-name:var(--font-geist-sans)]">
      <div className="relative w-[200px] sm:w-[300px] md:w-[400px]  aspect-[3/1] pl-20">
        <Image
          src="/PB.svg"
          alt="Purple & Black logo"
          fill
          className="object-contain"
          priority // optional: loads image earlier
        />
      </div>
        <LevelCanvas level={1} />
    </div>
  );
}
