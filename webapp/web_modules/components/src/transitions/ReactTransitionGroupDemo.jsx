/*
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
