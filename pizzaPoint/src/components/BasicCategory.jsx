import React, { useEffect, useState } from 'react'
import ServeBanner from '../assets/imgs/ServeDealsBanner.webp'
import CardLong from './CardLong'
import serve1 from '../assets/imgs/Serve1.webp'
import serve2 from '../assets/imgs/Serve2.webp'
import serve3 from '../assets/imgs/Serve3.webp'
import serve4 from '../assets/imgs/Serve4.webp'
import serve5 from '../assets/imgs/Serve5.webp'
import serve6 from '../assets/imgs/Serve6.webp'
import { useAuth } from '../utils/useAuth';
import { useContext } from 'react'

function BasicCategory({ Banner, items, category }) {
  const {token} = useAuth();
  // console.log(AuthData);
  // const data = fetch('http://localhost:8082/api/menuItem/get/category/PIZZA', {
  //   headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLGpvaG5AZXhhbXBsZS5jb20sVVNFUiIsImlhdCI6MTc0MDkxNzUxMywiZXhwIjoxNzQwOTE5MzEzfQ._q4z9JOeAEMoIvw57Jlt3LGnxFTYTrIo3j-yhZt6gg8'}
  // })
  //    .then(resp => resp.json())
  //    .then(json => JSON.stringify(json))
  //     .catch(err => console.error(err));
  // console.log(data);

  const [data, setData] = useState([]);
  useEffect(() => {
    const controller = new AbortController(); // Create controller for aborting requests
    const { signal } = controller; // Extract signal from the controller

    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8082/api/menuItem/get/category/${category}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal, // Attach the signal to the fetch request for cancellation
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const json = await response.json();
        setData([ ...json]); // Prevent overwriting data
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.log("Error fetching data:", error.message);
          console.log(token)
        }
      }
    }

    fetchData();

    return () => controller.abort(); // Abort the request when component unmounts or token changes
    
  }, [token]); // Trigger fetch when the token changes
  // console.log(data);


  return (
    <>
    <div id={category}>

        <div  className='w-full mt-8'>
            <img className="rounded-xl" src={Banner} alt="" />
        </div>
        <div className='mt-7 grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {data.map((item) => (
            item.size == "MEDIUM" || item.size =="REGULAR" ? <CardLong item={item} key={item.id} img={item.imageUrl} title={item.name} price={item.price} description={item.description} size={item.size} id={item.id}/> : null
          ))}
            {/* <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" /> */}
        </div>
    </div>
    </>
  )
}

export default BasicCategory;
