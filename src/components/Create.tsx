import React, { Component } from 'react';

type CreatePlant = {
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

class Create extends Component <any, CreatePlant>{
    constructor() {
        super('')
        // this.state = {
        //         id: 0,
        //         commonPlantName: "",
        //         scientificPlantName: "",
        //         growthZone: [],
        //         img: "",
        //         img2: "",
        //         img3: "",
        //         water: "",
        //         soil: [],
        //         sun: "",
        //         indoor: "",
        //         color: "",
        //         description: "",
        //     }
        };

        // componentDidMount() {
        //     this.FetchZone();
        //     console.log("component mounted 1")
        //  }

        //  handleSubmit = (e) => {
        //     e.preventDefault();
        //     fetch('http://localhost:3000/plant/create', {
        //         method: 'POST',
        //         body: JSON.stringify({log: {
        //             commonPlantName: commonPlantName, 
        //             scientificPlantName: scientificPlantName, 
        //             growthZone: growthZone, 
        //             img: img, 
        //             img2: img2, 
        //             img3: img3, 
        //             water: water, 
        //             soil: soil, 
        //             sun: sun, 
        //             indoor: indoor, 
        //             color: color, 
        //             description: description
        //         }}),
        //         headers: new Headers({
        //             'Content-Type': 'application/json',
        //             // 'Authorization': props.token
        //         })
        //     }) .then ((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //         this.setState({
        //             commonPlantName: data.commonPlantName,
        //             scientificPlantName: data.scientificPlantName,
        //             growthZone: data.growthZone,
        //             img: data.img,
        //             img2: data.img2,
        //             img3: data.img3,
        //             water: data.water,
        //             soil: data.soil,
        //             sun: data.sun,
        //             indoor: data.indoor,
        //             color: data.color,
        //             description: data.description,
        //         })
        //         props.fetchWorkouts();
        //     })
        // }


    render() {
    return (
        <div>
            <div className="createContainer">
            <div className="createForm">
                <div className="formTitle">Create a new plant</div>
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
                {/* <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSubmit()}>Submit</button> */}
                </form>
            </div>
            </div>
        </div>
        )
    }
}
export default Create;