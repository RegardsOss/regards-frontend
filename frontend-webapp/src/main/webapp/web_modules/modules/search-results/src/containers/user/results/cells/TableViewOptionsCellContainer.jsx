/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { CatalogEntity } from '@regardsoss/model'
import { descriptionLevelActions } from '../../../../models/description/DescriptionLevelModel'
import TableViewOptionsCellComponent from '../../../../components/user/results/cells/TableViewOptionsCellComponent'

/**
* Container for list view entity cell
*/
export class TableViewOptionsCellContainer extends React.Component {

  static mapDispatchToProps(dispatch) {
    return {
      dispatchShowDescription: entity => dispatch(descriptionLevelActions.show(entity)),
    }
  }

  static propTypes = {
    // Parameters set by table component
    entity: CatalogEntity.isRequired, // Entity to display
    // from cell components properties
    tooltip: PropTypes.string.isRequired, // tooltip, as i18n could not be solved in the table context
    styles: PropTypes.shape({
      buttonStyles: PropTypes.object.isRequired,
      iconStyles: PropTypes.object.isRequired,
    }).isRequired,
    // from map state to props
    dispatchShowDescription: PropTypes.func.isRequired,
  }

  /**
  * Callback when user asks description
  */
  onShowDescription = () => {
    // dispatch show description event
    const { entity, dispatchShowDescription } = this.props
    dispatchShowDescription(entity)
  }

  render() {
    const { styles, tooltip } = this.props
    return (
      <TableViewOptionsCellComponent
        styles={styles}
        tooltip={tooltip}
        onShowDescription={this.onShowDescription}
      />
    )
  }
}
export default connect(null, TableViewOptionsCellContainer.mapDispatchToProps)(TableViewOptionsCellContainer)
