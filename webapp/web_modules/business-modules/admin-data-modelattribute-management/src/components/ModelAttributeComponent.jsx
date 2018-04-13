/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { PluginConfigurationPickerComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import get from 'lodash/get'

class ModelAttributeComponent extends React.Component {
  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static propTypes = {
    pluginConfigurationList: CommonShapes.PluginConfigurationArray,
    pluginMetaDataList: CommonShapes.PluginMetaDataArray,
    modelAttribute: DataManagementShapes.ModelAttribute,
    handleComputationUpdate: PropTypes.func,
    shouldDisplayHeader: PropTypes.bool,
  }

  static defaultProps = {
    shouldDisplayHeader: true,
  }
  /**
   * When the user select a plugin configuration, send the updated value to the server
   * @param value the pluginConfiguration id
   */
  onPluginConfigurationChange = value => this.props.handleComputationUpdate(value)

  showIfAttributeIsNotOptional = (modelAttribute) => {
    if (!modelAttribute.content.attribute.optional) {
      return ' (*)'
    }
    return null
  }

  displayTableHeader = () => {
    if (this.props.shouldDisplayHeader) {
      return (
        <TableHeader
          enableSelectAll={false}
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn><FormattedMessage id="modelattr.edit.table.name" /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id="modelattr.edit.table.computationMethod" /></TableHeaderColumn>
          </TableRow>
        </TableHeader>)
    }
    return null
  }

  render() {
    const { modelAttribute, pluginMetaDataList, pluginConfigurationList } = this.props
    return (
      <Table
        selectable={false}
      >
        {this.displayTableHeader()}
        <TableBody
          displayRowCheckbox={false}
          preScanRows={false}
          showRowHover={false}
        >
          <TableRow>
            <TableRowColumn>{modelAttribute.content.attribute.name}{this.showIfAttributeIsNotOptional(modelAttribute)} ({modelAttribute.content.attribute.type})</TableRowColumn>
            <TableRowColumn>
              <PluginConfigurationPickerComponent
                onChange={this.onPluginConfigurationChange}
                pluginMetaDataList={pluginMetaDataList}
                pluginConfigurationList={pluginConfigurationList}
                currentPluginConfiguration={get(modelAttribute, 'content.computationConf', undefined)}
              />
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default ModelAttributeComponent
