import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import Routes from "./Routes/Routes";
import Login from "./Pages/Login";
import AddUser from "./Pages/AddUser";
import firebase from 'firebase/app'
import 'firebase/auth'
import { useContext, useEffect, useState } from "react";
import AuthContext from './components/config/context'


var firebaseConfig = {
  apiKey: "AIzaSyChETdD91w8SK5_6b9mB3utmwgbmvW3-pM",
  authDomain: "connection-6692a.firebaseapp.com",
  projectId: "connection-6692a",
  storageBucket: "connection-6692a.appspot.com",
  messagingSenderId: "707043999808",
  appId: "1:707043999808:web:a2e5418f029947096cdfa5",
  measurementId: "G-CE2QJW6R6B"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("hogya")
}


function App() {
  const [user , setUser] = useState()
  const authContext = useContext(AuthContext)
  
  
  function getUser() {
    const u = localStorage.getItem('user')
    if(u==null || u=='') {
      console.log('no user')
      return
    }
    const us = JSON.parse(u)
    setUser(us)
    
  }
  
  useEffect(() => {
    localStorage.setItem('webpath',window.location)
    // localStorage.setItem('webpath',"http://localhost:3000/")

    getUser()
}, [])

  return (<AuthContext.Provider value = {{user, setUser}}>
    {user ?<Routes/>:<Login/>}
  </AuthContext.Provider>);
 
}

export default App;
