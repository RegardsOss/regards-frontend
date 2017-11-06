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
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Checkbox from 'material-ui/Checkbox'
import ColumnsIcon from 'material-ui/svg-icons/action/view-column'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import ColumnConfiguration from '../content/columns/model/ColumnConfiguration'
import messages from '../i18n'

/**
 * Render a react component to display a panel to change visibility of table columns.
 *
 * @author Sébastien Binda
 */
export class TableColumnsVisibilityOption extends React.Component {

  static propTypes = {
    columns: PropTypes.arrayOf(ColumnConfiguration),
    // hidden columns initial list
    hiddenColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    // callback for columns changes, next list of hidden columns label is provided as fist param.
    // [string] => ()
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
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(nextProps, this.props)

  /**
   * On properties updated callback. Updates inner columns model (and initializes dialog state)
   * @param props properties to consider
   */
  onPropertiesUpdated = (newProps, oldProps = {}) => {
    if (!isEqual(newProps.columns, oldProps.columns) || !isEqual(newProps.hiddenColumns, oldProps.hiddenColumns)) {
      this.onReInitialize(newProps)
    }
  }


  /**
   * Re-initializes this state: hide dialog, clone current columns in state
   * @param props properties to consider when re-initializing
   */
  onReInitialize = ({ hiddenColumns }) => this.setState({ dialogVisible: false, hiddenColumns: [...hiddenColumns] })

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
    const { hiddenColumns } = this.state
    // notify of the nex columns state
    onChangeColumnsVisibility(hiddenColumns)
    // hide dialog is not required as hidden column list will change
  }

  /**
   * User callback: user checked / unchecked a column, updating its visibility
   * @param column column to toggle
   */
  onColumnVisibilityChanged = (column) => {
    const previousHiddenColumns = this.state.hiddenColumns
    let newHiddenColumns
    const foundIndex = previousHiddenColumns.findIndex(label => label === column.label)
    if (foundIndex < 0) {
      // add column in hidden list
      newHiddenColumns = [...previousHiddenColumns, column.label]
    } else {
      newHiddenColumns = [
        ...previousHiddenColumns.slice(0, foundIndex),
        ...previousHiddenColumns.slice(foundIndex + 1)]
    }
    this.setState({ hiddenColumns: newHiddenColumns })
  }

  render() {
    const { intl } = this.context
    const { hiddenColumns: initialHiddenColumns, columns = [] } = this.props
    const { hiddenColumns, dialogVisible } = this.state

    // disable confirm button when: there is no change OR there is no longer any visible column
    const confirmDisabled = isEqual(initialHiddenColumns, hiddenColumns) || hiddenColumns.length >= columns.length

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
        disabled={confirmDisabled}
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
            {map(columns, (column, idx) => (
              <Checkbox
                key={column.label}
                label={column.label}
                checked={!hiddenColumns.includes(column.label)}
                onCheck={() => this.onColumnVisibilityChanged(column)}
              />
            ))}
          </div>
        </Dialog>
      </FlatButton>
    )
  }
}

export default withI18n(messages)(TableColumnsVisibilityOption)
