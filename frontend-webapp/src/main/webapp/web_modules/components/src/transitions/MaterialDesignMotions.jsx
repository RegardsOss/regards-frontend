/*
 * LICENSE_PLACEHOLDER
 */
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
    TweenMax.fromTo(el, desktopDurations.enter, { x: -100, opacity: 0, ease: standardCurve }, { x: 0, opacity: 1, ease: standardCurve, onComplete: callback })
  }
  componentWillLeave(callback) {
    const el = findDOMNode(this)
    TweenMax.fromTo(el, desktopDurations.leave, { x: 0, opacity: 1, ease: standardCurve }, { x: -100, opacity: 0, ease: standardCurve, onComplete: callback })
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
    TweenMax.fromTo(el, desktopDurations.enter, { x: 100, opacity: 0, ease: standardCurve }, { x: 0, opacity: 1, ease: standardCurve, onComplete: callback })
  }
  componentWillLeave(callback) {
    const el = findDOMNode(this)
    TweenMax.fromTo(el, desktopDurations.leave, { x: 0, opacity: 1, ease: standardCurve }, { x: 100, opacity: 0, ease: standardCurve, onComplete: callback })
  }
  render() {
    return (
      <Component ref="child" {...this.props} />
    )
  }
}

export default { standardCurveToLeft, standardCurveToRight }
export { standardCurveToLeft }
export { standardCurveToRight }
