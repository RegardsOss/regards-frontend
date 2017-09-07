/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { CatalogShapes } from '@regardsoss/shape'
import { descriptionLevelActions } from '../../../../models/description/DescriptionLevelModel'
import TableViewOptionsCellComponent from '../../../../components/user/results/cells/TableViewOptionsCellComponent'


/**
* Container for list view entity cell
* @author Raphaël Mechali
*/
export class TableViewOptionsCellContainer extends React.Component {

  static mapDispatchToProps(dispatch) {
    return {
      dispatchShowDescription: entity => dispatch(descriptionLevelActions.show(entity)),
    }
  }

  static propTypes = {
    // Parameters set by table component
    entity: CatalogShapes.Entity.isRequired,
    // tooltips, as i18n context isn't available in the table context
    descriptionTooltip: PropTypes.string.isRequired,
    styles: PropTypes.shape({   // styles as style context isn't available in the table context
      rootStyles: PropTypes.object.isRequired,
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
    const { styles, entity, servicesTooltip, descriptionTooltip } = this.props
    return (
      <TableViewOptionsCellComponent
        services={entity.content.services}
        styles={styles}
        descriptionTooltip={descriptionTooltip}
        onShowDescription={this.onShowDescription}
      />
    )
  }
}
export default connect(null, TableViewOptionsCellContainer.mapDispatchToProps)(TableViewOptionsCellContainer)
