import React, { Component } from 'react';
import {Row, Col } from 'reactstrap';

// type geoData = {
//   results: Array<{
//       address_components: Array<{
//       long_name: string,
//       }>
//   }>
// }
// botanical fetch

type ZipState = {
    zipCode: string | null
    zone: string | null
    plantResults: PlantResults[]
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

class Home2 extends Component <any, ZipState>{

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
            ]
            // img: "",
            // name:""
        }
      };
      
      componentDidMount() {
           this.FetchZonePlants();
           console.log("component mounted 1")
        }

    FetchZonePlants = () => {
        fetch(`https://botanical-app.herokuapp.com/plant/getAll`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.RandomPlant(data)
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

    render() {
    return (
        <div>
            <div className="homeContainer">
                    <div className="PlantImgContainer">
                    <div className="row">
                   {this.state.plantResults.map((plant) => {
                        return  <div className="cardHolder col-sm-4 col-md-4 col-lg-4 col-xl-4" key={plant.id}>
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
export default Home2;