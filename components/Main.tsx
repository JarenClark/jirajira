import React from "react";
type Props = {
  children: React.ReactNode;
  // details: React.ReactNode;
};

function Main({ children,  }: Props) {
  return (
    <main className="px-4">
      {children}
      {/* {details && <div>rightcontent</div>} */}
    </main>
  );
}

export default Main;
