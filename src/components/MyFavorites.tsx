import React, { Component } from 'react';
import APIURL from "../helpers/enviornment";

type FavPlantsState = {
    userId: string
    plantResults: any[]
    favoritePlants: PlantResults
    favplantId: number
}
type FavPlantsProps = {
    userId: number | null
    token: string
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

class MyFavorites extends Component <FavPlantsProps, FavPlantsState>{
    constructor(props:FavPlantsProps) {
        super(props)
        this.state = {
            userId: "",
            plantResults: [],
            favoritePlants: {
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
                indoor: "",
                color: "",
                description: ""
            },
            favplantId: 0   
        }}

        componentDidMount() {
            this.FetchFavPlantById(12);
            console.log("component mounted 1")
         }

        FetchFavPlants = () => {
            let userId= this.props.userId
            // console.log(userId)
            // console.log(APIURL)
            fetch(`${APIURL}/favorite/getfav`, {
                method: "GET",
                headers: new Headers ({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.props.token}`
                })
            })
            .then(res => res.json())
            .then((data) => {
                console.log("item fetched:", data )
                this.setState ({
                    plantResults: data.favPlants
                },() => {
                    let favplantId = 7
                    // this.state.plantResults.map(plant => {
                        this.FetchFavPlantById(favplantId)
                    // })
                })
            })
            .catch(console.log)
        }

        FetchFavPlantById = (id:number) => {
            console.log(id)
            console.log(`${APIURL}/plant/id/7`)
            fetch(`${APIURL}/plant/id/7`, {
                method: "GET",
                headers: new Headers ({
                    'Content-Type': 'application/json',
                })
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data.plantDetail)
                    // this.RandomPlant(data.plantDetail)
                    this.setState({favoritePlants: data.plantDetail
                        // [...this.state.favoritePlants, data.plantDetail]
                    })
                    console.log(this.state.favoritePlants.id)
                })
                .catch(console
                    
                    .log)
        }
        
        // RandomPlant = (a) => {
        //     console.log(a)
        //     for (let i = a.length - 1; i > 0; i--) {
        //         const j = Math.floor(Math.random() * (i + 1));
        //         [a[i], a[j]] = [a[j], a[i]];
        //     }
        //         this.setState({favoritePlants: a})
        // }

        DeletePlant = (key: any) => {
            console.log(`${APIURL}/favorite/deletefav/${key}`)
            fetch(`${APIURL}/favorite/deletefav/${key}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.props.token}`
                })
            })
            .then(() => this.FetchFavPlants())
            console.log("plant removed")
            }

   render() {
    return (
        <div  className="myFavContainer">
                    <div className="PlantImgContainer">
                    <div className="row">
                        <div className="cardHolder col-sm-4 col-md-4 col-lg-4 col-xl-4" key={this.state.favoritePlants.id}>
                                    <div className="likeDeleteButton">
                                        <button className="deleteButton" onClick={(e) => this.DeletePlant(this.state.favoritePlants.id)}>x</button>
                                    </div>
                                    <div className="variableImg">
                                        <img className="cardImg" src={this.state.favoritePlants.img}/>
                                    </div>
                                        <div className="cardTitle">{this.state.favoritePlants.commonPlantName}</div>
                                </div>
                    </div>
                    </div>
        </div>
        )
    }
}
export default MyFavorites;

