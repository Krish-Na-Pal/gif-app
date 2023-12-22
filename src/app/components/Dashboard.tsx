"use client"; // This is a client component 👈🏽

// components/Dashboard.tsx
import { useState } from "react";
import Giphy from "@/utils/giphy";
import axios from "axios";
import { Loader } from "@giphy/react-components";
import Paginate from "./Paginate";


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
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
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
      return <Loader />
    }
    return currentItems.map((el: any) => {
      return <div key={el.id} className='gif'>
              <img 
                src={el.images.fixed_height.url} 
                className='rounded-md'
              />
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
              className=" bg-stone-900 pl-4 pr-4 rounded-lg h-full w-full"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </form>
        <div>
        </div>
      </div>
        <div className="flex flex-wrap gap-3 justify-center">
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
