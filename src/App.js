import React, { useEffect } from "react";
import "./App.css";
import firebase from "firebase";

function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCs1gnN2k_qGVxfARxwPSLsjJDq3wDk0vs",
    authDomain: "fir-authentication-53e84.firebaseapp.com",
    databaseURL: "https://fir-authentication-53e84.firebaseio.com",
    projectId: "fir-authentication-53e84",
    storageBucket: "fir-authentication-53e84.appspot.com",
    messagingSenderId: "1029350309003",
    appId: "1:1029350309003:web:5f586c4442bc4b43b1688e",
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // Declare all elements
  let txtEmail; // 'email' text field
  let txtPassword; // 'password' text field
  let btnLogin; // 'login' button
  let btnSignUp; // 'signup' button
  let btnLogout; // 'logout' button
  let loginMessage; // login message

  // Assign all elements inside the useEffect hook
  useEffect(() => {
    txtEmail = document.getElementById("txtEmail");
    txtPassword = document.getElementById("txtPassword");
    btnLogin = document.getElementById("btnLogin");
    btnSignUp = document.getElementById("btnSignUp");
    btnLogout = document.getElementById("btnLogout");
    loginMessage = document.getElementById("loginMessage");
  }, []);

  // Add login event
  const onLogin = () => {
    console.log("Retreiving email and password values...");
    // Get email and password values
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    if (email === "" || pass === "") {
      alert("Please include a valid Email and Password!");
    } else {
      // Sign in
      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch((e) => console.log(e.message));
      // Reset the Email and Password text fields
      txtEmail.value = "";
      txtPassword.value = "";
    }
  };

  // Add signup event
  const onSignUp = () => {
    console.log("Creating email and password values...");
    // Create email and password values
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Reset the Email and Password text fields
    txtEmail.value = "";
    txtPassword.value = "";
    // Sign up
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch((e) => console.log(e.message));
  };

  // Add logout event
  const onLogout = () => {
    firebase.auth().signOut();
  };

  // Add a realtime listener
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser);
      // show 'Logout' button and 'Login Message'
      btnLogout.style.display = "inline";
      loginMessage.style.display = "block";
      // hide rest
      txtEmail.style.display = "none";
      txtPassword.style.display = "none";
      btnLogin.style.display = "none";
      btnSignUp.style.display = "none";
    } else {
      console.log("not logged in");
      // hide 'Logout' button and 'Login Message'
      btnLogout.style.display = "none";
      loginMessage.style.display = "none";
      // show rest
      txtEmail.style.display = "block";
      txtPassword.style.display = "block";
      btnLogin.style.display = "inline";
      btnSignUp.style.display = "inline";
    }
  });

  return (
    <div className="App">
      <h1>Hi, Firebase Authentication</h1>
      <p id="loginMessage">You are logged in!</p>

      <div className="container">
        <input id="txtEmail" type="email" placeholder="Email" />
        <input id="txtPassword" type="password" placeholder="Password" />

        <button id="btnLogin" className="btn" onClick={onLogin}>
          Log In
        </button>
        <button id="btnSignUp" className="btn" onClick={onSignUp}>
          Sign Up
        </button>
        <button id="btnLogout" className="btn" onClick={onLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default App;
