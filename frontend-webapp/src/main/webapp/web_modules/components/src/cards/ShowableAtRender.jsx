/** @module common */

class ShowableAtRender extends React.Component {

  static propTypes = {
    show: React.PropTypes.bool,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  }

  render() {
    const { show, children } = this.props
    if (show) {
      if (React.Children.count(children) === 1) {
        return React.Children.only(children)
      }
      return (<div>{children}</div>)
    }
    return null
  }
}

export default ShowableAtRender
