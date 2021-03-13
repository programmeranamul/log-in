import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);



function App() {

  const provider = new firebase.auth.GoogleAuthProvider();

  const [user, setUser] = useState({
    isLogedIn : false, 
    name: "",
    email : '',
    photo : ''
  })

  const handelSingOut = () => {
    firebase.auth().signOut().then(() => {
      const logOutUser = {
        isLogedIn : false, 
        name: "",
        email : '',
        photo : ''
      }
      setUser(logOutUser)


    }).catch((error) => {
      console.log(error);
    });
  }

  const handelSingIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      const {photoURL,displayName,email} = result.user;
      const singInUser = {
        isLogedIn : true,
        name : displayName,
        email : email,
        photo : photoURL
      }
      setUser(singInUser)
      console.log(photoURL,displayName,email);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="App">
      {
      user.isLogedIn ? <button onClick = {handelSingOut}>Sing Out</button> : <button onClick = {handelSingIn}>Sing in</button>  
    
    } 
      
      
        {user.isLogedIn && <div>
            <h2>Hello Mr . {user.name}</h2>
            <h4>Your Email : {user.email}</h4>
            <img src={user.photo} alt=""/>
          </div>}
      
    </div>
  );
}

export default App;
