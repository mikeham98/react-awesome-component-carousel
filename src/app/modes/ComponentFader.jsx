import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../themes/index.styles.scss'

export default class ComponentFader extends React.PureComponent {
  componentDidMount() {
    this.setTransitionFadeDuration();
  }

  setTransitionFadeDuration() {
    let components = document.getElementsByClassName('componentViewerFade');
    let size = components.length;

    for (let i = 0; i < size; i++) {
      let component = components[i];
      component.style.transitionDuration = `${this.props.transitionDuration}s`;
    }
  }

  render() {
    const { isCurrent, component } = this.props;
    const Component = component;
    return (
      <div
        className={styles.componentViewerFade}
        style={{
          opacity: isCurrent ? 1 : 0
        }}
      >
        <Component/>
      </div>
    );
  }
}

ComponentFader.propTypes = {
  isCurrent: PropTypes.bool,
  src: PropTypes.string,
};