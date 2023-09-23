import React from "react";

type Props = { text: string };

function H1({ text }: Props) {
  return (
    <h1 className="text-4xl mx-4 text-gray-200 font-semibold leading-none tracking-tight">
        {text}
    </h1>
  );
}

export default H1;
