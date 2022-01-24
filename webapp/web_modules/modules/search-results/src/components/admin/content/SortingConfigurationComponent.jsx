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
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FieldsGroup } from '@regardsoss/form-utils'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import { DataViewsConfiguration, DatasetViewsConfiguration } from '../../../shapes/ModuleConfiguration'

/**
 * Initial sorting configuration component
 * @author Raphaël Mechali
 */
class SortingConfigurationComponent extends React.Component {
  static propTypes = {
    availableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    // Namespace and current form values are provided for type
    currentTypeNamespace: PropTypes.string.isRequired,
    currentTypeFormValues: PropTypes.oneOfType([
      DataViewsConfiguration,
      DatasetViewsConfiguration,
    ]).isRequired,
    // redux change field method
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      availableAttributes, currentTypeNamespace, currentTypeFormValues, changeField,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { content } } } = this.context
    return (
      <FieldsGroup spanFullWidth title={formatMessage({ id: 'search.results.form.configuration.result.sorting' })}>
        <div style={content.tableFieldSpacer}>
          <AttributesListConfigurationComponent
            selectableAttributes={availableAttributes}
            attributesFilter={DamDomain.AttributeModelController.isSearchableAttribute}
            attributesList={currentTypeFormValues.sorting}
            attributesListFieldName={`${currentTypeNamespace}.sorting`}
            hintMessageKey="search.results.form.configuration.result.no.sorting"
            changeField={changeField}
            allowRendererSelection={false}
          />
        </div>
      </FieldsGroup>
    )
  }
}
export default SortingConfigurationComponent
