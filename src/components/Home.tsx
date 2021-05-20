import React, { Component } from 'react';

// type geoData = {
//   results: Array<{
//       address_components: Array<{
//       long_name: string,
//       }>
//   }>
// }
// botanical fetch

class Home extends React.Component {

//     constructor() {
//         super('')
//         this.state = {
//             cityName: '',
//             zipCode: ''
//         }
        // fetchZone()
    //   }

    // fetch(`https://phzmapi.org/${zipcode}.json`)


    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         img: ""
    //     }
    // }

    // handleChange(event) {
    //     window.location.reload();
    // };

    // componentDidMount() {
    //     console.log("Component Mounted")
    //     console.log(this.state.img);
    //     fetch(`https://botanical-app.herokuapp.com/plant/${this.state.zone}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             this.setState({
    //                 img: data.message
    //             })
    //         })
    //         .catch(console.log)
    //         console.log(this.state.img);
    // }

    render() {
    return (
        <div>
            <div className="homeContainer">
            {/* Cards here*/}
            </div>
        </div>
        )
    }
}
export default Home;