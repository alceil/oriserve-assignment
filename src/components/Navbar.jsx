import React from 'react'

const Navbar = () => {
  return (
    <section className="bg-black py-4">
    <div className="flex flex-col items-center space-y-4 ">
    <h1 className="text-2xl font-bold  text-white">
  Search Photos
  </h1>
<input type="text"
className="outline-none border-none rounded-sm shadow-md"
/>
      </div>  

    </section>
  )
}

export default Navbar