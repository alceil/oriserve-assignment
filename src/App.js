import Navbar from "./components/Navbar";
import { useEffect,useState,useCallback, useRef } from "react";
import { ImSpinner2 } from "react-icons/im"
import axios from "axios";
function App() {
  const [photoList, setPhotoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // current page number of api
  const [query, setQuery] = useState(""); // user search query
  // const [uri, setUri] = useState(GET_RECENTS); // api base uri
  const [hasMore, setHasMore] = useState(true); 

  const handleInfiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setPage(page + 1);
    }
};

useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
});

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      let { data } = await axios.get(process.env.REACT_APP_FLICKR_BASE_RECENT_API, {
        params: {
          api_key:process.env.REACT_APP_FLICKR_KEY,
          page,
          text: "",
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
  }, [page]);

  

  return (
    <div className="container mx-auto space-y-4">
<Navbar/>


<div className="flex justify-center items-center h-screen">
{loading &&   <div className=" mt-28 flex h-screen justify-center md:mt-72  ">
        <ImSpinner2 className="h-12 w-12 animate-spin text-primary/70 md:h-16 md:w-16 " />
      </div>}
      {!hasMore && <h1>No more photos</h1>}

<div className="grid grid-cols-3 gap-4 mx-auto my-auto">
{
  photoList.map(({ id, secret, server, title },index)=>



  
  
  <img 
  key={index}
  alt={title}
src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`}
  />

  )
}
</div>

</div>

    </div>
  );
}

export default App;
