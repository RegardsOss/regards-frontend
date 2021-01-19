/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import compact from 'lodash/compact'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import {
  Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn,
} from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { PluginConfigurationPickerComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

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

  /** Entity types allowing computing plugins usage */
  static ALLOWING_COMPUTING_PLUGINS_TYPES = [
    DamDomain.ENTITY_TYPES_ENUM.DATASET,
  ]

  static typeStyle = {
    fontStyle: 'italic',
  }

  /**
   * When the user select a plugin configuration, send the updated value to the server
   * @param value the pluginConfiguration id
   */
  onPluginConfigurationChange = (value) => this.props.handleComputationUpdate(value)

  showIfAttributeIsNotOptional = (modelAttribute) => {
    if (!modelAttribute.content.attribute.optional) {
      return ' (*)'
    }
    return null
  }

  /**
   * @returns {bool} true when Is computing plugin selection is allowed (computed using parent model type)
   */
  isComputingPluginAllowed = () => {
    const { modelAttribute } = this.props
    const parentModelType = modelAttribute.content.model.type
    return ModelAttributeComponent.ALLOWING_COMPUTING_PLUGINS_TYPES.includes(parentModelType)
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
            { /* show 2nd column only when the computing plugins are allowed */
              this.isComputingPluginAllowed() ? (
                <TableHeaderColumn><FormattedMessage id="modelattr.edit.table.computationMethod" /></TableHeaderColumn>
              ) : null
            }
          </TableRow>
        </TableHeader>)
    }
    return null
  }

  getAttrInfo = (attr) => (
    compact([attr.label, attr.description]).join(' - ')
  )

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
            <TableRowColumn title={this.getAttrInfo(modelAttribute.content.attribute)}>
              {modelAttribute.content.attribute.name}
              {this.showIfAttributeIsNotOptional(modelAttribute)}
              {' - '}
              <span style={ModelAttributeComponent.typeStyle}>
                {modelAttribute.content.attribute.type}
              </span>
            </TableRowColumn>
            { /* show 2nd column only when the computing plugins are allowed */
              this.isComputingPluginAllowed() ? (
                <TableRowColumn>
                  <PluginConfigurationPickerComponent
                    onChange={this.onPluginConfigurationChange}
                    pluginMetaDataList={pluginMetaDataList}
                    pluginConfigurationList={pluginConfigurationList}
                    currentPluginConfiguration={get(modelAttribute, 'content.computationConf', undefined)}
                  />
                </TableRowColumn>
              ) : null
            }
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default ModelAttributeComponent
