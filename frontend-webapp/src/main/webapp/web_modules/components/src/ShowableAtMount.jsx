class ShowableAtMount extends React.Component {

  constructor() {
    super()
    this.oldRender = this.render
    this.render = () => (
      null
    )
  }

  componentWillMount() {
    if (this.props.show) {
      this.render = this.oldRender
    }
  }

  render() {
    return (<div>{this.props.children}</div>)
  }
}

ShowableAtMount.propTypes = {
  show: React.PropTypes.bool.isRequired,
  children: React.PropTypes.element.isRequired,
}

export default ShowableAtMount
