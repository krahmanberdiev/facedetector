import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js'; 
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'; 
import SignIn from './components/SignIn/SignIn.js'; 
import Register from './components/Register/Register.js'; 
import Rank from './components/Rank/Rank.js'; 
import Logo from './components/Logo/Logo.js';

const app = new Clarifai.App({
  apiKey: 'a514c06280664dbaacb2ed056b262597'
 });

const particlesOptions = {
      particles: {
        number: {
        value: 150,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  }

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    console.log(clarifaiFace)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict( 
        Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err))
      }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
  return (
    <div className="App">
      <Particles className='particles'
              params={particlesOptions}
      />
      { this.state.route === 'home' 
      ? <div>
        <Logo />
        <Navigation onRouteChange={this.onRouteChange}/>
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        : (this.state.route === 'register' 
        ? <Register onRouteChange={this.onRouteChange} /> 
        : <SignIn onRouteChange={this.onRouteChange} />
      ) 
      }
    </div>
    );
  }
}

export default App;
