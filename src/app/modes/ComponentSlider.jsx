import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../themes/index.styles.scss';

export default class ComponentSlider extends React.Component {
  componentDidUpdate() {
    const { current } = this.props;
    document.getElementById('componentSlider').style.transform = `translateX(-${100 * current}%)`;
  }

  returnComponents() {
    const { components } = this.props;
    return components.map((component, index) => {
      const Component = component;
      return (
        <div
          key={`component-${index}`}
          className={styles.componentViewerSlide}
          style={{
            left: `${index * 100}%`,
          }}
        >
          <Component/>
        </div>
      );
    });
  }

  render() {
    const { transitionDuration } = this.props;
    return (
      <div
        className={styles.componentViewerSliderWrapper}
        style={{ transitionDuration: `${transitionDuration}s` }}
        id={'componentSlider'}
      >
        {this.returnComponents()}
      </div>
    );
  }
}

ComponentSlider.propTypes = {
  components: PropTypes.array,
  current: PropTypes.number,
  transitionDuration: PropTypes.number,
};