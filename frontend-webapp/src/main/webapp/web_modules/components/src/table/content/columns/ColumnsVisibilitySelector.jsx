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
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Checkbox from 'material-ui/Checkbox'
import { i18nContextType } from '@regardsoss/i18n'
import ColumnConfiguration from './model/ColumnConfiguration'

/**
 * Render a react component to display a panel to change visibility of table columns.
 *
 * @author Sébastien Binda
 */
class ColumnsVisibilitySelector extends React.Component {

  static propTypes = {
    columns: PropTypes.arrayOf(ColumnConfiguration),
    hiddenColumns: PropTypes.arrayOf(PropTypes.string),
    changeColumnVisibility: PropTypes.func,
    closePanel: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl } = this.context
    const actions = [
      <FlatButton
        key="OK"
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.props.closePanel}
      />,
    ]

    return (
      <Dialog
        title={intl.formatMessage({ id: 'table.column.visibility.filter' })}
        modal={false}
        open
        onRequestClose={this.props.closePanel}
        actions={actions}
        autoScrollBodyContent
      >
        <div className="row">
          {map(this.props.columns, (column, idx) => (
            <Checkbox key={column.label} label={column.label} checked={!this.props.hiddenColumns.includes(column.label)} onCheck={() => this.props.changeColumnVisibility(column.label)} />
          ))}
        </div>
      </Dialog>
    )
  }
}

export default ColumnsVisibilitySelector
