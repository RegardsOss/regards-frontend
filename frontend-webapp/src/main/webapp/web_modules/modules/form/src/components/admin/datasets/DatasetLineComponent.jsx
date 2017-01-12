/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Display a dataset element into the infinite scroll list.
 */
class DatasetLineComponent extends React.Component {

  static propTypes = {
    entity: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
  }

  render() {
    return (
      <div>{this.props.entity.content.name}</div>
    )
  }
}

export default DatasetLineComponent
