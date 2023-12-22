// utils/giphy.ts
import { Loader } from '@giphy/react-components';
import axios from 'axios';
import React, {useEffect, useState} from 'react';


const GIPHY_API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/trending';

const Giphy: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const results = await axios(GIPHY_API_URL, {
        params: {
          api_key : GIPHY_API_KEY,
          limit: 10
        },
      },);
      console.log(results);
      setData(results.data.data);
      setIsLoading(false);
    } 
    fetchData();
  },[]);

  const renderGifs = () => {
    
    if(isLoading){
      return <Loader />
    }
    return data.map(el => {
      return <div key={el.id} className='gif'>
              <img 
                src={el.images.fixed_height.url} 
                className='rounded-md'
              />
            </div>
    })
  }

  return <>{renderGifs()}</>
};

export default Giphy;
