import Navbar from "./components/Navbar";
import { useEffect,useState,useCallback, useRef } from "react";
import { ImSpinner2 } from "react-icons/im"
import axios from "axios";
import ImageContainer from "./components/ImageContainer";
function App() {
  const [photoList, setPhotoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // current page number of api
  const [query, setQuery] = useState(""); // user search query
  // const [uri, setUri] = useState(GET_RECENTS); // api base uri
  const [hasMore, setHasMore] = useState(true); 
  const [showModal,setShowModal] = useState(true);
  const baseURL = "https://www.flickr.com/services/rest/";

  const handleInfiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setPage(page + 1);
    }
};


  
// const handleSubmit = () => {
//   if (query) {
//       saveSearchSuggestions(query);
//   }
//   setShowSearchSuggestions(false);
// };

const getURL = (method) => {
  let url = `${baseURL}?method=${method}&format=json&nojsoncallback=1`;
  return url;
};

useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
});

const handleSearch = async (enquiry) => {
  setPhotoList([]);
  setQuery(enquiry);
  setPage(1);
};

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      const url = getURL(  query ? "flickr.photos.search" : "flickr.photos.getRecent");
      let { data } = await axios.get(url, {
        params: {
          api_key:process.env.REACT_APP_FLICKR_KEY,
          page,
          text: query,
          per_page: "20",
          format: "json",
        },
      });

      console.log(data)
      setHasMore(data.photos.photo.length > 0);
      setPhotoList((prevPhotoList) => [...prevPhotoList, ...data.photos.photo]);
      setLoading(false);
    };

    fetchData();
  }, [page,query]);

  

  return (
    <div className="container mx-auto space-y-4">
<Navbar 
handler={handleSearch} 
// onSubmit={handleSubmit} 
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
