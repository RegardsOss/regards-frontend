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
import flow from 'lodash/flow'
import fpsortBy from 'lodash/fp/sortBy'
import fpmap from 'lodash/fp/map'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import { RenderTextField, RenderSelectField, Field } from '@regardsoss/form-utils'
import { ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import { DamDomain } from '@regardsoss/domain'
import states from '../../domain/db/FormMappingStates'

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

  state = {
    // Only used when onlyAdvancedConfiguration === false
    showAdvanced: this.props.isEditingSQL || false,
    prefix: this.props.onlyAdvancedConfiguration ? states.CUSTOM_FROM : states.FROM_TABLE,
  }

  showIfOptional = (value) => {
    if (value) {
      return (<FormattedMessage id="datasource.form.mapping.table.optional.true" />)
    }
    return (<FormattedMessage id="datasource.form.mapping.table.optional.false" />)
  }

  handleToggleAdvanced = () => {
    const { modelAttribute } = this.props
    const { showAdvanced, prefix } = this.state
    const fieldSuffix = showAdvanced ? 'sql' : 'tableAttribute'
    this.props.change(`${prefix}.attributes.${modelAttribute.content.attribute.name}.${fieldSuffix}`, '')
    this.setState({
      showAdvanced: !showAdvanced,
    })
  }

  renderInputs = () => {
    const { modelAttribute, tableAttributeList, onlyAdvancedConfiguration } = this.props
    const { showAdvanced, prefix } = this.state
    if (onlyAdvancedConfiguration) {
      return (
        <div>
          <Field
            name={`${prefix}.attributes.${modelAttribute.content.attribute.name}.sql`}
            fullWidth
            component={RenderTextField}
            type="text"
            label={this.context.intl.formatMessage({ id: 'datasource.form.mapping.table.input' })}
            multiLine
          />
        </div>)
    }

    const items = [
      // Add a no value item
      (<MenuItem
        value=""
        key="no_value"
        primaryText=""
      />),
      ...flow(
        fpsortBy(['name']),
        fpmap((tableAttribute) => (
          <MenuItem
            value={tableAttribute.name}
            className={`selenium-pickMapping-${tableAttribute.name}`}
            key={tableAttribute.name}
            primaryText={`${tableAttribute.name}: ${tableAttribute.javaSqlType}`}
          />
        )),
      )(tableAttributeList),
    ]
    return (
      <div>
        <Checkbox
          label={this.context.intl.formatMessage({ id: 'datasource.form.mapping.table.showAdvancedConfiguration' })}
          checked={showAdvanced}
          onClick={this.handleToggleAdvanced}
          className={`selenium-useSQL-${modelAttribute.content.attribute.name}`}
        />
        <ShowableAtRender
          show={showAdvanced}
        >
          <Field
            name={`${prefix}.attributes.${modelAttribute.content.attribute.name}.sql`}
            fullWidth
            component={RenderTextField}
            type="text"
            label={this.context.intl.formatMessage({ id: 'datasource.form.mapping.table.input' })}
            multiLine
          />
        </ShowableAtRender>
        <ShowableAtRender
          show={!showAdvanced}
        >
          <Field
            name={`${prefix}.attributes.${modelAttribute.content.attribute.name}.tableAttribute`}
            fullWidth
            component={RenderSelectField}
            type="text"
            label={this.context.intl.formatMessage({ id: 'datasource.form.mapping.table.select' })}
          >
            {items}
          </Field>
        </ShowableAtRender>
      </div>)
  }

  renderFragmentName = () => {
    const { isStaticAttribute, modelAttribute } = this.props
    if (!isStaticAttribute && modelAttribute.content.attribute.fragment.name !== DamDomain.DEFAULT_FRAGMENT) {
      return (
        <div>
          <FormattedMessage id="datasource.form.mapping.table.fragment" />
          :
          {modelAttribute.content.attribute.fragment.name}
          <br />
        </div>
      )
    }
    return null
  }

  renderType = () => {
    const { isStaticAttribute, modelAttribute } = this.props
    if (!isStaticAttribute) {
      return (
        <div>
          <FormattedMessage id="datasource.form.mapping.table.type" />
          :
          {modelAttribute.content.attribute.type}
          <br />
        </div>
      )
    }
    return null
  }

  render() {
    const { modelAttribute } = this.props

    return (
      <TableRow>
        <TableRowColumn>
          {this.renderFragmentName()}
          <FormattedMessage id="datasource.form.mapping.table.attrName" />
          :
          {modelAttribute.content.attribute.name}
          <br />
          {this.renderType()}
          {this.showIfOptional(modelAttribute.content.attribute.optional)}
        </TableRowColumn>
        <TableRowColumn>
          {this.renderInputs()}
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default DBDatasourceFormMappingLineComponent
