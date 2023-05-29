import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im"
import ImageContainer from "./components/ImageContainer";
import useFlickrApi from "./hooks/useFlickrApi";
function App() {
  const { hasMore, photoList, loading, page,setPage, handleSearch } = useFlickrApi();


  const handleInfiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setPage(page + 1);
    }
};

useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
});
   
  return (
    <div className="container mx-auto space-y-4">
<Navbar 
handler={handleSearch} 
/>


<div className="flex justify-center items-center h-screen">
{loading &&   < div className="flex justify-center items-center h-screen" >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div >}
      {!hasMore && <h1>No more photos</h1>}

<div className="grid grid-cols-3 gap-4 mx-auto my-auto">
{
  photoList.map((photo,index)=>

<ImageContainer
key={index}
{...photo}
/>

  
  

  )
}
</div>

</div>

    </div>
  );
}

export default App;
