import React , {Component} from 'react' ;
import Particles from 'react-particles-js';
import Clarifai from 'clarifai' ;
import './App.css';
import Navigation from './Components/Navigation/Navigation' ;
import Signin from './Components/Signin/Signin' ;
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition' ;
import Logo from './Components/Logo/Logo' ;
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm' ;
import Rank  from './Components/Rank/Rank';

const app = new Clarifai.App({
  apiKey: '0f6f5b5c22e945b2b37c137a37fad8bb',
})

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input:'',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    //console.log(data) ;
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box ;
    const image = document.getElementById('inputimage') ;
    const width = Number(image.width) ;
    const height = Number(image.height) ;
    console.log(width,height) ;

    return {
      leftCol: clarifaiFace.left_col*width ,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col*width) ,
      bottomRow: height - (clarifaiFace.bottom_row*height) 
    } ;
  }

  displayFaceBox = (box) => {
    //console.log(box) ;
    this.setState({box: box}) ;
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input})

    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));

  }

  onRouteChange = (route) => {
    if(route==='signout')
      this.setState({isSignedIn: false});
    else if(route==='home')
      this.setState({isSignedIn: true});
    this.setState({route:route}) ;
  }

  render(){
    const { isSignedIn, imageUrl, route, box } = this.state ;
    return (
      <div className="App">
        <Particles className="particles"
                params={particleOptions}
              />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {
          route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div> 
          : (
            route === 'signin' 
            ? <Signin onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
          
          
        }
        
        
      </div>
    );
  }
}

export default App;