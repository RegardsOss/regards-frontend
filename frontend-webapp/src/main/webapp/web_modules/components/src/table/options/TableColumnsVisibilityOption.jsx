/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Checkbox from 'material-ui/Checkbox'
import ColumnsIcon from 'material-ui/svg-icons/action/view-column'
import { i18nContextType } from '@regardsoss/i18n'
import TableColumnConfiguration from '../content/columns/model/TableColumnConfiguration'

/**
 * Render a react component to display a panel to change visibility of table columns.
 *
 * @author Sébastien Binda
 */
export class TableColumnsVisibilityOption extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    columns: PropTypes.arrayOf(TableColumnConfiguration).isRequired,
    onChangeColumnsVisibility: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Lifecycle hook: component will mount. Used here to keep the inner column model up to date */
  componentWillMount = () => this.onPropertiesUpdated(this.props)

  /** Lifecycle hook: component will receive props. Used here to keep the inner column model up to date
   * @param nextProps next properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(nextProps)

  /**
   * On properties updated callback. Updates inner columns model (and initializes dialog state)
   * @param newProps properties to consider
   */
  onPropertiesUpdated = (newProps) => {
    this.onReInitialize(newProps)
  }


  /**
   * Re-initializes this state: hide dialog, clone current columns in state
   * @param props properties to consider when re-initializing
   */
  onReInitialize = ({ columns }) => this.setState({
    dialogVisible: false,
    // get local column buffer, sorted alphabetically
    bufferedColumns: sortBy(columns.map(c => ({ ...c })), ['label']),
  })

  /**
   * User callback: show dialog
   */
  onShowDialog = () => this.setState({ dialogVisible: true })

  /**
   * User callback: dialog edition cancelled
   */
  onCancel = () => this.onReInitialize(this.props)

  /**
   * User callback: dialog edition confirmed
   */
  onConfirm = () => {
    const { onChangeColumnsVisibility } = this.props
    const { bufferedColumns } = this.state
    // notify of the next columns state
    onChangeColumnsVisibility(bufferedColumns)
    this.setState({ dialogVisible: false })
  }

  /**
   * User callback: user checked / unchecked a column, updating its visibility
   * @param column column to toggle
   */
  onColumnVisibilityChanged = (column) => {
    this.setState({
      bufferedColumns: this.state.bufferedColumns.map(bufferedColumn =>
        // swap visibility of that column
        column.key === bufferedColumn.key ? { ...bufferedColumn, visible: !bufferedColumn.visible } : bufferedColumn),
    })
  }

  render() {
    const { intl } = this.context
    const { bufferedColumns, dialogVisible } = this.state

    // are all columns hidde?
    const allColumnsHidden = bufferedColumns.reduce((previousHidden, { visible }) => previousHidden && !visible, true)
    const actions = [
      <FlatButton
        key="Cancel"
        label={intl.formatMessage({ id: 'table.column.visibility.filter.cancel' })}
        primary
        keyboardFocused
        onTouchTap={this.onCancel}
      />,
      <FlatButton
        key="OK"
        label={intl.formatMessage({ id: 'table.column.visibility.filter.confirm' })}
        onTouchTap={this.onConfirm}
        disabled={allColumnsHidden}
      />,
    ]

    return (
      <FlatButton
        icon={<ColumnsIcon />}
        label={intl.formatMessage({ id: 'table.column.visibility.filter.option' })}
        secondary={dialogVisible}
        onTouchTap={this.onShowDialog}
      >
        <Dialog
          title={intl.formatMessage({ id: 'table.column.visibility.filter.dialog' })}
          modal={false}
          open={dialogVisible}
          onRequestClose={this.onCancel}
          actions={actions}
          autoScrollBodyContent
        >
          <div className="row">
            {map(bufferedColumns, (column, index) => (
              <Checkbox
                key={column.key}
                label={column.label}
                checked={column.visible}
                onCheck={() => this.onColumnVisibilityChanged(column)}
              />
            ))}
          </div>
        </Dialog>
      </FlatButton>
    )
  }
}

export default TableColumnsVisibilityOption
