/**
* LICENSE_PLACEHOLDER
**/

const HeadlessAdapter = ({ children }) => (<div>{children}</div>)
HeadlessAdapter.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
}

/**
* Scroll area adapter for headless environement
*/
class ScrollAreaAdapter extends React.Component {


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
    const RenderComponent = this.renderComponent
    return (
      <RenderComponent
        ref={(c) => { this.delegateInstance = c }}
        {...this.props}
      />
    )
  }
}

export default ScrollAreaAdapter
