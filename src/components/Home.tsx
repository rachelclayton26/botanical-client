import React, { Component } from 'react';
import {Row, Col } from 'reactstrap';
import favorite_border, {colorPalette} from 'material-design-icons';

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

class Home extends Component <any, ZipState>{

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
        fetch(`https://botanical-app.herokuapp.com/plant/zone/${zone}`)
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

    showOtherPic = (e, plant) => {
        e.preventDefault();
            return <img className="cardImgThree" src={plant.img3} />
        }

    render() {
    return (
        <div>
            <div className="homeContainer">
                    <div className="PlantImgContainer">
                    <div className="row">
                   {this.state.plantResults.map((plant) => {
                        return  <div className="cardHolder col-sm-4 col-md-4 col-lg-4 col-xl-4" key={plant.id}>
                                    <div className="likeButtons">
                                        <button className="likeButton">save</button>
                                    </div>
                                        <img className="cardImg" src={plant.img}  onMouseEnter={(e) => this.showOtherPic(e, plant)}/>
                                        <img className="cardImgThree" src={plant.img3} />
                                        {/* {console.log(plant.img3)} */}
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