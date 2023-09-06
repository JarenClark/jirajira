import React from 'react'
type Props = {children: React.ReactNode}

function Main({children}: Props) {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center text-gray-400 bg-black">
    {children}
  </main>
  )
}

export default Main