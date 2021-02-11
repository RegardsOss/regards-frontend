/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Up from 'mdi-material-ui/ArrowUpBold'
import isNumber from 'lodash/isNumber'
import throttle from 'lodash/throttle'
import root from 'window-or-global'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from './styles'

/**
 * Displays an anchor helper, scrolling to view top when clicked
 * @author Léo Mieulet
 */
export class AnchorComponent extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static THRESHOLD_VISIBLE = 600

  static contextTypes = {
    ...themeContextType,
  }

  /** Initial state */
  state = {
    isVisible: false,
  }

  /**
   * Attach a event listener to know when the user scroll if we need to display the button
   */
  componentDidMount() {
    this.onScroll()
    if (root.document) {
      root.document.addEventListener('scroll', this.onScroll)
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    if (root.document) {
      root.document.removeEventListener('scroll', this.onScroll)
    }
  }

  /**
   * Receive scroll event
   */
  onScroll = throttle(() => {
    if (root.pageYOffset) {
      const pageY = root.pageYOffset
      this.checkVisibility(pageY)
    }
  }, 100, { leading: true, trailing: true })

  /**
   * Receive the current user Y position
   * Update the visibility of that button
   */
  checkVisibility = (newPageY) => {
    const { isVisible } = this.state
    if (!isVisible && newPageY > AnchorComponent.THRESHOLD_VISIBLE) {
      this.setState({
        isVisible: true,
      })
    }
    if (isVisible && newPageY < AnchorComponent.THRESHOLD_VISIBLE) {
      this.setState({
        isVisible: false,
      })
    }
  }

  /**
   * Scroll the browser to the destination
   */
  scrollTo = (destination, duration = 200, callback) => {
    const easeInOutQuint = function (t) {
      // eslint-disable-next-line
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + (16 * (--t) * t * t * t * t)
    }

    const start = root.pageYOffset
    const startTime = 'now' in root.performance ? performance.now() : new Date().getTime()

    const documentHeight = Math.max(root.document.body.scrollHeight, root.document.body.offsetHeight, root.document.documentElement.clientHeight, root.document.documentElement.scrollHeight, root.document.documentElement.offsetHeight)
    const windowHeight = root.innerHeight || root.document.documentElement.clientHeight || root.document.getElementsByTagName('body')[0].clientHeight
    const destinationOffset = isNumber(destination) ? destination : destination.offsetTop
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset)

    if ('requestAnimationFrame' in root === false) {
      window.scroll(0, destinationOffsetToScroll)
      if (callback) {
        callback()
      }
    }

    function scroll() {
      const now = 'now' in root.performance ? performance.now() : new Date().getTime()
      const time = Math.min(1, ((now - startTime) / duration))
      const timeFunction = easeInOutQuint(time)
      root.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start))

      if (root.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback()
        }
        return
      }

      requestAnimationFrame(scroll)
    }
    scroll()
  }

  /**
   * Handle click event on the button
   */
  handleScroll = () => {
    this.scrollTo(root.document.body, 200)
  }

  render() {
    const { children } = this.props
    const { isVisible } = this.state
    const {
      moduleTheme: { anchorComponent: { buttonStyle, iconStyle } },
      muiTheme: { components: { anchorScrollTop: { buttonColor } } },
    } = this.context
    return (
      <div>
        {children}
        {isVisible
          ? <FloatingActionButton
              mini
              style={buttonStyle}
              backgroundColor={buttonColor}
              onClick={this.handleScroll}
              iconStyle={iconStyle}
          >
            <Up />
          </FloatingActionButton>
          : null}
      </div>
    )
  }
}

export default withModuleStyle(styles)(AnchorComponent)
