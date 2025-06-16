import React from "react";
// import { useNavigate } from "react-router-dom";


function Login(){

    // const navigateTo = useNavigate();

    // function navigateToProduct(){
    //     navigateTo("/")
    // }

    // function goToRegister(){
    //     navigateTo("/registration")
    // }


    return(
        <>

    <div className="welcomeText">
    <h3>Please Log in to start shopping.</h3>
    </div>
    <div className="backButton">
    <a className="fontstyle" href="/registration"><i class="fa-solid fa-backward-fast"></i> Go to products</a>

    </div>

        <form >
            <div className="registration-form loginContainer">
                <h1>Login</h1>
                <div>
                    <label className="required"><b>Email</b> <i class="fa-solid fa-envelope"></i></label>
                    <input placeholder="enter your registration email..."
                        
                        name="email"
                        type="email"
                        autoComplete="off" >
                        
                    </input>
                </div>
                <div>
                    <label className="required"><b>Password</b>  <i class="fa-solid fa-lock"></i></label>
                    <input placeholder="enter your password..." size={50} 
                        name="password"
                        type="password"
                        className="loginPasswordInput"
                        autoComplete="off"
                    ></input>
                </div>
                <div>
                    <button className="registration-button">Login</button>
                    <div className="signin">
                        <p>You don't have an account? <a href="/registration">Register</a> </p>
                    
                        </div>

                </div>
            </div>
        </form>
    
        
        </>
    )
}

export default Login;