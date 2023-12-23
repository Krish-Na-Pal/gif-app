"use client"; // This is a client component 👈🏽

// components/Dashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "@giphy/react-components";
import Paginate from "./Paginate";
import toast from "react-hot-toast";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { giphyConfig } from "@/lib/giphy";

const GIPHY_API_KEY = giphyConfig.apiKey;
const giphyUrl = 'https://api.giphy.com/v1/gifs/search';


const Dashboard: React.FC = () => {
  const [user] = useAuthState(auth);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage*itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const router = useRouter();

  useEffect(() => {
    if (!user) return router.push('/login');
  }, [user]);

  const handleSearchChange = async (event: any) => {
    try {
      setSearch(event.target.value);
      setIsLoading(true)
        event.preventDefault();
        const results = await axios(giphyUrl,{
          params: {
            api_key: GIPHY_API_KEY,
            q: search,
            limit: 25,
          }
        })
        setData(results.data.data);
        setIsLoading(false);
    } catch (error) {
      toast.error("Unable to get GIFs, Please try again later.");
    }
  };

  const handleSubmit = async (event: any) => {
    
      setIsLoading(true);
      event.preventDefault();

      try {
        const results = await axios(giphyUrl,{
          params: {
            api_key: GIPHY_API_KEY,
            q: search,
            limit: 20,
          }
        })
        setData(results.data.data);

      } catch (error) {
        toast.error("Unable to get GIFs.Please try again later.");
      }
      setIsLoading(false);
  }

  const renderGifs = () => {
    if(isLoading){
      return <div className="mt-32"><Loader /></div>
    }
    return currentItems.map((el: any) => {

      return <div key={el.id} className='gif flex md:flex-col gap-4 pl p-2 md:size-3/12'>
              <div className='flex justify-center md:justify-start h-28 w-28 md:h-96 md:w-96'>
                <img 
                  src={el.images.fixed_height.url} 
                  className='rounded-xl md:w-full'
                />
              </div>
              <div className="flex items-start gap-4 md:pt-4 justify-between">
                <div>
                  <p className=" text-slate-700 text-xl font-bold">{el.title}</p>
                  <p className=" text-slate-500">@{el.username}</p>
                </div>
                <div className="grid size-12 justify-end items-start md:justify-start">
                  <button ><img src="/star.svg" alt="B" className=" w-6 h-6"/></button>
                </div>
              </div>
            </div>
    })
  }

  const pageSelected = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  return (<>
  <nav>
    <div className="grid justify-items-end p-4">
      <button 
        className="font-bold bg-blue-950 rounded-md p-3 hover:bg-blue-800"
        onClick={() => {signOut(auth)}}
      >LogOut</button>
    </div>
  </nav>
    <div className='grid gap-2 justify-items-center w-full'>
      <div className= "w-5/6 md:w-4/6 md:bg-white rounded-xl">
        <form action="" method="post" className="flex w-full gap-4 md:p-4">
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
        <div className="sm:grid md:flex md:flex-wrap md:p-10 w-full items-center h-fit justify-center pb-20">
          {renderGifs()}
        </div>
          <Paginate
            pageSelected={pageSelected}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
          />
    </div>
    </>
  );
};

export default Dashboard;
