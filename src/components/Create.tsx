import React, { Component } from 'react';
import APIURL from "../helpers/enviornment";


type CreatePlant = {
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

class Create extends Component <any, CreatePlant>{
    constructor() {
        super('')
         this.state = {
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
        };

         componentDidMount() {
          }

          handleChange = (e) => {
            // to find out if it's checked or not; returns true or false
            const checked = e.target.checked;
            
            // to get the checked value
            const checkedValue = e.target.value;
            
            // to get the checked name
            const checkedName = e.target.name;
            
            //then you can do with the value all you want to do with it.
            };

          createPlant = (e) => {
             e.preventDefault();
             fetch(`${APIURL}/plant/create`, {
                 method: 'POST',
                 body: JSON.stringify({
                    plant: {
                        commonPlantName: this.state.commonPlantName,
                        scientificPlantName: this.state.scientificPlantName,
                        growthZone: this.state.growthZone,
                        img: this.state.img,
                        img2: this.state.img2,
                        img3: this.state.img3,
                        water: this.state.water,
                        soil: this.state.soil,
                        sun: this.state.sun,
                        indoor: this.state.indoor,
                        color: this.state.color,
                        description: this.state.description,
                    }
                 }),
                 headers: new Headers({
                     'Content-Type': 'application/json',
                      'Authorization': `Bearer ${this.props.token}`
                 })
            })
                //  this.props.fetchPlants();
             }


    render() {
    return (
        <div>
            <div className="createContainer"> 
            <div className="createForm">
                <div className="formTitle">Create a new plant</div>

                <form onSubmit={(e) => this.createPlant(e)} >

                    <div className="form-group">
                        <input className="form-control" 
                        placeholder="common plant name"  
                        value={this.state.commonPlantName} 
                        onChange={(e) => this.setState({commonPlantName: e.target.value})} 
                        required/>
                    </div>

                    <div className="form-group">
                        <input className="form-control" 
                        placeholder="scientific plant name" 
                        value={this.state.scientificPlantName}  
                        onChange={(e) => this.setState({scientificPlantName: e.target.value})}
                        required/>
                    </div>

                    <div className="form-group">
                        <input className="form-control" 
                        placeholder="growth zones (separate by commas)" 
                        value={this.state.growthZone} 
                        onChange={(e) => this.setState({growthZone: e.target.value})}
                        required/>
                    </div>

                    <div className="form-group">
                        <input className="form-control" 
                        placeholder="home page image (url)" 
                        value={this.state.img} 
                        onChange={(e) => this.setState({img: e.target.value})} 
                        required/>
                    </div>

                    <div className="form-group">
                        <input className="form-control" 
                        placeholder="detail page image (url)" 
                        value={this.state.img2} 
                        onChange={(e) => this.setState({img2: e.target.value})}
                        required/>
                    </div>

                    <div className="form-group">
                        <input className="form-control" 
                        placeholder="live image (url)" 
                        value={this.state.img3} 
                        onChange={(e) => this.setState({img3: e.target.value})}
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
                        value={this.state.description} 
                        onChange={(e) => this.setState({description: e.target.value})}
                        required></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    
                    </form>
            </div>
            </div>
        </div>
        )
    }
}
export default Create;