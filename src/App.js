import Navbar from "./components/Navbar";
import { useEffect,useState } from "react";
import axios from "axios";
function App() {
  const [photoList, setPhotoList] = useState([]);
  const [page, setPage] = useState(1); 
  useEffect(() => {

    const fetchData = async () => {
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
      setPhotoList((prevPhotoList) => [...prevPhotoList, ...data.photos.photo]);

    };

    fetchData();
  }, []);

  

  return (
    <div className="container mx-auto space-y-4">
<Navbar/>
<div className="flex justify-center items-center h-screen">


<div className="grid grid-cols-3 gap-4 mx-auto my-auto">
{
  photoList.map(({ id, secret, server, title },index)=>
  <img 
  key={index}
  alt={title}
src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`}
  />)
}
</div>
</div>
    </div>
  );
}

export default App;
