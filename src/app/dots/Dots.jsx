import React from 'react';
import classnames from 'classnames';
import styles from '../../themes/index.styles.scss';

export default class Dots extends React.Component {
  returnDots() {
    let components = [];
    for (let x = 0; x < this.props.number; x++) {
      const classNames = [styles.dot];
      if(this.props.current === x) {
        classNames.push(styles.dotActive)
      }
      components.push(<div className={classnames(classNames)} onClick={() => this.props.onClick(x)}/>);
    }
    return components;
  }

  render() {
    return (
      <div className={styles.dotsWrapper}>
        {this.returnDots()}
      </div>
    );
  }
}