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
import { themeContextType } from '@regardsoss/theme'
import styles from '../styles'

const HeadlessAdapter = ({ children }) => (<div>{children}</div>)
HeadlessAdapter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

/**
* Scroll area adapter for headless environement. Also provides default component styles (can be overriden through properties)
*/
class ScrollAreaAdapter extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  // props types: merge any of the styles you need here

  constructor(props) {
    super(props)
    this.renderHeadless = ['test', 'coverage'].includes(process.env.NODE_ENV)
    this.renderComponent = this.renderHeadless ? HeadlessAdapter : require('react-scrollbar').default
    this.delegateInstance = null
  }

  /**
   * Can delegate to scroll area render?
   */
  canDelegate = () => !this.renderHeadless && this.delegateInstance

  // expose scroll area API
  scrollTop = () => this.canDelegate() && this.delegateInstance.scrollTop()

  scrollBottom = () => this.canDelegate() && this.delegateInstance.scrollBottom()

  scrollYTo = (topPosition) => this.canDelegate() && this.delegateInstance.scrollYTo(topPosition)

  scrollLeft = () => this.canDelegate() && this.delegateInstance.scrollLeft()

  scrollRight = () => this.canDelegate() && this.delegateInstance.scrollRight()

  scrollXTo = (leftPosition) => this.canDelegate() && this.delegateInstance.scrollXTo(leftPosition)

  render() {
    const { muiTheme } = this.context
    const RenderComponent = this.renderComponent
    // Note: we cannot export here using withModuleStyle, as this component exposes an API (scroll...)
    const moduleTheme = styles.styles(muiTheme)

    const renderingProps = {
      ref: (c) => { this.delegateInstance = c },
      horizontalContainerStyle: moduleTheme.scrollArea.horizontalScrollContainer.styles,
      horizontalScrollbarStyle: moduleTheme.scrollArea.horizontalScrollbar.styles,
      verticalContainerStyle: moduleTheme.scrollArea.verticalScrollContainer.styles,
      verticalScrollbarStyle: moduleTheme.scrollArea.verticalScrollbar.styles,
      minScrollSize: 20,
      // user styles and properties have heigher priority
      ...this.props,
    }

    return <RenderComponent {...renderingProps} />
  }
}

export default ScrollAreaAdapter
