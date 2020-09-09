import React, { useEffect } from "react";
import "./App.css";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  button: {
    padding: "0.5rem",
    margin: "0.5rem",
    minWidth: "100px",
    textTransform: "capitalize",
  },
});

function App() {
  // Use the Material UI Styles
  const classes = useStyles();

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
  let testLogin; // test login info

  // Assign all elements inside the useEffect hook
  useEffect(() => {
      // eslint-disable-next-line
    txtEmail = document.getElementById("txtEmail");
    // eslint-disable-next-line
    txtPassword = document.getElementById("txtPassword");
    // eslint-disable-next-line
    btnLogin = document.getElementById("btnLogin");
    // eslint-disable-next-line
    btnSignUp = document.getElementById("btnSignUp");
    // eslint-disable-next-line
    btnLogout = document.getElementById("btnLogout");
    // eslint-disable-next-line
    loginMessage = document.getElementById("loginMessage");
    // eslint-disable-next-line
    testLogin = document.getElementById("testLogin");
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
      testLogin.style.display = "none";
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
      testLogin.style.display = "block";
    }
  });

  return (
    <div className="App">
      <div id="ImageSection"></div>
      <div id="FormSection">
        <div className="container">
          <h1>Hi, Firebase Authentication</h1>
          <p id="testLogin">Sample- email: test@email.com, pass: 123456</p>
          <p id="loginMessage">You are logged in!</p>

          <input id="txtEmail" type="email" placeholder="Email" />
          <input id="txtPassword" type="password" placeholder="Password" />

          <Button
            variant="contained"
            color="primary"
            id="btnLogin"
            className={classes.button}
            onClick={onLogin}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            id="btnSignUp"
            className={classes.button}
            onClick={onSignUp}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="primary"
            id="btnLogout"
            className={classes.button}
            onClick={onLogout}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
