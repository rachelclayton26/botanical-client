import React, { Component } from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';


type Nav = {
    cityName: string | null;
  }

class Navbar2 extends Component<any, Nav>{
//props cityname
    componentDidMount(){
    }
    
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
                <ul className="navbar-nav" id="nav2">

                    <li className="nav-item">
                        <button className="nav-item-item" id="loginBtn" onClick={this.props.clearToken}>logout</button>    
                    </li>
                    
                    {/* <li className="nav-item">
                    <Link className="nav-item-item" to="/allplants">all plants</Link>
                    </li> */}

                    <li className="nav-item" id="CRUDButtons">
                        <div className="nav-item-item">
                            {/* <div className="updateEditDelete">Create</div> */}
                            <Link className="updateEditDelete" to="/create">Create</Link>
                        </div>
                    </li>    
                    <li className="nav-item" id="CRUDButtons">
                        <div className="nav-item-item">
                        <Link className="updateEditDelete" to="/">Edit/Delete</Link>
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
export default Navbar2;
