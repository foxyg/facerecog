import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import './App.css';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
//const Clarifai = require('clarifai');



const particlesOption = {
  particles: {
    number:{
      value: 200,
      density:{
        enable:true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    "id": '',
    "name":'',
    "email": '', 
    "joined": '',
    "entries": 0
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser=(data)=>{
      this.setState({user:{
        "id": data.id,
        "name":data.name,
        "email": data.email, 
        "entries": data.entries,
        "joined": data.joined        
      }
    })
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  calculateFaceLocation = (data) =>{
    const clarifaiFace =data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState ({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })      
    })
    
    .then(response => response.json())
    .then( response =>{
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        })
        .then (response => response.json())
        .then (count => { 
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
          .catch(err => console.log(err)) 
        }
    }) 
    .then(response =>  this.displayFaceBox(this.calculateFaceLocation(response))) 
    .catch(err => console.log(err))  
}

  onRouteChange = (route) => {
    if (route === 'signin'){
      this.setState(initialState)
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render() {
    return (
      <div className="App">
       <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
       <Particles className='particles' 
          params={
            particlesOption
          }              
        />
        {this.state.route === 'home'
          ?<div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
              />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
         :(
           this.state.route === 'signin' ?
           <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>:
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>         
         )          
        }
      </div>
    );
  }
}

export default App;
