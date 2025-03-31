import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";

function Productpage(){

    const [products, setProducts] = useState([])

    useEffect(() => {
       axios.get("http://localhost:5001/productList")
       .then(res=>{
        setProducts(res.data)
        })
       .catch(error=>{
        console.log(error)
       })
    }, []);

    // const addToCart = (productId, quantity = 1)=>{
    //     axios.post("http://localhost:5001/cart", {
    //         product_id: productId,
    //         quantity
    //     })
    //     .then(res=>console.log("Product added:", res.data))
    //     .catch(error=>{
    //         console.log("Error adding product to cart:", error)
    //     })


    // }

    // const addToCart = (product) => {
    //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
    //     cart.push(product);
    //     localStorage.setItem("cart", JSON.stringify(cart));
    //     alert("Product added to cart!");
    //     console.log(cart)
    //   };
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        // let amount;
      
        // Check if product already exists in the cart
        let existingProduct = cart.find(item => item.product_id === product.product_id);
      
        if (existingProduct) {
          // If product exists, increase its quantity
          existingProduct.quantity += 1;
        } else {
          // If product doesn't exist, add it with quantity 1
          cart.push({ ...product, quantity: 1 });
        }
        
      
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
      };

    return(
        <>
        <Navbar/>
        <h2>All Products</h2>
    <div className="productPAge-Title">
    {/* {getUser?.username && <h1 className="user-Navbar">Welcome to Afrizone, {getUser.username}</h1>}   */}
    {/* <button onClick={goToCart} className="cartAndLogout">Cart</button>
    <button className="cartAndLogout" onClick={logOut}>Log out</button> */}

    </div>
   
    {
        products.map(product=>(
       <div className="Product-container" key={product.product_id} >
        <div>
        <div className="imageContainer1">
        <img alt={product.product_name} src={product.product_image} className="product-image"></img>
        </div>
         <h3><a href={product.product_description}>{product.product_name}</a></h3>
        <div className="productDescription">     
        <b >Details:</b>
        {product.product_description.slice(0, 20)}...<a href={product.product_description}>read more</a>
        </div>
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