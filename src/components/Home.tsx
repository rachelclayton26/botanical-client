import React, { Component } from 'react';
import APIURL from "../helpers/enviornment";
import styled from 'styled-components';

type ZipState = {
    zipCode: string | null
    zone: string | null
    plantResults: PlantResults[]
  }

type PlantResults = {
    id: number,
    commonPlantName: string,
    scientificPlantName: string,
    growthZone: number[] | string,
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

// const CardImg3 = styled.img`
// &:hover{
//     background-url: ${plant.img3}
// }`

class Home extends Component <any, ZipState>{

    constructor() {
        super('')
        this.state = {
            zipCode: "",
            zone: "getAll",
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
            ]
            // img: "",
            // name:""
        }
      };
      
      componentDidMount() {
           this.FetchZone();
           console.log("component mounted 1")
        }
    
    FetchZone = () => {
        let zipCode= this.props.zipCode
        fetch(`https://phzmapi.org/${zipCode}.json`)
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                this.setState({
                    zone: data.zone.split("")[0]
                })
                // console.log(this.state.zone);
                this.FetchZonePlants()
            })
            .catch(console.log)
        };

//How do I call this second function?? And how do I make it wait for the FetchZone function to complete it's zone fetch and set the current state for zone? Also, this route in not working on the client side...why?

    FetchZonePlants = () => {
        let zone= this.state.zone
        console.log(zone)
        console.log(APIURL)
        fetch(`${APIURL}/plant/zone/${zone}`, {
            method: "GET",
            headers: new Headers ({
                'Content-Type': 'application/json',
            })
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.RandomPlant(data.plantByZone)
            })
            .catch(console.log)
    }

    RandomPlant = (a) => {
        console.log(a)
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
            this.setState({plantResults: a})
    }

    // showOtherPic = (e, plant) => {
    //     e.preventDefault();
    //         return <div>
    //                     <img className="cardImg" src={plant.img3} />
    //                 </div>
    //     }

    render() {
    return (
        <div>
            <div className="homeContainer">
                    <div className="PlantImgContainer">
                    <div className="row">
                   {this.state.plantResults.map((plant) => {
                        return  <div className="cardHolder col-sm-4 col-md-4 col-lg-4 col-xl-4" key={plant.id}>
                                    <div className="likeButtons">
                                        <button className="likeButton">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                                        </svg>
                                        </button>
                                    </div>
                                    <div className="variableImg">
                                        <img className="cardImg" src={plant.img}/>
                                        {/* <img className="cardImgThree" src={plant.img3} /> */}
                                    </div>
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
export default Home;

// onMouseEnter={(e) => {console.log(e.target)}}}