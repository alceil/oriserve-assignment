import React,{useEffect, useState} from 'react'
import useFlickrApi from '../hooks/useFlickrApi';

const Navbar = ({handler}) => {
  const  {setPhotoList,setQuery,setPage} = useFlickrApi();
  const [suggestions, setSuggestions] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

 const handleSubmit =  () => {
  console.log(searchQuery)
  if(searchQuery && !suggestions.includes(searchQuery)){
    setSuggestions([searchQuery,...suggestions])
  }

setShowSearchSuggestions(false);
};

useEffect(()=>{
  console.log(searchQuery)
handler(searchQuery)

},[searchQuery])

  return (
    <section className="bg-black py-4">
    <div className="flex flex-col items-center space-y-4 ">
    <h1 className="text-2xl font-bold  text-white">
  Search Photos
  </h1>
  <div className='relative'>

  <div className='flex space-x-2'>
  <input 
  type="text"
  onClick={()=>setShowSearchSuggestions(!showSearchSuggestions)}
className="outline-none border-none rounded-sm shadow-md"
onChange={(e)=>{setSearchQuery(e.target.value.trim())}}
/>
<button 
className='bg-red-600 text-white text-2xl rounded-sm p-2'
onClick={handleSubmit}
>
  Search
</button>

</div>
{
  showSearchSuggestions && suggestions.length>0 && (
    <div className='bg-white space-y-2' >

  {
    suggestions.map((item,index)=>
    <p key={index} className='text-gray-500 p-2 hover:bg-gray-200' >{item}</p>
    )
  }
  <div className='flex  justify-center space-x-2'>
  <button 
  className='bg-red-600 text-white text-sm rounded-md p-2 hover:bg-red-400 '
  onClick={()=>{
    setSuggestions([]);
  }}
  >
Clear
  </button>
  <button 
  className='bg-red-600 text-white text-sm rounded-md p-2 hover:bg-red-400 '
  onClick={()=>{setShowSearchSuggestions(false)}}
  >
Close
  </button>
  </div>

</div>
  )
}
  </div>

      </div>  

    </section>
  )
}

export default Navbar