import React from 'react'

const Navbar = ({handler,onSubmit}) => {



  return (
    <section className="bg-black py-4">
    <div className="flex flex-col items-center space-y-4 ">
    <h1 className="text-2xl font-bold  text-white">
  Search Photos
  </h1>
  <div className='flex space-x-2'>
  <input type="text"
className="outline-none border-none rounded-sm shadow-md"
onChange={(e)=>{handler(e.target.value)}}
/>
<button 
className='bg-red-600 text-white text-2xl rounded-sm p-2'
onClick={onSubmit}
>
  Search
</button>
  </div>

      </div>  

    </section>
  )
}

export default Navbar