import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from './components/Navbar/Navbar';
import Navbar2 from './components/Navbar/Navbar2';
import Home from './components/Home';
import Create from './components/Create';
import EditDelete from './components/EditDelete';
import MyFavorites from './components/MyFavorites';
import Footer from './components/Footer';
import Details from './components/Details';

require('dotenv').config();

type GeoState = {
  cityName: string | null,
  zipCode: string | null
  searching: boolean
  isAdmin: boolean
  token: string
  isLoggedIn: boolean
  plantId: number
}

//In order to call functions/methods in the App.tsx (root) file of your react legacy application, you must change the function App() to a class component--ie. class App extends React.Component, then if using typscript, must call the interface or type after that class declaration (see below)

class App extends React.Component<{}, GeoState> {
  constructor() {
    super('')
    this.state = {
        cityName: "Everywhere",
        zipCode: "46280",
        searching: false,
        isAdmin: false,
        token: "",
        isLoggedIn: false,
        plantId: 0
    }
  };

Searching = () => {
 this.setState({
    searching: true
 })
}

updateToken = (token) => {
  console.log(token)
  localStorage.setItem("token", token)
  this.setState({
     token: token
  })
 }

 clearToken = () => {
   if(this.state.isAdmin === true){
     localStorage.removeItem("token") 
     this.setState({
       isLoggedIn: false,
       token: "",
       isAdmin: false
      })
   } else {
    localStorage.removeItem("token") 
    this.setState({
    isLoggedIn: false,
    token: "",
  })
   }
 }
 
AdminCheck = (isAdmin) => {
  if(isAdmin === undefined){
    this.setState ({
      isAdmin: false
    })
  } else {
  console.log(isAdmin.user.isAdmin)
  this.setState({
    isAdmin: isAdmin.user.isAdmin
  })
}
}
  componentDidMount() {
      this.FetchLocation();
       setTimeout(() => {
          this.Searching()
       }, 500)
       console.log("component mounted 1")
    }

FetchLocation = () => {
  console.log(`${process.env.KEY}`) 
    const APIkey: string= `AIzaSyA60T7NoarUbeA_bfM_zeq6m3dkTcTkTiQ`
    
    navigator.geolocation.getCurrentPosition((position) => {
        let lat: number= position.coords.latitude;
        let lon: number= position.coords.longitude;
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
    fetch(`====>https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${APIkey}`)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            this.setState({
                cityName: data.results[0].address_components[2].long_name,
                zipCode: data.results[0].address_components[7].long_name
            })
            console.log(this.state.cityName);
            console.log(this.state.zipCode);
        })
        .catch(console.log)
    }
    )
};

  render() {
  return (
    <div className="App">
      {this.state.searching ? this.state.isAdmin ? 
      <Router>
      <div>
        <Navbar2 isLoggedIn= {this.state.isLoggedIn} clearToken={this.clearToken}/>
        <Switch>
          <Route path="/create">
            <Create token={this.state.token} />
          </Route>
          <Route path="/">
            <EditDelete plantId={this.state.plantId} token={this.state.token}/>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
   :  
      <Router>
        <div>
          <Navbar cityName= {this.state.cityName} updateToken={this.updateToken} AdminCheck={this.AdminCheck} isLoggedIn= {this.state.isLoggedIn} clearToken={this.clearToken}/>
          <Switch>
          <Route path="/details">
            <Details />
          </Route>
            <Route path="/myfavorites">
              <MyFavorites />
            </Route>
            <Route path="/">
              <Home zipCode= {this.state.zipCode} plantId={this.state.plantId}/>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router> : <p>Loading...</p>}
    </div>
  );
}
}

export default App;
