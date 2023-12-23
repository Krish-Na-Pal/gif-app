"use client"; // This is a client component 👈🏽

// components/Dashboard.tsx
import { MouseEventHandler, useState } from "react";
import Giphy from "@/utils/giphy";
import axios from "axios";
import { Loader } from "@giphy/react-components";
import Paginate from "./Paginate";

interface Gif {
  id: string,
  title: string,
  username: string,
  gif : string,
  isFavorite: boolean
}

interface FavoritesProps {
  favorites: Gif[];
}

interface HomeProps {
  gifs: Gif[];
  onToggleFavorite: (gif: Gif) => void;
}


const GIPHY_API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const[itemsPerPage, setIemsPerPage] = useState(5);
  const indexOfLastItem = currentPage*itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  
  // const [favorites, setFavorites] = useState<Gif[]>([]);

  const [favorite, setFavorite] = useState(false);

  const handleSearchChange = async (event: any) => {
    setSearch(event.target.value);
    setIsLoading(true)
      event.preventDefault();
      const results = await axios(GIPHY_API_URL,{
        params: {
          api_key:  GIPHY_API_KEY,
          q: search,
          limit: 20,
        }
      })
      console.log(results);
      setData(results.data.data);
      setIsLoading(false);
  };

  const handleSubmit = async (event: any) => {
    
      setIsLoading(true)
      event.preventDefault();
      const results = await axios(GIPHY_API_URL,{
        params: {
          api_key:  GIPHY_API_KEY,
          q: search,
          limit: 20,
        }
      })
      console.log(results);
      setData(results.data.data);
      setIsLoading(false);
  }

  const renderGifs = () => {
    if(isLoading){
      return <Loader className=" pt-32" />
    }
    return currentItems.map((el: any) => {

      return <div key={el.id} className='gif flex flex-col size-2/12'>
              <img 
                src={el.images.fixed_height.url} 
                className='rounded-xl'
              />
              <div className="flex items-start gap-4 pt-4 justify-between">
                <div>
                  <p className=" text-slate-700 text-xl font-bold">{el.title}</p>
                  <p className=" text-slate-500">@{el.username}</p>
                </div>
                <div className="grid size-12 justify-end">
                  <button ><img src="/star.svg" alt="B" className=" w-6 h-6"/></button>
                </div>
              </div>
            </div>
    })
  }

  const pageSelected = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className='grid gap-2 justify-items-center w-full'>
      <div className= " w-4/6 bg-white rounded-xl mt-10">
        <form action="" method="post" className="flex w-full gap-4 p-4">
          <div className="flex rounded-lg pr-2 pl-2 bg-gray-300 items-center h-auto w-full">
            <img src="../search-icon.svg" alt="" className="h-7 w-7"/>
            <input 
              type="text" 
              className="font-mono bg-gray-300 rounded-lg p-4 h-14 w-full outline-none text-black font-bold"
              placeholder="Artical name or keyword..."
              onChange={handleSearchChange}
              value={search}
            />
          </div>
          <div className="flex rounded-lg p-0 bg-stone-900 items-center h-auto">
            <button 
              className=" bg-stone-900 pl-4 pr-4 rounded-lg h-full w-full font-bold"
              onClick={handleSubmit}
            >
              Search
            </button>
            
          </div>
        </form>
        <div>
        </div>
      </div>
        <div className="flex flex-wrap gap-3 w-full items-center h-fit justify-center">
          {renderGifs()}
        </div>
        <Paginate
          pageSelected={pageSelected}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
        />
    </div>
  );
};

export default Dashboard;
