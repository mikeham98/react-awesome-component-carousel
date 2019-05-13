import React from 'react';
import ComponentCarousel from 'react-awesome-component-carousel';
import './themes/app.scss';

const component1 = () => (
  <div style={{backgroundColor: '#fd3164', height:  '100vh', width: '100vw'}}>
    <h1>Slide 1</h1>
  </div>
);
const component2 = () => (
  <div style={{backgroundColor: '#80a5fd', height:  '100vh', width: '100vw'}}>
    <h1>Slide 2</h1>
  </div>
);
const component3 = () => (
  <div style={{backgroundColor: '#1ccb9e', height:  '100vh', width: '100vw'}}>
    <h1>Slide 3</h1>
  </div>
);

const components = [component1, component2, component3];

class App extends React.Component {
  render() {
    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
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