/**
* LICENSE_PLACEHOLDER
**/
import IconButton from 'material-ui/IconButton'
import InfoIcon from 'material-ui/svg-icons/action/info-outline'

/**
* Options display cell for table view
*/
class TableViewOptionsCellComponent extends React.Component {

  static propTypes = {
    onShowDescription: PropTypes.func.isRequired,
    tooltip: PropTypes.string.isRequired,
    styles: PropTypes.shape({
      buttonStyles: PropTypes.object.isRequired,
      iconStyles: PropTypes.object.isRequired,
    }).isRequired,
  }

  render() {
    const { onShowDescription, styles: { buttonStyles, iconStyles }, tooltip } = this.props

    return (
      <IconButton
        title={tooltip}
        style={buttonStyles}
        iconStyle={iconStyles}
        onTouchTap={onShowDescription}
      >
        <InfoIcon />
      </IconButton>
    )
  }
}
export default TableViewOptionsCellComponent
