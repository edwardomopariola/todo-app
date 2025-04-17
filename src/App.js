import React, { useState, useEffect } from "react";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function App() {
    const [ user, setUser ] = useState([]);   // State to store user data 
    const [ profile, setProfile ] = useState([]);  // State to store profile data

    const login = useGoogleLogin({  // Function to handle Google login
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error),
        scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"

    });

    // useEffect to fetch user profile data after successful login
    // It checks if the user has an access token, and if so, it fetches the user's profile data from Google API
    useEffect(() => {
        if (user?.access_token) {
            console.log("Access Token:", user.access_token);
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: "application/json",
                },
            })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
        [ user ];
    });

    const logOut = () => {  // Function to log out the user
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="profile" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <p>Id: {profile.id}</p>
                    <p>Access Token: {user.access_token}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google </button>
            )}
        </div>
    )
}

export default App;