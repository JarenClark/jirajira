import React from "react";
type Props = { children: React.ReactNode };

function Main({ children }: Props) {
  return (
    <main style={{width: 'calc(100vw - 256px)'}} className="ml-64 w-[calc(100vw - 256px)] px-2">
      {children}
    </main>
  );
}

export default Main;
