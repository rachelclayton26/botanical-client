import React, { Component } from 'react';

class Details extends Component {
    render() {
    return (
        <div  className="detailsContainer">

        <div className="details">
                <div className="detailsLeft">
                <div className="detailsText">
                    <div className="titleBox">
                        <div className="detailsTitle">Sweet Violet
                        {/* {plant.commonPlantName} */}
                        </div>
                        <div className="detailsScience">Viola
                            {/* {plant.scientificPlantName} */}
                        </div>
                    </div>
                    <p>Viola odorata 'Queen Charlotte' (Sweet Violet) is an evergreen perennial forming a ravishing mound of shiny, heart shaped, dark green leaves. Blooming in late winter and early spring, sweetly-scented, large, dark blue to purple flowers arise above the foliage. Adding fragrance and color when few other plants are at their peak, Sweet Violet is an indispensable perennial for the shade garden. Flowers are excellent for cutting and edible, eat them fresh or candied. First introduced into cultivation in Germany in 1900.
                        {/* {plant.discription} */}
                    </p>
                </div>
                <div className="iconGuide">
                    <div className="sun">
                        <div className="sunTitle">Full Sun</div>
                        <div className="sunIcon"></div>
                    </div>
                    <div className="water">
                        <div className="waterTitle">Moderate</div>
                        <div className="waterIcon"></div>
                    </div>
                    <div className="soil">
                        <div className="soilTitle">Sandy Loam</div>
                        <div className="soilIcon"></div>
                    </div>
                    <div className="indoor">
                        <div className="indoorTitle">Outdoor</div>
                        <div className="indoorIcon"></div>
                    </div>
                    <div className="growthZone">
                        <div className="zoneTitle">Growth Zone</div>
                        <div className="zoneNumber">7</div>
                    </div>
                </div>
            </div>

            <div className="detailsPics">
                <div className="picOne">
                    <img className="detailLivePic" src="https://res.cloudinary.com/djdrsujro/image/upload/v1621277919/Botanical-App/violets_uikr3j.jpg"></img>
                </div>
                <div className="picTwo">
                    <img className="detailDrawnPic" src="https://res.cloudinary.com/djdrsujro/image/upload/v1621277831/Botanical-App/lineFlowers_whiteBackgrownd-02_uv7or0.jpg"></img>
                </div>
            </div>

            </div>
            </div>
        )
    }
}
export default Details;