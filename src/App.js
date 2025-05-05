import React, { useState, useEffect } from "react";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import CreateTodo from "./components/CreateTodo";   
import "./index.css";  // Importing CSS styles

function App() {
    const [ user, setUser ] = useState([]);   // State to store user data 
    const [ profile, setProfile ] = useState("");  // State to store user profile data

    const login = useGoogleLogin({  // Function to handle Google login
        onSuccess: (codeResponse) => {  // Callback function on successful login
            setUser(codeResponse);
        },  
        onError: (error) => console.log("Login Failed:", error),
    });

    // useEffect to fetch user profile data after successful login
    // It checks if the user has an access token, and if so, it fetches the user's profile data from Google API
    useEffect(() => {
        if (user?.access_token) {   // Check if the user has an access token
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: "application/json",
                },
            })
                .then((res) => {
                    setProfile(res.data);  // Set the profile data in state
                })
                .catch((err) => console.log(err));
        }

    }, [ user ]);  // Dependency array to re-run the effect when user changes

    const logOut = () => {  // Function to log out the user
        googleLogout();  // Call the googleLogout function to log out the user
        setProfile(null);  // Clear the profile data
        setUser(null);  // Clear the user data
        console.log("User logged out successfully");
    };

    return (
        <div className="App-contanier">
            <h2 className="header">React Google Login</h2>
            <br />
            {profile ? (
                <div className="profile-container">
                    <img className="profile-iumage" src={profile.picture} alt="profile" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <p>Id: {profile.id}</p>
                    <p>Access Token: {user.access_token}</p>
                    <br />
                    <button onClick={logOut} className="logout-button">Log out</button>
                </div>
            ) : (
                <button onClick={login} className="login-button">Sign in with Google </button>
            )}
            <br />
            <CreateTodo  isSignedIn={profile} />  {/* Component to create a new todo */}
        </div>
    )
}

export default App;