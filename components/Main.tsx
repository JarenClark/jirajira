import React from "react";
type Props = { children: React.ReactNode };

function Main({ children }: Props) {
  return (
    <main className="w-[calc(100vw - 256px)] min-h-screen bg-background text-gray-400 bg-black">
      {children}
    </main>
  );
}

export default Main;
