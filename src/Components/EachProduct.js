import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EachProducts = ({singleProduct})=>{
    const {id} = useParams();
    console.log(useParams())

    const navigate = useNavigate()
    

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const addToCart = async (product) => {
        let existingProduct = cart.find(item => item.id === product.id);
      
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
      
        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/cart")
        toast.success(`Successfully added to your cart`,{
            position: "top-left",
            autoClose: 2000
            
          })
      };

      const checkout = async (product) => {
        let existingProduct = cart.find(item => item.id === product.id);
      
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
      
        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/checkout")
        toast.success(`Successfully added to your cart`,{
            position: "top-left",
            autoClose: 2000
            
          })
      };
   const product = singleProduct.find(p =>p.id === parseInt(id));
    if(!product) return(<p>Product no fund..!</p>)
    return<>

    <Navbar cart = { cart.length}/>
     
    <a className="fontstyle" href="/" ><i className="fa-solid fa-backward-fast"></i> Keep Shopping</a>
    <div className="detailsContainer">
    <h2 className="ProductDetailName">{product.product_name}</h2>
  
   <img src={product.product_image} alt={product.product_name} className="productDetailImage"/> 
      <p className="ProductDetailsDescription">{product.product_description}</p>
      <p className="displayDetailsPrice">Price: ${product.product_price}</p>
      <button className="detailsButton detailsAddTocart" onClick={()=>addToCart(product)}>+ Add to Cart</button>
      <button className="detailsButton detailsShopNow" onClick={()=>checkout(product)}>Shop Now</button>
      
    </div>
     


    </>
}

export default EachProducts;