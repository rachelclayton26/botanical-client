import React, { Component } from 'react';
import APIURL from "../helpers/enviornment";

type FavPlantsState = {
    userId: string
    plantResults: any[]
    favoritePlants: any[]
}
type FavPlantsProps = {
    userId: number
    token: string
}

class MyFavorites extends Component <FavPlantsProps, FavPlantsState>{
    constructor(props:FavPlantsProps) {
        super(props)
        this.state = {
            userId: "",
            plantResults: [],
            favoritePlants: []    
        }}

        componentDidMount() {
            this.FetchFavPlants();
            console.log("component mounted 1")
         }

        FetchFavPlants = () => {
            let userId= this.props.userId
            console.log(userId)
            console.log(APIURL)
            fetch(`${APIURL}/favorite/getfav/${userId}`, {
                method: "GET",
                headers: new Headers ({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.props.token}`
                })
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                console.log("item fetched:", data )
                this.setState ({
                    plantResults: data.favPlants
                },() => {
                    this.state.plantResults.map(plant => {
                        this.FetchFavPlantById(plant.id)
                    })
                })
            })
            .catch(console.log)
        }

        FetchFavPlantById = (id:string) => {
            console.log(id)
            console.log(APIURL)
            fetch(`${APIURL}/plant/id/${id}`, {
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
                this.setState({favoritePlants: a})
        }

        DeletePlant = (plant: any) => {
            fetch(`${APIURL}/plant/${plant}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.props.token}`
                })
            })
            .then(() => this.FetchFavPlants())
            }

    render() {
    return (
        <div  className="myFavContainer">
                    <div className="PlantImgContainer">
                    <div className="row">
                   {this.state.favoritePlants.map((plant) => {
                        return  <div className="cardHolder col-sm-4 col-md-4 col-lg-4 col-xl-4" key={plant.id}>
                                    <div className="likeDeleteButton">
                                        <button className="deleteButton" onClick={(e) => this.DeletePlant(plant.id)}>x</button>
                                    </div>
                                    <div className="variableImg">
                                        <img className="cardImg" src={plant.img}/>
                                    </div>
                                        <div className="cardTitle">{plant.commonPlantName}</div>
                                </div>
                   })
                    }
                    </div>
                    </div>
        </div>
        )
    }
}
export default MyFavorites;