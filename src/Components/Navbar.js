
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({cart}){

    const navigateTo = useNavigate();
  
     function productPage(){
      navigateTo("/")
     }

    return(
        <>
        <div className="navbar">
        <h1 onClick={productPage} className="firstList-title">Welcome to Afrizone</h1>
       <a className="shoppingCartIcon" href="/cart"><i className="fa-solid fa-cart-shopping">{cart}</i></a>
            <Link  to="/"></Link>
            
        </div>
        </>
    )
}

export default Navbar;