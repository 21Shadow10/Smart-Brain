import Particles from 'react-particles-js';
import './App.css';
import Navigation from './Components/Navigation/Navigation' ;
import Logo from './Components/Logo/Logo' ;
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm' ;
import Rank  from './Components/Rank/Rank';


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

function App() {
  return (
    <div className="App">
      <Particles className="particles"
              params={particleOptions}
            />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
