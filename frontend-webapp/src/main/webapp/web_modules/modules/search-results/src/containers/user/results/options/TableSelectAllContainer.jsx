/**
* LICENSE_PLACEHOLDER
**/
import isEqual from 'lodash/isEqual'
import keys from 'lodash/keys'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { TableSelectionModes } from '@regardsoss/components'
import TableClient from '../../../../clients/TableClient'
import TableSelectAllComponent from '../../../../components/user/results/options/TableSelectAllComponent'

/**
 * Container for table select all component (used by list to select all elements)
 * @author Raphaël Mechali
 */
export class TableSelectAllContainer extends React.Component {

  static mapStateToProps = (state, { pageSelectors }) => ({
    // results metadata
    pageMetadata: pageSelectors.getMetaData(state),
    // selection
    toggledElements: TableClient.tableSelectors.getToggledElements(state),
    selectionMode: TableClient.tableSelectors.getSelectionMode(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchSelectAll: () => dispatch(TableClient.tableActions.selectAll()),
    dispatchUnselectAll: () => dispatch(TableClient.tableActions.unselectAll()),
  })

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableSelectors to retrieve entities from store
    // from mapStateToProps
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)),
    // from mapDispatchToProps
    dispatchSelectAll: PropTypes.func.isRequired,
    dispatchUnselectAll: PropTypes.func.isRequired,
  }

  componentWillMount = () => this.onUpdate(this.props)

  componentWillReceiveProps = nextProps => this.onUpdate(nextProps)

  /**
   * Reports to state properties related updates
   * @param properties updated properties
   */
  onUpdate = (properties) => {
    const oldState = this.state
    const newState = {
      allSelected: this.areAllSelected(properties),
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  onToggleSelectAll = () => {
    const { dispatchSelectAll, dispatchUnselectAll } = this.props
    if (this.state.allSelected) {
      dispatchUnselectAll()
    } else {
      dispatchSelectAll()
    }
  }

  /**
  * Are all rows selected?  (cached in state)
  * @param properties
  * @return true if all rows are selected
  */
  areAllSelected = ({ pageMetadata, toggledElements, selectionMode }) => {
    const totalElements = (pageMetadata && pageMetadata.totalElements) || 0
    const selectionSize = keys(toggledElements).length
    // selectionSize > 0 avoid showing 'unselect all' when table is empty
    return (selectionMode === TableSelectionModes.includeSelected && selectionSize === totalElements && selectionSize > 0) ||
      (selectionMode === TableSelectionModes.excludeSelected && selectionSize === 0)
  }

  render() {
    const { allSelected } = this.state
    const { pageMetadata } = this.props
    if (!pageMetadata || !pageMetadata.totalElements) {
      // hide select all
      return null
    }
    return (
      <TableSelectAllComponent
        allSelected={allSelected}
        onToggleSelectAll={this.onToggleSelectAll}
      />
    )
  }
}
export default connect(
  TableSelectAllContainer.mapStateToProps,
  TableSelectAllContainer.mapDispatchToProps)(TableSelectAllContainer)
