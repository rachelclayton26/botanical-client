import React, { Component } from 'react';
// import SignupLogin from "./SignupLogin";
import {Link} from "react-router-dom";
import LogoImg from "./logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';


class Navbar extends React.Component {
//props cityname
    render() {
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
        <Link to="/">
            <div className="logoContainter">
                <div className="navbar-brand" id="logo">LOCAL BOTANICAL FINDER
                {/* <img id="logo" src={LogoImg} alt="company logo"/> */}
                </div>
            </div>
        </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">

                    <li className="nav-item">
                             <div className="nav-item-item">login/ sign up
                             {/* <SignupLogin updateToken = {updateToken} clearToken={clearToken} /> */}
                             </div>
                    </li>
                    
                    <li className="nav-item">
                    <Link className="nav-item-item" to="/myfavorites">my favorites</Link>
                    </li>

                    <li className="nav-item" id="cityName">
                        <div className="nav-item-item">
                            <div className="cityNameLable">Plants Suitable For</div>
                            <div className="cityNameFont">Indianapolis
                            {/* {this.state.cityName} */}
                                <div className="underline">___________</div>
                            </div>
                        </div>
                    </li>    
            </ul>
            </div>
        </div>
      </nav>
    </div>
    )
}
}
export default Navbar;
