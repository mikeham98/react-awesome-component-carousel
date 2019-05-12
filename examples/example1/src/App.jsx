import React from 'react';
import ComponentCarousel from 'react-awesome-component-carousel';
import image1 from '../assets/img1.jpeg';
import image2 from '../assets/img2.jpeg';
import image3 from '../assets/img3.jpeg';
import './themes/app.scss'

const component1 = () => <img src={image1} />;
const component2 = () => <img src={image2} />;
const component3 = () => <img src={image3} />;

const components = [component1, component2, component3];

class App extends React.Component {
  render() {
    return (
      <div style={{width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden'}}>
        <ComponentCarousel
          transition={'slide'}
          transitionDuration={0.3}
          auto
          autoDuration={3}
          coolOff={6}
          components={components}
        />
      </div>
    );
  }
}

export default App;