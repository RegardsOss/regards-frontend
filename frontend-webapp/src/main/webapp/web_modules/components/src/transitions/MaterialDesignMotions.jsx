/*
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { findDOMNode } from 'react-dom'
import { TweenMax } from 'gsap'
import { standardCurve } from './MaterialDesignEasings'
import { desktopDurations } from './MaterialDesignDurations'

/**
 * Implement various React component decorators enabling animation on dom enter/leave of the decorated component.
 * To add motion to a component, simply decorate the class with one the decorators below like so:
 *
 * @example
 * class Box extends React.Component {
    render() {
      return <div/> // styles need to be applied to actually see the box
    }
   }
 const AnimatedBox = standardCurveToLeft(Box)
 *
 * Those implementations comply with Google's Material Design specification about motion in terms of duration and easing.
 *
 * @autor Xavier-Alexandre Brochard
 */

/**
 * The decorated component will enter the dom coming from the left and leave the dom to the left, following the
 * Material Design's "standard curve"
 */
const standardCurveToLeft = Component => class StandardCurveToLeft extends React.Component {
  componentWillEnter(callback) {
    const el = findDOMNode(this)
    TweenMax.fromTo(el, desktopDurations.enter, {
      x: -100,
      opacity: 0,
      ease: standardCurve,
    }, {
      x: 0,
      opacity: 1,
      ease: standardCurve,
      onComplete: callback,
    })
  }

  componentWillLeave(callback) {
    const el = findDOMNode(this)
    TweenMax.fromTo(el, desktopDurations.leave, {
      x: 0,
      opacity: 1,
      ease: standardCurve,
    }, {
      x: -100,
      opacity: 0,
      ease: standardCurve,
      onComplete: callback,
    })
  }

  render() {
    return (
      <Component ref="child" {...this.props} />
    )
  }
}

/**
 * The decorated component will enter the dom coming from the right and leave the dom to the right, following the
 * Material Design's "standard curve"
 */
const standardCurveToRight = Component => class StandardCurveToRight extends React.Component {
  componentWillEnter(callback) {
    const el = findDOMNode(this)
    TweenMax.fromTo(el, desktopDurations.enter, {
      x: 100,
      opacity: 0,
      ease: standardCurve,
    }, {
      x: 0,
      opacity: 1,
      ease: standardCurve,
      onComplete: callback,
    })
  }

  componentWillLeave(callback) {
    const el = findDOMNode(this)
    TweenMax.fromTo(el, desktopDurations.leave, {
      x: 0,
      opacity: 1,
      ease: standardCurve,
    }, {
      x: 100,
      opacity: 0,
      ease: standardCurve,
      onComplete: callback,
    })
  }

  render() {
    return (
      <Component ref="child" {...this.props} />
    )
  }
}

/**
 * The decorated component will enter and leave the dom by fading.
 */
const fades = Component => class Fades extends React.Component {
  componentWillEnter(callback) {
    const el = findDOMNode(this)
    TweenMax.fromTo(el, desktopDurations.enter, {
      opacity: 0,
      ease: standardCurve,
    }, {
      opacity: 1,
      ease: standardCurve,
      onComplete: callback,
    })
  }

  componentWillLeave(callback) {
    const el = findDOMNode(this)
    TweenMax.fromTo(el, desktopDurations.leave, {
      opacity: 1,
      ease: standardCurve,
    }, {
      opacity: 0,
      ease: standardCurve,
      onComplete: callback,
    })
  }

  render() {
    return (
      <Component ref="child" {...this.props} />
    )
  }
}

class Div extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}
const MakesFade = fades(Div)
const MakesStandardCurveToRight = standardCurveToRight(Div)
const MakesStandardCurveToLeft = standardCurveToLeft(Div)

module.exports = {
  fades,
  standardCurveToLeft,
  standardCurveToRight,
  MakesFade,
  MakesStandardCurveToLeft,
  MakesStandardCurveToRight,
}
export { fades }
export { standardCurveToLeft }
export { standardCurveToRight }
export { MakesFade }
export { MakesStandardCurveToLeft }
export { MakesStandardCurveToRight }
