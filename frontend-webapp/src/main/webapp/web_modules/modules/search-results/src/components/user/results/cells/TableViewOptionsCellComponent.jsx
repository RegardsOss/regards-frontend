/**
* LICENSE_PLACEHOLDER
**/
import EntityDescriptionButton from '../options/EntityDescriptionButton'

/**
* Options display cell for table view
* @author Raphaël Mechali
*/
class TableViewOptionsCellComponent extends React.Component {

  static propTypes = {
    // tooltips, as i18n context isn't available in the table context
    descriptionTooltip: PropTypes.string.isRequired,
    styles: PropTypes.shape({ // styles as style context isn't available in the table context
      rootStyles: PropTypes.object.isRequired,
      buttonStyles: PropTypes.object.isRequired,
      iconStyles: PropTypes.object.isRequired,
    }).isRequired,
    // parent handlers
    onShowDescription: PropTypes.func.isRequired,
  }

  render() {
    const { onShowDescription, styles: { rootStyles, buttonStyles, iconStyles }, descriptionTooltip } = this.props
    return (
      <div style={rootStyles}>
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
