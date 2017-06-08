/**
 * LICENSE_PLACEHOLDER
 **/

class ShowableAtRender extends React.Component {

  static propTypes = {
    show: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
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
