import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from './components/Navbar/Navbar';
import Navbar2 from './components/Navbar/Navbar2';
import Home from './components/Home';
import Home2 from './components/Home2';
import Create from './components/Create';
import EditDelete from './components/EditDelete';
import MyFavorites from './components/MyFavorites';
import Footer from './components/Footer';
import Details from './components/Details';

require('dotenv').config();

// type Nav = {
//   cityName: string | null;
// }
type GeoState = {
  cityName: string | null,
  zipCode: string | null
  searching: boolean
  isAdmin: boolean
  token: string
  // showModal: boolean
  // results: geoData[] | null
}

//In order to call functions/methods in the App.tsx (root) file of your react legacy application, you must change the function App() to a class component--ie. class App extends React.Component, then if using typscript, must call the interface or type after that class declaration (see below)

class App extends React.Component<{}, GeoState> {
  constructor() {
    super('')
    this.state = {
        cityName: "Indianapolis",
        zipCode: "46280",
        searching: false,
        isAdmin: false,
        token: ""
        // showModal: false
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

AdminCheck = (isAdmin) => {
  console.log(isAdmin)
  this.setState({
    isAdmin: isAdmin
})
}
  componentDidMount() {
      this.FetchLocation();
       setTimeout(() => {
          this.Searching()
       }, 500)
       console.log("component mounted 1")
      // this.handleOpenModal = this.handleOpenModal.bind(this);
      // this.handleCloseModal = this.handleCloseModal.bind(this);
    }

FetchLocation = () => {
  console.log(`${process.env.KEY}`) 
    const key: string= `AIzaSyA60T7NoarUbeA_bfM_zeq6m3dkTcTkTiQ`
    
    navigator.geolocation.getCurrentPosition((position) => {
        let lat: number= position.coords.latitude;
        let lon: number= position.coords.longitude;
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
    fetch(`====>https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`)
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
  
    // handleOpenModal () {
    //   this.setState({ showModal: true });
    // }
  
    // handleCloseModal () {
    //   this.setState({ showModal: false });
    // }
  
    // public modalState () {
    //   const stateRef = this.state;
    //   return stateRef["showModal"];
    // }


  render() {
  return (
    <div className="App">
      {this.state.searching ? this.state.isAdmin ? 
      <Router>
      <div>
        <Navbar2 />
        <Switch>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/">
            <EditDelete />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
   :  
      <Router>
        <div>
          <Navbar cityName= {this.state.cityName} updateToken={this.updateToken} AdminCheck={this.AdminCheck}/>
          <Switch>
          <Route path="/details">
            <Details />
          </Route>
            <Route path="/myfavorites">
              <MyFavorites />
            </Route>
            <Route path="/login_signup">
              {/* <LoginSignUp /> */}
              {/* <button onClick={this.handleOpenModal}>Trigger Modal</button>
                <Modal isOpen={this.modalState()} contentLabel="Minimal Modal Example">
                    <form>
                      <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email"/>                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="password"/>
                      </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                  <button onClick={this.handleCloseModal}>Close Modal</button>
                </Modal> */}
            </Route>
            <Route path="/allplants">``
              {/* <AllPlants /> */}
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/edit_delete">
              <EditDelete token={this.state.token}/>
            </Route>
            <Route path="/">
              <Home zipCode= {this.state.zipCode}/>
              {/* 
              <AllPlants /> 
              <CreatePlant /> 
              */}
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
