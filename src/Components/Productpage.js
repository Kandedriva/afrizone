import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";

function Productpage(){

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("");
    // const [isloading, setIsloading] = useState(true)
    console.log(search)
    

    useEffect(() => {
       axios.get("https://afrizone-1.onrender.com/productList")
       .then(res=>{
        setProducts(res.data)
        // setIsloading(false)
        })
       .catch(error=>{
        // setIsloading(false)
        console.log(error)
       })
    }, []);

    function proof(){
      console.log("I'm working, don't you worry...!")
    }

   
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const addToCart = (product) => {
        let existingProduct = cart.find(item => item.product_id === product.product_id);
      
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        
      
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
      };

    return(
        <>
        <Navbar cart = { cart.length}/>
        <h2>All Products</h2>

        <div className="quantity">
  <input type="text"
   className="search-input" 
   placeholder="Search products by names..."
   onChange={(e)=>setSearch(e.target.value)}
   name = "result"
></input>
  <button className="search-product-button" aria-label="Increase" type="submit" onClick={proof}><i className="fa-solid fa-magnifying-glass"></i></button>
</div>
    <div className="productPAge-Title">

    </div>
   
    {
        products.filter((product)=>{
      return search.toLowerCase() === "" ? product : product.product_name.toLowerCase().includes(search.toLowerCase())
          }).map(product=>(
       <div className="product-container" key={product.product_id} >
        <div>
        <div className="imageContainer1">
        <img alt={product.product_name} src={product.product_image} className="product-image"></img>
        </div>
         <h3><a href={product.product_description}>{product.product_name}</a></h3>
        <div>
        <p className="single-price"><b>Price : ${product.product_price}</b></p>
        <button className="cart-button" onClick={() => addToCart(product)}>+ Add To Cart</button>
        </div>
        </div>
       </div>
       
 
        ))
    }

    </>
    )
}

export default Productpage




