/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ColumnsIcon from 'mdi-material-ui/ViewColumn'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import SwitchSelectAllButton from '../../../../buttons/SwitchSelectAllButton'
import ColumnVisibilityCheckBox from './ColumnVisibilityCheckBox'
import TableColumnBuilder from '../TableColumnBuilder'

/**
 * Render a react component to display a panel to change visibility of table columns.
 *
 * @author Sébastien Binda
 */
export class TableColumnsVisibilityOption extends React.Component {
  static propTypes = {
    // Columns: describes a partial column shape (requires only key, label and visible state) to avoid
    // strong coupling with tables
    // eslint-disable-next-line react/no-unused-prop-types
    columns: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      visible: PropTypes.bool.isRequired,
    })).isRequired,
    onChangeColumnsVisibility: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Lifecycle hook: component will mount. Used here to keep the inner column model up to date */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /** Lifecycle hook: component will receive props. Used here to keep the inner column model up to date
   * @param nextProps next properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * On properties updated callback. Updates inner columns model (and initializes dialog state)
   * @param oldProps previous properties set
   * @param newProps next properties toset
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // re init only when columns truely change or when it is not yet initialized
    if (!this.state || !isEqual(oldProps.columns, newProps.columns)) {
      this.onReInitialize(newProps)
    }
  }

  /**
   * Re-initializes this state: hide dialog, clone current columns in state
   * @param props properties to consider when re-initializing
   */
  onReInitialize = ({ columns }) => this.onUpdateColumnsState(
    // get local column buffer with partial columns models, sorted on table columns order
    columns.map(({ key, visible, label }) => ({ key, visible, label })),
    { dialogVisible: false }) // mark dialog hidden

  /**
   * User callback: show dialog
   */
  onShowDialog = () => this.setState({ dialogVisible: true })

  /**
   * User callback: user selected all columns, update columns visibility
   */
  onSelectAll = () => this.onUpdateColumnsState(
    this.state.bufferedColumns.map(({ visible, ...otherFields }) => ({ visible: true, ...otherFields })))

  /**
   * User callback: user unselected all columns, update columns visibility
   */
  onUnselectAll = () => this.onUpdateColumnsState(
    this.state.bufferedColumns.map(({ visible, ...otherFields }) => ({ visible: false, ...otherFields })))

  /**
   * User callback: user checked / unchecked a column, updating its visibility
   * @param column column to toggle
   */
  onColumnVisibilityChanged = (column) => this.onUpdateColumnsState(
    this.state.bufferedColumns.map((bufferedColumn) => column.key === bufferedColumn.key ? { ...bufferedColumn, visible: !bufferedColumn.visible } : bufferedColumn))

  /**
   * On update columns: inner called to update state
   * @param newColumns new state columns
   * @param otherStateFields other fields to set in state
   */
  onUpdateColumnsState = (newColumns, otherStateFields = {}) => this.setState({
    bufferedColumns: newColumns,
    areAllVisible: newColumns.reduce((acc, { visible }) => acc && visible, true),
    ...otherStateFields,
  })

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

  render() {
    const { intl, moduleTheme: { dialog: { columnsVisibilityDialog: { titleBarStyle } } } } = this.context
    const { bufferedColumns, areAllVisible, dialogVisible } = this.state

    // are all columns hide?
    const allColumnsHidden = bufferedColumns.reduce((previousHidden, { visible }) => previousHidden && !visible, true)
    return (
      <FlatButton
        icon={<ColumnsIcon />}
        label={intl.formatMessage({ id: 'table.column.visibility.filter.option' })}
        secondary={dialogVisible}
        onClick={this.onShowDialog}
      >
        <Dialog
          title={// show title and select / unselect all right option
            <div style={titleBarStyle}>
              <div>
                {intl.formatMessage({ id: 'table.column.visibility.filter.dialog' })}
              </div>
              <SwitchSelectAllButton
                key="toggle.select.all"
                areAllSelected={areAllVisible}
                onSelectAll={this.onSelectAll}
                onUnselectAll={this.onUnselectAll}
              />
            </div>
          }
          modal={false}
          open={dialogVisible}
          onRequestClose={this.onCancel}
          actions={<>
            <FlatButton
              key="Cancel"
              label={intl.formatMessage({ id: 'table.column.visibility.filter.cancel' })}
              primary
              keyboardFocused
              onClick={this.onCancel}
            />
            <FlatButton
              key="OK"
              label={intl.formatMessage({ id: 'table.column.visibility.filter.confirm' })}
              onClick={this.onConfirm}
              disabled={allColumnsHidden}
            />
          </>}
          autoScrollBodyContent
        >
          <div>
            {map(bufferedColumns, (column) => (
              column.key !== TableColumnBuilder.selectionColumnKey
                ? <ColumnVisibilityCheckBox
                    key={column.key}
                    column={column}
                    onToggleVisibility={this.onColumnVisibilityChanged}
                /> : null))}
          </div>
        </Dialog>
      </FlatButton>
    )
  }
}

export default TableColumnsVisibilityOption
