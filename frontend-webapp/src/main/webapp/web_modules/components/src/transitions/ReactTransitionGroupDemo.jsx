/*
 * LICENSE_PLACEHOLDER
 */
/*eslint-disable */
import React from 'react'
import TransitionGroup from 'react-addons-transition-group'
import { standardCurveToLeft, standardCurveToRight } from './MaterialDesignMotions'

const styles = {
  box1: {
    width: 100,
    height: 100,
    backgroundColor: '#009688',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: '#CDDC39',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
}

class ReactTransitionGroupDemo extends React.Component {

  state = {
    shouldShowBox: true,
  }

  toggleBox = () => {
    this.setState({
      shouldShowBox: !this.state.shouldShowBox,
    })
  }

  render() {
    return (
      <div className="page">
        <TransitionGroup>
          { this.state.shouldShowBox && <AnimatedBox1 />}
        </TransitionGroup>
        <TransitionGroup>
          { !this.state.shouldShowBox && <AnimatedBox2 />}
        </TransitionGroup>
        <button
          className="toggle-btn"
          onClick={this.toggleBox}
        >
          Toggle
        </button>
      </div>
    )
  }
}

class Box1 extends React.Component {
  render() {
    return <div style={styles.box1} />
  }
}
const AnimatedBox1 = standardCurveToLeft(Box1)

class Box2 extends React.Component {
  render() {
    return <div style={styles.box2} />
  }
}
const AnimatedBox2 = standardCurveToRight(Box2)

export default ReactTransitionGroupDemo
