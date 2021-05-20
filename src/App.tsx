import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import MyFavorites from './components/MyFavorites';
import Footer from './components/Footer';
// import LoginSignUp from './components/LoginSignUp';

require('dotenv').config();

type GeoState = {
  cityName: string | null,
  zipCode: string | null
  // results: geoData[] | null
}

class FetchGeo extends React.Component <{}, GeoState>{
  constructor() {
    super('')
    this.state = {
        cityName: null,
        zipCode: null
    }
  };
  
componentDidMount() {
      this.FetchLocation();
      console.log("component mounted 1")
   }

FetchLocation = () => {
  console.log("component mounted") 
    const key: string= `${process.env.PORT}`
    
    navigator.geolocation.getCurrentPosition((position) => {
        let lat: number= position.coords.latitude;
        let lon: number= position.coords.longitude;
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            this.setState({
                cityName: data.results[0].address_components[2].long_name,
                zipCode: data.results[0].adress_components[7].long_name
            })
        })
        .catch(console.log)
        console.log(this.state.cityName);
        console.log(this.state.zipCode);
    }
  )
}};

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/myfavorites">
              <MyFavorites />
            </Route>
            <Route path="/login_signup">
              {/* <LoginSignUp /> */}
            </Route>
            <Route path="/">
              <Home/>
              {/* 
              <AllPlants /> 
              <CreatePlant /> 
              */}
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
