import React, { useEffect, useState } from 'react'
import ServeBanner from '../assets/imgs/ServeDealsBanner.webp'
import CardLong from './CardLong'
import serve1 from '../assets/imgs/Serve1.webp'
import serve2 from '../assets/imgs/Serve2.webp'
import serve3 from '../assets/imgs/Serve3.webp'
import serve4 from '../assets/imgs/Serve4.webp'
import serve5 from '../assets/imgs/Serve5.webp'
import serve6 from '../assets/imgs/Serve6.webp'

function ServeDeals({token}) {

  // const data = fetch('http://localhost:8082/api/menuItem/get/category/PIZZA', {
  //   headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLGpvaG5AZXhhbXBsZS5jb20sVVNFUiIsImlhdCI6MTc0MDkxNzUxMywiZXhwIjoxNzQwOTE5MzEzfQ._q4z9JOeAEMoIvw57Jlt3LGnxFTYTrIo3j-yhZt6gg8'}
  // })
  //    .then(resp => resp.json())
  //    .then(json => JSON.stringify(json))
  //     .catch(err => console.error(err));
  // console.log(data);

  const [data, setData] = useState([]);
  useEffect(()=>{
    const controler = new AbortController();
    async function fetchData(){
      try {
        console.log(token)
        const response = await fetch('http://localhost:8082/api/menuItem/get/category/PIZZA', {
          headers: {Authorization: `Bearer ${token}`},
          // signal: controler.signal,
        })

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error)
      }
    } fetchData();

    // return () => controler.abort();
  },[token])
  console.log(data);


  return (
    <>
        <div id='serveDeals' className='w-full mt-8'>
            <img className="rounded-xl" src={ServeBanner} alt="" />
        </div>
        <div className='mt-7 grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {data.map((item) => (
            <CardLong key={item.id} img={item.imageUrl} title={item.name} price={item.price} description={item.description} size={item.size} />
          ))}
            {/* <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price={449} descreption="1 Small Pizza" /> */}
        </div>
    </>
  )
}

export default ServeDeals