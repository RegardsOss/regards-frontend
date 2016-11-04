/** @module common */


function ShowableAtRender(props) {
  if (props.show) {
    const children = props.children
    if (React.Children.count(children) === 1) {
      return React.Children.only(children)
    }
    return (<div>{children}</div>)
  }
  return null
}
ShowableAtRender.propTypes = {
  show: React.PropTypes.bool.isRequired,
  children: React.PropTypes.element.isRequired,
}
export default ShowableAtRender
