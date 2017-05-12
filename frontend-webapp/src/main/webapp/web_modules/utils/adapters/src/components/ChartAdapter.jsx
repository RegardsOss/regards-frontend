/**
 * LICENSE_PLACEHOLDER
 **/
export const HeadlessPlaceholder = props => (
  <div>
    <h1>Headless chart placeholder</h1>
    <h2>Properties: </h2>
    <p>{JSON.stringify(props)}</p>
  </div>
)

/**
 chart JS adapter: prevents chart JS loading to explode mocha tests due to headless environment
 */
export default class ChartAdapter extends React.Component {

  static propTypes = {
    ChartComponent: PropTypes.string.isRequired,
  }

  componentWillMount() {
    const { ChartComponent } = this.props

    let WrappedComponent
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'coverage') {
      // in test, avoid loading the library
      WrappedComponent = HeadlessPlaceholder
    } else {
      // load component from library
      WrappedComponent = require('react-chartjs-2')[ChartComponent]
    }
    // store place holder in state
    this.setState({ WrappedComponent })
  }

  render() {
    const { WrappedComponent } = this.state
    return (
      <WrappedComponent {...this.props} />
    )
  }

}
