import {useEffect,useState} from 'react'
import axios from "axios";

const useFlickrApi = () => {
    const [photoList, setPhotoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // current page number of api
    const [query, setQuery] = useState(''); // user search query
    const [hasMore, setHasMore] = useState(true);

    
    const baseURL = "https://www.flickr.com/services/rest/";

    const getURL = (method) => {
        let url = `${baseURL}?method=${method}&format=json&nojsoncallback=1`;
        return url;
      };

    useEffect(() => {
        let cancel;

        const fetchData = async () => {
          setLoading(true);
          const url = getURL(  query ? "flickr.photos.search" : "flickr.photos.getRecent");
          let { data } = await axios.get(url, {
            params: {
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
              api_key:process.env.REACT_APP_FLICKR_KEY,
              page,
              text: query,
              per_page: "20",
              format: "json",
            },
          });
          cancel();
          setHasMore(data.photos.photo.length > 0);
          setPhotoList((prevPhotoList) => [...prevPhotoList, ...data.photos.photo]);
          setLoading(false);
        };
    
        fetchData();
        return () => cancel();
      }, [page,query]);


      const handleSearch =  (enquiry) => {
        setPhotoList([]);
        setQuery(enquiry);
        setPage(1);
      };



      return { 
        hasMore, 
        photoList, 
        query,
        loading,
        page,
        setPage, 
        setQuery,
        setPhotoList,
        handleSearch ,

    };
    
}

export default useFlickrApi