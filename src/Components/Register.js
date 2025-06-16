import React from "react";
import { useNavigate } from "react-router-dom";


function Register(){

    // const navigateTo = useNavigate()

    // function goToProduct(){
    //     navigateTo("/")
    // }


    return(
        <>
        <div className="welcomeText">
        <h3>Hey there, Welcome to Afrizone.! Thank your for visiting us. To start shopping, please Create an account.</h3>
        </div>

        <div  className="backButton">
        <a className="fontstyle" href="/" ><i class="fa-solid fa-backward-fast"></i> Go to products</a>


        </div>

       
            <form >
                <div className="registration-form">
                <h1>Registration</h1>
                    <div className="registration-caption">
                    <label className="required"><b>Username</b> <i class="fa-solid fa-id-card"></i></label>
                        <input  className="registration-inputs" placeholder="enter your first name" type="text" name="username" autoComplete="off"  required></input>
                    </div>
                    <div className="registration-caption">
                        <label className="required"><b>Email</b> <i class="fa-solid fa-envelope"></i></label>
                        <input className="registration-inputs" placeholder="enter your email"  type="email" name="email"  autoComplete="off"  required></input>
                    </div>
                    <div className="registration-caption">
                   <label className="required"><b>Create a password</b> <i class="fa-solid fa-lock"></i></label>
                        <input className="registration-inputs" placeholder="choose a password"  type="password" name="password"   autoComplete="off" required></input>
                    </div>
                   <div>
                   <button className="registration-button" >Register</button>
                   </div>
                   <div className="signin">
                   <p>You already have an account? <a href="/login">Sign in</a> </p>
                    
                   </div>
                </div>
            </form>
        
        </>
    )
}
export default Register;