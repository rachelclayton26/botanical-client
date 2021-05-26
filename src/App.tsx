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
import APIURL from "./helpers/enviornment";

require('dotenv').config();

type GeoState = {
  cityName: string | null,
  zipCode: string | null
  searching: boolean
  isAdmin: boolean
  token: string
  isLoggedIn: boolean
  plantId: number
  userId: number
}

//In order to call functions/methods in the App.tsx (root) file of your react legacy application, you must change the function App() to a class component--ie. class App extends React.Component, then if using typscript, must call the interface or type after that class declaration (see below)

class App extends React.Component<{}, GeoState> {
  constructor() {
    super('')
    let tmpToken= localStorage.getItem("token")
    this.state = {
        cityName: "Everywhere",
        zipCode: "46280",
        searching: false,
        isAdmin: false,
        token: tmpToken? tmpToken : "",
        isLoggedIn: false,
        plantId: 0,
        userId: 0
    }
  };

Searching = () => {
 this.setState({
    searching: true
 })
}

updateUserId = (userId) => {
  this.setState({
     userId: userId
  })
 }

updateToken = (token) => {
  // console.log(token)
  localStorage.setItem("token", token)
  this.setState({
     token: token
  }, () => {
    fetch(`${APIURL}/user`,
    { headers: 
      { "Authorization": "Bearer "+this.state.token }})
      .then (res => res.json)
      .then ((data: any) => {
        if(data.user) {
          this.setState({
            isAdmin: data.user.isAdmin
          })
        }
      })
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
 
AdminCheck = (data) => {
  if(data) {
    if(data.user) {
      this.setState({
        isAdmin: data.user.isAdmin
      })
    }
  }
}

  componentDidMount() {
      this.FetchLocation();
       setTimeout(() => {
          this.Searching()
       }, 500)
      //  console.log("component mounted App.tsx")
       fetch(`${APIURL}/user`,
       { headers: 
         { "Authorization": "Bearer "+ localStorage.getItem("token")}})
         .then (res => res.json())
         .then ((data) => {
           if(data.user) {
             this.setState({
               isAdmin: data.user.isAdmin
             })
           }
         })
    }

FetchLocation = () => {
  // console.log(`${process.env.KEY}`) 
    const APIkey: string= `${process.env.KEY}`
    
    navigator.geolocation.getCurrentPosition((position) => {
        let lat: number= position.coords.latitude;
        let lon: number= position.coords.longitude;
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${APIkey}`)
        .then(res => res.json())
        .then((data) => {
            // console.log(data)
            this.setState({
                cityName: data.results[0].address_components[2].long_name,
                zipCode: data.results[0].address_components[7].long_name
            })
            // console.log(this.state.cityName);
            // console.log(this.state.zipCode);
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
          <Navbar updateUserId={this.updateUserId} cityName= {this.state.cityName} updateToken={this.updateToken} AdminCheck={this.AdminCheck} isLoggedIn= {this.state.isLoggedIn} clearToken={this.clearToken}/>
          <Switch>
          <Route path="/details">
            <Details />
          </Route>
            <Route path="/myfavorites">
              <MyFavorites userId={this.state.userId} token={this.state.token}/>
            </Route>
            <Route path="/">
              <Home zipCode= {this.state.zipCode} plantId={this.state.plantId} token={this.state.token}/>
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
