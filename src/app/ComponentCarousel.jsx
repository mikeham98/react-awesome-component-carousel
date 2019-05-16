import React from 'react';
import PropTypes from 'prop-types';
import ComponentFader from './modes/ComponentFader';
import ComponentSlider from './modes/ComponentSlider';
import LeftButton from './buttons/LeftButton';
import RightButton from './buttons/RightButton';
import Dots from './dots/Dots';

const fade = 'fade';
const slide = 'slide';

export default class ComponentCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      pause: false,
      autoPlayIntervalId: undefined,
      pauseTimeoutId: undefined,
    };
    this.showPrevComponent = this.showPrevComponent.bind(this);
    this.showNextComponent = this.showNextComponent.bind(this);
    this.startAutoPlay = this.startAutoPlay.bind(this);
  }

  componentDidMount() {
    if (this.props.auto) {
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    const autoPlayIntervalId = setInterval(this.showNextComponent, this.props.autoDuration * 1000);
    this.setState({
      autoPlayIntervalId,
    });
  }

  stopAutoPlay() {
    clearTimeout(this.state.autoPlayIntervalId);
  }

  handlePause() {
    clearTimeout(this.state.pauseTimeoutId);
    this.stopAutoPlay();
    const pauseTimeoutId = setTimeout(() => {
      this.showNextComponent();
      this.startAutoPlay();
    }, this.props.coolOff * 1000);
    this.setState({ pauseTimeoutId });
  }

  returnComponentFader() {
    const { components, transitionDuration } = this.props;
    const { current } = this.state;
    return components.map((component, index) => {
      const isCurrent = index === current;
      return (
        <ComponentFader
          key={`component-${index}`}
          isCurrent={isCurrent}
          component={component}
          transitionDuration={transitionDuration}
        />
      );
    });
  }

  returnComponentSlide() {
    const { components, transitionDuration } = this.props;
    const { current } = this.state;
    return (
      <ComponentSlider
        components={components}
        current={current}
        transitionDuration={transitionDuration}
      />
    );
  }

  returnComponents() {
    const { components, transition } = this.props;
    if (Array.isArray(components) && components.length) {
      switch (transition) {
        case fade:
          return this.returnComponentFader();
        case slide:
          return this.returnComponentSlide();
      }
    }
  }

  getPrevIndex() {
    const numberOfComponents = this.props.components.length;
    const { current } = this.state;
    if (numberOfComponents) {
      let prev = current - 1;
      if (prev < 0) {
        prev = numberOfComponents - 1;
      }
      return prev;
    }
  }

  getNextIndex() {
    const numberOfComponents = this.props.components.length;
    const { current } = this.state;
    if (numberOfComponents) {
      let next = current + 1;
      if (next === numberOfComponents) {
        next = 0;
      }
      return next;
    }
  }

  showPrevComponent(clicked) {
    const prevComponent = this.getPrevIndex();
    if (clicked && this.props.auto && this.props.coolOff) {
      this.handlePause();
    }
    this.setState({
      current: prevComponent,
    });
  }

  showNextComponent(clicked) {
    const nextComponent = this.getNextIndex();
    if (clicked && this.props.auto && this.props.coolOff) {
      this.handlePause();
    }
    this.setState({
      current: nextComponent,
    });
  }

  returnButtons() {
    const { customPrevButton, customNextButton } = this.props;
    let CustomPrevButton = customPrevButton;
    let CustomNextButton = customNextButton;
    const prevProps = {
      onClick: () => this.showPrevComponent(true),
    };
    const nextProps = {
      onClick: () => this.showNextComponent(true),
    };
    return (
      <div>
        {CustomPrevButton ? <CustomPrevButton {...prevProps}/> :
          <LeftButton {...prevProps}/>}
        {CustomNextButton ? <CustomNextButton {...nextProps}/> :
          <RightButton {...nextProps}/>}
      </div>
    );
  }

  returnDots() {
    if(this.props.dots) {
      return (
        <Dots
          current={this.state.current}
          number={this.props.components.length}
          onClick={(current) => this.setState({current})}
        />
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.disableButtons && this.returnButtons()}
        {this.returnComponents()}
        {this.returnDots()}
      </React.Fragment>
    );
  }
}

ComponentCarousel.propTypes = {
  auto: PropTypes.bool,
  autoDuration: PropTypes.number,
  components: PropTypes.array,
  coolOff: PropTypes.number,
  dots: PropTypes.bool,
  disableButtons: PropTypes.bool,
  customPrevButton: PropTypes.func,
  customNextButton: PropTypes.func,
  transition: PropTypes.string,
  transitionDuration: PropTypes.number,
};

ComponentCarousel.defaultProps = {
  auto: false,
  autoDuration: 3,
  components: [],
  coolOff: 6,
  disableButtons: false,
  dots: true,
  transition: slide,
  transitionDuration: 0.3,
};