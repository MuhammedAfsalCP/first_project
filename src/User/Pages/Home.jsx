import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Pascomponent } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate=useNavigate()
  const [products, setProducts] = useState([])
  const {filteredProducts,setFilteredProducts,specificcart,setSpecificcart,email,userid,cartadd,search}=useContext(Pascomponent)
  const {itemfilter,user}=useContext(Pascomponent)
  const click=(cart_id,index)=>{
    setSpecificcart(cart_id)
    navigate(`/${index}`)
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Prudocts"); // Corrected URL
        setProducts(response.data); // Set the products state with the response data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
 useEffect(()=>{
  const filterProducts = () => {
    if (itemfilter === true) {
      return products.filter((item) => item.category === "Dog Food");
    } else if (itemfilter === false) {
      return products.filter((item) => item.category === "Cat Food");
    } else {
      return products;
    }
 }
 setFilteredProducts(filterProducts());
}, [itemfilter, products])
  return (
    <div className='w-[100vw] bg-[#fcf8ef]'>
      <Navbar />
      <div className='pt-[80px] min-h-[60vh] w-[100vw] bg-[#fcf8ef] flex justify-evenly flex-wrap gap-y-6'>
       {filteredProducts.filter((cart)=>{
        return search.toLowerCase()==""?cart:cart.name.toLowerCase().includes(search);
       }).map((cart,index)=>{
        return (
          <div key={cart.id} className='w-[300px] h-[300px] bg-[#ede4e4]  rounded shadow-xl'>
          <div className='flex w-[300px] h-[150px] justify-center items-center'>
            <div className=' w-[120px] h-[120px] overflow-hidden'>
           <img className='object-contain w-full h-full' src={cart.image} alt="" />
            </div>
          </div>
          <div className='flex w-[300px] h-[50px] justify-around items-center flex-wrap'>
            <h1 >{cart.name}</h1>
            </div>
            <div className='flex w-[300px] h-auto justify-around items-center flex-wrap'>
            <h1 >Price = ${cart.price}</h1>
            </div>
          <div className='flex w-[300px] h-[75px] mt-4 justify-around'>
              <button onClick={()=>cartadd(cart)} className='bg-yellow-400 h-[50px] w-[100px] rounded hover:bg-yellow-600 hover:text-white'>Add to Cart</button>
             
              <button onClick={()=>click(cart.id,index)} className='bg-green-400 text-white h-[50px] w-[100px] rounded hover:bg-green-600 hover:text-white'>View Details</button>
          </div>
        </div>
        )
       })}
      
      </div>
      <Footer />
    </div>
  );
};

export default Home;

