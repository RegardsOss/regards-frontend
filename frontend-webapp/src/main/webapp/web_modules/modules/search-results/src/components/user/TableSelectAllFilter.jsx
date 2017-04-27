/**
 * LICENSE_PLACEHOLDER
 **/
import keys from 'lodash/keys'
import FlatButton from 'material-ui/FlatButton'
import CheckBoxOutLineIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import CheckBoxIcon from 'material-ui/svg-icons/toggle/check-box'
import { connect } from '@regardsoss/redux'
import { TableActions, TableSelectors, TableSelectionModes } from '@regardsoss/components'

/**
 * React component to display a table filter for select all / unselect all entities
 */
class TableSelectAllFilter extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    tableName: React.PropTypes.string.isRequired,
    // Set by mapStateToProps
    // eslint-disable-next-line  react/no-unused-prop-types
    tableSelectionMode: React.PropTypes.string,
    // eslint-disable-next-line
    toggledElements: React.PropTypes.object,
    // Set by mapDispatchToProps
    toggleTableSelectionMode: React.PropTypes.func,
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
    const icon = this.state.selectedMode === 0 ? <CheckBoxOutLineIcon /> : <CheckBoxIcon />
    return (
      <div
        style={{
          display: 'inline-block',
          marginBottom: 10,
        }}
      >
        <FlatButton
          onTouchTap={this.handleChange}
          icon={icon}
          secondary={this.state.selectedMode === 1}
        />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableSelectAllFilter)
