/**
* LICENSE_PLACEHOLDER
**/
import { AccessShapes } from '@regardsoss/shape'
import EntityDescriptionButton from '../options/EntityDescriptionButton'
import OneElementServicesButton from '../options/OneElementServicesButton'


/**
 * Options display cell for table view
 * @author Raphaël Mechali
 */
class TableViewOptionsCellComponent extends React.Component {

  static propTypes = {
    services: AccessShapes.PluginServiceWithContentArray,
    // tooltips, as i18n context isn't available in the table context
    servicesTooltip: PropTypes.string.isRequired,
    descriptionTooltip: PropTypes.string.isRequired,
    styles: PropTypes.shape({ // styles as style context isn't available in the table context
      rootStyles: PropTypes.object.isRequired,
      buttonStyles: PropTypes.object.isRequired,
      iconStyles: PropTypes.object.isRequired,
    }).isRequired,
    // parent handlers
    onShowDescription: PropTypes.func.isRequired,
    onServiceStarted: PropTypes.func.isRequired,
  }

  render() {
    const { onShowDescription, styles: { rootStyles, buttonStyles, iconStyles },
      services, onServiceStarted, servicesTooltip, descriptionTooltip } = this.props
    return (
      <div style={rootStyles}>
        <OneElementServicesButton
          style={buttonStyles}
          iconStyle={iconStyles}
          tooltip={servicesTooltip}
          services={services}
          onServiceStarted={onServiceStarted}
        />
        <EntityDescriptionButton
          style={buttonStyles}
          iconStyle={iconStyles}
          tooltip={descriptionTooltip}
          onShowDescription={onShowDescription}
        />
      </div>
    )
  }
}
export default TableViewOptionsCellComponent
