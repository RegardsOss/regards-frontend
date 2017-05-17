/**
 * LICENSE_PLACEHOLDER
 **/
import keys from 'lodash/keys'
import FlatButton from 'material-ui/FlatButton'
import CheckBoxOutLineIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import CheckBoxIcon from 'material-ui/svg-icons/toggle/check-box'
import { i18nContextType } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { TableActions, TableSelectors, TableSelectionModes } from '@regardsoss/components'

/**
 * Table select all component
 */
export class TableSelectAllComponent extends React.Component {
  // TODO this should not be a container! selection should use a FULL shared redux state with table (ennoying to refactor it there)

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    tableName: PropTypes.string.isRequired,
    // Set by mapStateToProps
    // eslint-disable-next-line  react/no-unused-prop-types
    tableSelectionMode: PropTypes.string,
    // eslint-disable-next-line
    toggledElements: PropTypes.object,
    // Set by mapDispatchToProps
    toggleTableSelectionMode: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedMode: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    let selectedMode
    if (nextProps.tableSelectionMode === TableSelectionModes.includeSelected) {
      selectedMode = 0
    } else {
      selectedMode = keys(nextProps.toggledElements).length === 0 ? 1 : 0
    }
    this.setState({
      selectedMode,
    })
  }

  /**
   * Toggle selection mode from the Table if selection mode is not the same as the current one
   * @param event
   * @param value
   */
  handleChange = (event, value) => {
    if (value !== this.state.selectedMode) {
      this.props.toggleTableSelectionMode()
    }
  }

  render() {
    const [icon, labelKey, titleKey] = this.state.selectedMode === 0 ?
      // select all
      [<CheckBoxOutLineIcon />, 'table.select.all.label', 'table.select.all.tooltip'] :
      // deselect all
      [<CheckBoxIcon />, 'table.deselect.all.label', 'table.deselect.all.tooltip']

    return (
      <FlatButton
        onTouchTap={this.handleChange}
        icon={icon}
        title={this.context.intl.formatMessage({ id: titleKey })}
        label={this.context.intl.formatMessage({ id: labelKey })}
      />
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
  tableSelectionMode: TableSelectors.getTableSelectionMode(state, ownProps.tableName),
  toggledElements: TableSelectors.getToggledElements(state, ownProps.tableName),
})

const mapDispatchToProps = dispatch => ({
  toggleTableSelectionMode: () => dispatch(TableActions.toggleTableSelectionMode()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableSelectAllComponent)
