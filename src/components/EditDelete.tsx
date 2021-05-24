import React, { Component } from 'react';
import closeIcon from './closeIcon.png';
import Modal from 'react-modal';

type FetchAllPlants = {
    zipCode: string | null
    zone: string | null
    plantResults: PlantResults[]
    showModal: boolean;
  }

type PlantResults = {
    id: number,
    commonPlantName: string,
    scientificPlantName: string,
    growthZone: number[],
    img: string,
    img2: string,
    img3: string,
    water: string,
    soil: string[],
    sun: string,
    indoor: string,
    color: string,
    description: string,
}

class EditDelete extends Component <any, FetchAllPlants>{
    constructor() {
        super('')
        this.state = {
            zipCode: "",
            zone: "",
            plantResults: [{
                id: 0,
                commonPlantName: "",
                scientificPlantName: "",
                growthZone: [],
                img: "",
                img2: "",
                img3: "",
                water: "",
                soil: [],
                sun: "",
                indoor: "",
                color: "",
                description: "",
            }
            ],
            showModal: false
        }
      };

    componentDidMount(){
        this.FetchPlants();
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal= () => {
        this.setState({ showModal: true });
      }
    
      handleCloseModal = () => {
        this.setState({ showModal: false });
      }
    
     modalState = () => {
        const stateRef = this.state;
        return stateRef["showModal"];
      }

    FetchPlants = () => {
        fetch(`https://botanical-app.herokuapp.com/plant/getAll`)
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                this.RandomPlant(data)
            })
            .catch(console.log)
    }

    RandomPlant = (a) => {
        // console.log(a)
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
            this.setState({plantResults: a})
    }
   
    DeletePlant = (plant: any) => {
        fetch(`https://botanical-app.herokuapp.com/plant/${plant.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization' : this.props.token
            })
        })
        .then(() => this.FetchPlants())
        }

    DeletePlant = (plant: any) => {
            fetch(`https://botanical-app.herokuapp.com/plant/${plant.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization' : this.props.token
                })
            })
            .then(() => this.FetchPlants())
            }
    
     UpdatePlant = (e, plant) => {
                e.preventDefault();
                fetch(`http://localhost:3000/plant/${plant.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        plant: {
                            id: 0,
                            commonPlantName: "",
                            scientificPlantName: "",
                            growthZone: [],
                            img: "",
                            img2: "",
                            img3: "",
                            water: "",
                            soil: [],
                            sun: "",
                            indoor: "",
                            color: "",
                            description: "",
                        }
                    }),
                    headers:new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': this.props.token
                    })
                }).then(() => this.FetchPlants())
                }

    render() {
    return (
        <div>
            <div className="editContainer">
                        <div className="PlantImgContainer">
                        <div className="row">
                            {this.state.plantResults.map((plant) => {
                                return  <div className="cardHolder col-sm-4 col-md-4 col-lg-4 col-xl-4" key={plant.id}>
                                    <div className="editDeleteButtons">
                                        <button className="editButton" onClick={this.handleOpenModal}>edit</button>
                                         <div>
                                            <Modal isOpen={this.modalState()} ariaHideApp={false} id="editModal">
                                                <div className="topButtons">
                                                    <button className="closeModal" onClick={this.handleCloseModal}>x</button>
                                                </div> 

                                                <div className="updateForm">
                                                    <div className="formTitle">edit plant</div>
                                                    <form>
                                                        <div className="form-group">
                                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="id" required/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="common plant name" required/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="scientific plant name"required/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="growth zones (separate by commas)"required/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="home page image (url)"required/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="detail page image (url)"required/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="live image (url)"required/>
                                                        </div>

                                                        <div className="checkboxes">
                                                        <div className="formLable">water needs (check one)</div>
                                                            <div className="form-group">
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                                                    <label className="form-check-label">low</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">low to moderate</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">moderate</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">moderate to high</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">high</label>
                                                                </div>
                                                            </div>
                                                            <div className="formLable">soil type (check muliple)</div>
                                                            <div className="form-group">
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">chalk</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                                                    <label className="form-check-label">clay</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">loam</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">sand</label>
                                                                </div>
                                                            </div>
                                                            <div className="formLable">sun (check one)</div>
                                                            <div className="form-group">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                                                    <label className="form-check-label">full sun</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">full to partial sun</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">full sun to full shade</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">full to partial shade</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">partial shade to shade</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">shade</label>
                                                                </div>
                                                            </div>
                                                            <div className="formLable">indoor (check one)</div>
                                                            <div className="form-group">
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                                                    <label className="form-check-label">true</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">false</label>
                                                                </div>
                                                            </div>

                                                            <div className="formLable">color (check one)</div>
                                                            <div className="form-group">
                                                                
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                                                    <label className="form-check-label">red</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">orange</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                                                    <label className="form-check-label">yellow</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">green</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                                                    <label className="form-check-label">blue</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                                    <label className="form-check-label">pink</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                                                    <label className="form-check-label">purple</label>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                        <div className="form-group">
                                                            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="description" rows={5} required></textarea>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary" 
                                                        // onClick={(e) => this.handleSubmit()}
                                                        >Submit</button>
                                                        </form>
                                                </div>
                                            </Modal>
                                        </div>
                                        <button className="deleteButton" onClick={(e) => this.DeletePlant(plant)}>x</button>
                                    </div>


                                                <img className="cardImg" src={plant.img} />
                                                <div className="cardTitle">{plant.commonPlantName}</div>
                                        </div>
                            })
                            }
                        </div>
                        </div>
            </div>
        </div>
        )
    }
}
export default EditDelete;