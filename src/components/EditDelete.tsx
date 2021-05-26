import React, { Component } from 'react';
import closeIcon from './closeIcon.png';
import { Modal } from 'reactstrap'
import APIURL from "../helpers/enviornment";

type FetchAllPlants = {
    zipCode: string | null
    zone: string | null
    plantResults: PlantResults[]
    plantToUpdate: PlantResults
    showModal: boolean;
  }

type PlantResults = {
    id: number,
    commonPlantName: string,
    scientificPlantName: string,
    growthZone: string,
    img: string,
    img2: string,
    img3: string,
    water: string,
    soil: string[],
    sun: string,
    indoor: boolean,
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
                growthZone: "",
                img: "",
                img2: "",
                img3: "",
                water: "",
                soil: [],
                sun: "",
                indoor: false,
                color: "",
                description: "",
            }
            ],
            plantToUpdate: {
                id: 0,
                commonPlantName: "",
                scientificPlantName: "",
                growthZone: "",
                img: "",
                img2: "",
                img3: "",
                water: "",
                soil: [],
                sun: "",
                indoor: false,
                color: "",
                description: "",
            },
            showModal: false,
        }
      };

    componentDidMount(){
        this.FetchPlants();
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal= () => {
        return this.setState({ showModal: true });
      }
    
      handleCloseModal = () => {
        return this.setState({ showModal: false });
      }
    
     modalState = () => {
        const stateRef = this.state;
        return stateRef["showModal"];
      }

    FetchPlants = () => {
        fetch(`${APIURL}/plant/getAll`)
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
            fetch(`${APIURL}/plant/${plant.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.props.token}`
                })
            })
            .then(() => this.FetchPlants())
            }
    
    FetchPlantUpdate = (e, plant) => {
        e.preventDefault();
        // console.log(key)
        console.log(APIURL)
        console.log(plant)
        fetch(`${APIURL}/plant/id/${plant.id}`, {
            method: "GET",
            headers: new Headers ({
                'Content-Type': 'application/json',
            })
        })
            .then(res => res.json())
            .then((data) => {
                this.setState ({
                    plantToUpdate: data.plantDetail
                })
                // console.log(data)
                console.log(this.state.plantToUpdate)
            })
            .catch(console.log)
            this.handleOpenModal()
        }

        handleChange = (e) => {
            // to find out if it's checked or not; returns true or false
            const checked = e.target.checked;
            
            // to get the checked value
            const checkedValue = e.target.value;
            
            // to get the checked name
            const checkedName = e.target.name;
            
            //then you can do with the value all you want to do with it.
        console.log(`checked: ${checked} : checkedValue: ${checkedValue} : checkedName: ${checkedName}`)    
        };
            


     UpdatePlant = (e, plant) => {
                e.preventDefault();
                fetch(`${APIURL}/plant/${plant.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        plant: plant
                    }),
                    headers:new Headers({
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${this.props.token}`
                    })
                })
                .then(() => this.handleCloseModal())
                .then(() => this.FetchPlants())
                }

    render() {
    return (
        <div>
            <div className="editContainer">
                        <div className="PlantImgContainer">
                        <div className="row">
                            {this.state.plantResults.map((plant) => {
                                console.log(this.state);
                                return  <div className="cardHolder col-sm-4 col-md-4 col-lg-4 col-xl-4" key={plant.id}>
                                    <div className="editDeleteButtons">
                                        <button className="editButton" onClick={(e) => this.FetchPlantUpdate(e, plant)}>edit</button>
                                        <button className="deleteButton" onClick={(e) => this.DeletePlant(plant)}>x</button>
                                    </div>


                                                <img className="cardImg" src={plant.img} />
                                                <div className="cardTitle">{plant.commonPlantName}</div>
                                        </div>
                            })
                            }
                                       
                                         <div>
                                            <Modal isOpen={this.modalState()} ariaHideApp={false} id="editModal">
                                                <div className="topButtons">
                                                    <button className="close" aria-label="Close" onClick={this.handleCloseModal}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div> 

                                                <div className="updateForm">
                                                    <div className="formTitle">edit plant</div>


                                                    <form onSubmit={(e) => this.UpdatePlant(e, this.state.plantToUpdate )} >
                                                        <div className="form-group">
                                                            <input className="form-control" 
                                                            placeholder="common plant name"  
                                                            value={this.state.plantToUpdate.commonPlantName} 
                                                            onChange={(e) => this.setState(prevState => ({plantToUpdate: {...prevState.plantToUpdate, commonPlantName: e.target.value}}))} 
                                                            required/>
                                                        </div>

                                                        <div className="form-group">
                                                            <input className="form-control" 
                                                            placeholder="scientific plant name" 
                                                            value={this.state.plantToUpdate.scientificPlantName}  
                                                            onChange={(e) => this.setState(prevState => ({plantToUpdate: {...prevState.plantToUpdate, scientificPlantName: e.target.value}}))} 
                                                            required/>
                                                        </div>

                                                        <div className="form-group">
                                                            <input className="form-control" 
                                                            placeholder="growth zones (separate by commas)" 
                                                            value={this.state.plantToUpdate.growthZone} 
                                                            onChange={(e) => this.setState(prevState => ({plantToUpdate: {...prevState.plantToUpdate, growthZone: e.target.value}}))} 
                                                            required/>
                                                        </div>

                                                        <div className="form-group">
                                                            <input className="form-control" 
                                                            placeholder="home page image (url)" 
                                                            value={this.state.plantToUpdate.img} 
                                                            onChange={(e) => this.setState(prevState => ({plantToUpdate: {...prevState.plantToUpdate, img: e.target.value}}))} 
                                                            required/>
                                                        </div>

                                                        <div className="form-group">
                                                            <input className="form-control" 
                                                            placeholder="detail page image (url)" 
                                                            value={this.state.plantToUpdate.img2} 
                                                            onChange={(e) => this.setState(prevState => ({plantToUpdate: {...prevState.plantToUpdate, img2: e.target.value}}))} 
                                                            required/>
                                                        </div>

                                                        <div className="form-group">
                                                            <input className="form-control" 
                                                            placeholder="live image (url)" 
                                                            value={this.state.plantToUpdate.img3} 
                                                            onChange={(e) => this.setState(prevState => ({plantToUpdate: {...prevState.plantToUpdate, img3: e.target.value}}))} 
                                                            required/>
                                                        </div>

                                                        <div className="checkboxes">
                                                        <div className="formLable">water needs (check one)</div>
                                                            <div className="form-group">
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="Low" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">low</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="Low to moderate" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">low to moderate</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="Moderate" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">moderate</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="Moderate" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">moderate to high</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="High" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">high</label>
                                                                </div>
                                                            </div>
                                                            <div className="formLable">soil type (check muliple)</div>
                                                            <div className="form-group">
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="chalk" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">chalk</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="clay" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">clay</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="loam" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">loam</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="sand" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">sand</label>
                                                                </div>
                                                            </div>
                                                            <div className="formLable">sun (check one)</div>
                                                            <div className="form-group">
                                                                <div className="form-check">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="full sun" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">full sun</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="full to partial sun" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">full to partial sun</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="full sun to full shade" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">full sun to full shade</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="full to partial shade" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">full to partial shade</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="partial shade to shade" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">partial shade to shade</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="shade" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">shade</label>
                                                                </div>
                                                            </div>
                                                            <div className="formLable">indoor (check one)</div>
                                                            <div className="form-group">
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="true" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">true</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="false" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">false</label>
                                                                </div>
                                                            </div>

                                                            <div className="formLable">color (check one)</div>
                                                            <div className="form-group">
                                                                
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="red" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">red</label>
                                                                </div>

                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="orange" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">orange</label>
                                                                </div>

                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="yellow" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">yellow</label>
                                                                </div>

                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="green" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">green</label>
                                                                </div>

                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="blue" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">blue</label>
                                                                </div>

                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="pink" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">pink</label>
                                                                </div>

                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input"
                                                                        type="checkbox" 
                                                                        value="purple" 
                                                                        onChange={this.handleChange}/>
                                                                    <label className="form-check-label">purple</label>
                                                                </div>

                                                            </div>
                                                        </div> 
                                                        <div className="form-group">
                                                            <textarea className="form-control" 
                                                            placeholder="description" rows={5} 
                                                            value={this.state.plantToUpdate.description} 
                                                            onChange={(e) => this.setState(prevState => ({plantToUpdate: {...prevState.plantToUpdate, description: e.target.value}}))} 
                                                            required></textarea>
                                                        </div>

                                                        <button type="submit" className="btn btn-primary">Submit</button>
                                                        
                                                        </form>
                                                </div>
                                            </Modal>
                                        </div>
                        </div>
                        </div>
            </div>
        </div>
        )
    }
}
export default EditDelete;