/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TableRow, TableRowColumn } from 'material-ui/Table'
import { DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DamDomain } from '@regardsoss/domain'
import DBDatasourceFormMappingInputComponent from './DBDatasourceFormMappingInputComponent'

export class DBDatasourceFormMappingLineComponent extends React.Component {
  static propTypes = {
    tableAttributeList: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string,
      javaSqlType: PropTypes.string,
      isPrimaryKey: PropTypes.bool,
    })),
    modelAttribute: DataManagementShapes.ModelAttribute,
    isStaticAttribute: PropTypes.bool,
    onlyAdvancedConfiguration: PropTypes.bool,
    isEditingSQL: PropTypes.bool,
    change: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  showIfOptional = (value) => {
    const { intl: { formatMessage } } = this.context

    if (value) {
      return formatMessage({ id: 'datasource.form.mapping.table.optional.true' })
    }
    return formatMessage({ id: 'datasource.form.mapping.table.optional.false' })
  }

  renderFragmentName = () => {
    const { intl: { formatMessage } } = this.context

    const { isStaticAttribute, modelAttribute } = this.props
    if (!isStaticAttribute && modelAttribute.content.attribute.fragment.name !== DamDomain.DEFAULT_FRAGMENT) {
      return (
        <div>
          {formatMessage({ id: 'datasource.form.mapping.table.fragment' })}
          :
          {modelAttribute.content.attribute.fragment.name}
          <br />
        </div>
      )
    }
    return null
  }

  renderType = () => {
    const { intl: { formatMessage } } = this.context

    const { isStaticAttribute, modelAttribute } = this.props
    if (!isStaticAttribute) {
      return (
        <div>
          {formatMessage({ id: 'datasource.form.mapping.table.type' })}
          :
          {modelAttribute.content.attribute.type}
          <br />
        </div>
      )
    }
    return null
  }

  render() {
    const { intl: { formatMessage } } = this.context

    const {
      modelAttribute, tableAttributeList, onlyAdvancedConfiguration, isEditingSQL, change,
    } = this.props

    return (
      <TableRow>
        <TableRowColumn>
          {this.renderFragmentName()}
          {formatMessage({ id: 'datasource.form.mapping.table.attrName' })}
          :
          {modelAttribute.content.attribute.name}
          <br />
          {this.renderType()}
          {this.showIfOptional(modelAttribute.content.attribute.optional)}
        </TableRowColumn>
        <TableRowColumn>
          <DBDatasourceFormMappingInputComponent
            modelAttributeName={modelAttribute.content.attribute.name}
            tableAttributeList={tableAttributeList}
            onlyAdvancedConfiguration={onlyAdvancedConfiguration}
            isEditingSQL={isEditingSQL}
            change={change}
          />
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default DBDatasourceFormMappingLineComponent
