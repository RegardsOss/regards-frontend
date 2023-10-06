/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ScrollHelper } from '@regardsoss/scroll'
import Up from 'mdi-material-ui/ArrowUpBold'
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
   * Handle click event on the button
   */
  handleScroll = () => {
    ScrollHelper.scrollTo(root.document.body, 200)
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
