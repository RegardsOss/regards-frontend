/**
* LICENSE_PLACEHOLDER
**/
import { themeContextType } from '@regardsoss/theme'
import buildStyles from '../styles/styles'

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
  scrollYTo = topPosition => this.canDelegate() && this.delegateInstance.scrollYTo(topPosition)
  scrollLeft = () => this.canDelegate() && this.delegateInstance.scrollLeft()
  scrollRight = () => this.canDelegate() && this.delegateInstance.scrollRight()
  scrollXTo = leftPosition => this.canDelegate() && this.delegateInstance.scrollXTo(leftPosition)

  render() {
    const { muiTheme } = this.context
    const moduleTheme = buildStyles(muiTheme)

    const RenderComponent = this.renderComponent

    const renderingProps = {
      ref: (c) => { this.delegateInstance = c },
      horizontalContainerStyle: moduleTheme.scrollArea.horizontalScrollContainer.styles,
      horizontalScrollbarStyle: moduleTheme.scrollArea.horizontalScrollbar.styles,
      verticalContainerStyle: moduleTheme.scrollArea.verticalScrollContainer.styles,
      verticalScrollbarStyle: moduleTheme.scrollArea.verticalScrollbar.styles,
      // user styles and properties have heigher priority
      ...this.props,
    }

    return <RenderComponent {...renderingProps} />
  }
}

export default ScrollAreaAdapter
