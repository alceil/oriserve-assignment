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
  const baseURL = "https://www.flickr.com/services/rest/";

  const handleInfiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setPage(page + 1);
    }
};


const getURL = (method) => {
  let url = `${baseURL}?method=${method}&format=json&nojsoncallback=1`;
  return url;
};

useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
});

const handleSearch = async (enquiry) => {
  // console.log(enquiry);
  // window.scrollTo(0, 0); // scroll to top on search
  // if (enquiry.length === 0) {
  //   setUri(GET_RECENTS);
  // } else {
  //   setUri(GET_SEARCH);
  // }

  setPhotoList([]);

  setQuery(enquiry);
  setPage(1);
};

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      const url = getURL(  query ? "flickr.photos.search" : "flickr.photos.getRecent");
      // https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=60&format=json&nojsoncallback=1"
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
<Navbar handler={handleSearch}/>


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
<div
  id="modal"
  class="fixed inset-0 flex items-center justify-center z-50 "
>
  <div
    class="fixed inset-0 bg-gray-900 opacity-75"
  ></div>

  <div class="bg-white w-1/2 p-6 rounded-lg">
    <button
      id="close-modal"
      class="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-6 w-6"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>

    <p>This is the modal content. You can add any HTML elements here.</p>
  </div>
</div>
</div>

    </div>
  );
}

export default App;
