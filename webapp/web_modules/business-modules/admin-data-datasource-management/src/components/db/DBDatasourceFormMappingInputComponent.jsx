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
import flow from 'lodash/flow'
import fpsortBy from 'lodash/fp/sortBy'
import fpmap from 'lodash/fp/map'
import { RenderTextField, RenderSelectField, Field } from '@regardsoss/form-utils'
import { ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import states from '../../domain/db/FormMappingStates'

/**
 * @author Théo Lasserre
 */
class DBDatasourceFormMappingInputComponent extends React.Component {
  static propTypes = {
    tableAttributeList: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string,
      javaSqlType: PropTypes.string,
      isPrimaryKey: PropTypes.bool,
    })),
    modelAttributeName: PropTypes.string.isRequired,
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

  handleToggleAdvanced = () => {
    const { modelAttributeName, change } = this.props
    const { showAdvanced, prefix } = this.state
    const fieldSuffix = showAdvanced ? 'sql' : 'tableAttribute'
    change(`${prefix}.attributes.${modelAttributeName}.${fieldSuffix}`, '')
    this.setState({
      showAdvanced: !showAdvanced,
    })
  }

  render() {
    const { intl: { formatMessage } } = this.context

    const { modelAttributeName, tableAttributeList, onlyAdvancedConfiguration } = this.props
    const { showAdvanced, prefix } = this.state

    if (onlyAdvancedConfiguration) {
      return (
        <div>
          <Field
            name={`${prefix}.attributes.${modelAttributeName}.sql`}
            fullWidth
            component={RenderTextField}
            type="text"
            label={formatMessage({ id: 'datasource.form.mapping.table.input' })}
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
            key={tableAttribute.name}
            primaryText={`${tableAttribute.name}: ${tableAttribute.javaSqlType}`}
          />
        )),
      )(tableAttributeList),
    ]
    return (
      <div>
        <Checkbox
          label={formatMessage({ id: 'datasource.form.mapping.table.showAdvancedConfiguration' })}
          checked={showAdvanced}
          onClick={this.handleToggleAdvanced}
        />
        <ShowableAtRender
          show={showAdvanced}
        >
          <Field
            name={`${prefix}.attributes.${modelAttributeName}.sql`}
            fullWidth
            component={RenderTextField}
            type="text"
            label={formatMessage({ id: 'datasource.form.mapping.table.input' })}
            multiLine
          />
        </ShowableAtRender>
        <ShowableAtRender
          show={!showAdvanced}
        >
          <Field
            name={`${prefix}.attributes.${modelAttributeName}.tableAttribute`}
            fullWidth
            component={RenderSelectField}
            type="text"
            label={formatMessage({ id: 'datasource.form.mapping.table.select' })}
          >
            {items}
          </Field>
        </ShowableAtRender>
      </div>)
  }
}
export default DBDatasourceFormMappingInputComponent
