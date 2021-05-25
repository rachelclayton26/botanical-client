import React, { Component } from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'reactstrap'
import APIURL from "../../helpers/enviornment";

type Nav = {
    cityName: string | null;
    showModal: boolean;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isLoggingIn: boolean;
    user: User;
  }

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean
  }

class Navbar extends Component<any, Nav>{
    constructor() {
        super('')
        this.state = {
            showModal: false,
            cityName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            isLoggingIn: false,
            user: {
                id: 0,
                firstName: "''",
                lastName: "",
                email: "",
                password: "",
                isAdmin: false
              }
        }
      };

    componentDidMount(){
        console.log(this.props.cityName)
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal= () => {
        this.setState({ showModal: true });
      }
    
      handleCloseModal = (data) => {
        this.setState({ 
            showModal: false,
            user: data
        });
        setTimeout(() => {
            console.log(this.state.user)
        }, 500)
      }
    
     modalState = () => {
        const stateRef = this.state;
        return stateRef["showModal"];
      }

      handleChange(e){
          console.log("name:", e.target.name)
          console.log("value:", e.target.value)
        this.setState((prevstate) => ({
            ...prevstate, [e.target.name]: e.target.value as Pick<
            Nav, //I pass in a type
            keyof Nav //I want all the keys from this type (these are types)
          >
        }))
      
    }

    handleSubmit= (e) => {
        console.log(this.state)
        e.preventDefault();
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }) .then(
            (response) => response.json()
        ). then((data) => {
            console.log(data)
            this.props.updateToken(data.sessionToken)
            this.props.AdminCheck(data)
            this.handleCloseModal(data)
        }) 
        .catch((err) => console.log(err))
        this.setState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: ""
        })
    }

    handleSubmit2= (e) => {
        console.log(this.state)
        e.preventDefault();
        console.log(this.state)
        console.log(APIURL)
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email: this.state.email,
                    password: this.state.password
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }) .then(
            (response) => response.json()
        ). then((data) => {
            console.log(data)
            this.props.updateToken(data.sessionToken)
            this.props.AdminCheck(data)
            this.handleCloseModal(data)
        }) 
        .catch((err) => console.log(err))
        this.setState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                })
        // this.props.setState({
        //         isLoggedIn: true
        // })
        console.log(this.state)
    }

    toggleModal = (e) => {
        e.preventDefault();
            this.setState({
                isLoggingIn: !this.state.isLoggingIn
            })
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
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {this.props.isLoggedIn ? <button className="nav-item-item" id="loginBtn" onClick={this.props.clearToken}>logout</button> : <button className="nav-item-item" id="loginBtn" onClick={this.handleOpenModal}>login/ sign up</button>}
                        {this.state.isLoggingIn ?  
                        <div className="Modal1">
                            <Modal isOpen={this.modalState()} ariaHideApp={false} id="Modal1">
                            <div className="modalButtons">
                                <button className="togglerButton" onClick={(e) => this.toggleModal(e)}>sign up</button>
                                <button className="close" aria-label="Close" onClick={this.handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="form">
                                <div className="modalForm">
                                    <form onSubmit={(e) => this.handleSubmit2(e)} >
                                    <div className="modalTitle">login</div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="email" onChange={(e) => this.handleChange(e)} required/>                      
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" placeholder="password" onChange={(e) => this.handleChange(e)} required/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                            </Modal>
                        </div>
                        :
                        <div className="Modal2">
                        <Modal isOpen={this.modalState()} ariaHideApp={false} id="Modal2">
                            <div className="modalButtons">
                                <button className="togglerButton" onClick={(e) => this.toggleModal(e)}>login</button>
                                    <button className="close" aria-label="Close" onClick={this.handleCloseModal}>
                                        <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={(e) => this.handleSubmit(e)} >
                            <div className="modalTitle">sign up</div>
                            <div className="form-group">
                                <input type="first name" className="form-control" name="firstName" aria-describedby="firstNameHelp" placeholder="first name" onChange={(e) => this.handleChange(e)} required/>                      
                            </div>
                            <div className="form-group">
                                <input type="last name" className="form-control" name="lastName" aria-describedby="lastNameHelp" placeholder="last name" onChange={(e) => this.handleChange(e)} required/>                      
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="email" onChange={(e) => this.handleChange(e)} required/>                      
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" placeholder="password" onChange={(e) => this.handleChange(e)} required/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </Modal>
                        </div>}
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-item-item" to="/myfavorites">my favorites</Link>
                    </li>

                    <li className="nav-item" id="cityName">
                        <div className="nav-item-item">
                            <div className="cityNameLable">Plants Suitable For</div>
                            <div className="cityNameFont">{this.props.cityName}
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
