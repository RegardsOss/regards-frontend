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
import map from 'lodash/map'
import get from 'lodash/get'
import keys from 'lodash/keys'
import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * @author Théo Lasserre
 */
class DisplayExternalDiffusionComponent extends React.Component {
  static propTypes = {
    sessionStep: AdminShapes.SessionStep,
    title: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getStyle = (pendingValue, doneValue) => {
    const {
      moduleTheme: {
        stepStyle: {
          externalDiffusionStyle: { rowNoValueStyle, rowWaitingStyle, rowDefaultStyle },
        },
      },
    } = this.context
    let style
    if (pendingValue <= 0 && doneValue <= 0) {
      style = rowNoValueStyle
    } else if (pendingValue > 0) {
      style = rowWaitingStyle
    } else {
      style = rowDefaultStyle
    }
    return style
  }

  getValueStyle = (propertyValue, rowStyle, rowNoValueStyle) => propertyValue > 0 ? rowStyle : rowNoValueStyle

  getTableBody = () => {
    const { sessionStep } = this.props
    const {
      moduleTheme: {
        stepStyle: {
          externalDiffusionStyle: { rowNoValueStyle, rowWaitingStyle, rowDefaultStyle },
        },
      },
    } = this.context
    const properties = get(sessionStep, 'properties', null)
    if (properties) {
      return map(keys(properties), (recipientKey) => {
        const pendingValue = properties[recipientKey].pending
        const doneValue = properties[recipientKey].done
        return (<TableRow key={recipientKey}>
          <TableRowColumn style={this.getStyle(pendingValue, doneValue)}>{recipientKey}</TableRowColumn>
          <TableRowColumn style={this.getValueStyle(pendingValue, rowWaitingStyle, rowNoValueStyle)}>{pendingValue}</TableRowColumn>
          <TableRowColumn style={this.getValueStyle(doneValue, rowDefaultStyle, rowNoValueStyle)}>{doneValue}</TableRowColumn>
        </TableRow>)
      })
    }
    return null
  }

  render() {
    const { title } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        stepStyle: {
          externalDiffusionStyle: { tableHeaderColumnStyle, tableHeaderStyle },
        },
        selectedSessionStyle: {
          propertiesTitleStyle, propertiesDivStyle,
        },
      },
    } = this.context
    return (
      <div style={propertiesTitleStyle}>
        <div style={propertiesDivStyle}>
          {title}
        </div>
        <Table
          selectable={false}
          headerStyle={tableHeaderStyle}
        >
          <TableHeader
            enableSelectAll={false}
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn
                style={tableHeaderColumnStyle}
              >
                {formatMessage({ id: 'dashboard.selectedsession.DISSEMINATION.fem_dissemination.table.column.name' })}
              </TableHeaderColumn>
              <TableHeaderColumn
                style={tableHeaderColumnStyle}
              >
                {formatMessage({ id: 'dashboard.selectedsession.DISSEMINATION.fem_dissemination.table.column.pending' })}
              </TableHeaderColumn>
              <TableHeaderColumn
                style={tableHeaderColumnStyle}
              >
                {formatMessage({ id: 'dashboard.selectedsession.DISSEMINATION.fem_dissemination.table.column.done' })}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            preScanRows={false}
            showRowHover
          >
            {this.getTableBody()}
          </TableBody>
        </Table>
      </div>
    )
  }
}
export default DisplayExternalDiffusionComponent
