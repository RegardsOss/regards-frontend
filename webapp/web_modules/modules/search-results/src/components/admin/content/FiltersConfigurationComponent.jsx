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
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FieldsGroup, Field, RenderCheckbox } from '@regardsoss/form-utils'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import ModuleConfiguration from '../../../shapes/ModuleConfiguration'

/**
 * Filters (facets) configuration component
 * @author Raphaël Mechali
 */
class FiltersConfigurationComponent extends React.Component {
  static propTypes = {
    availableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    currentNamespace: PropTypes.string.isRequired,
    currentFormValues: ModuleConfiguration.isRequired,
    // redux change field method
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      availableAttributes, currentNamespace, currentFormValues, changeField,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { content } } } = this.context

    return (
      <FieldsGroup spanFullWidth title={formatMessage({ id: 'search.results.form.configuration.result.filters' })}>
        <Field
          name={`${currentNamespace}.facets.enabledFor.${DamDomain.ENTITY_TYPES_ENUM.DATA}`}
          fullWidth
          component={RenderCheckbox}
          label={formatMessage({ id: 'search.results.form.configuration.result.enable.filters.data' })}
          disabled={!currentFormValues.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATA].enabled}
        />
        <Field
          name={`${currentNamespace}.facets.enabledFor.${DamDomain.ENTITY_TYPES_ENUM.DATASET}`}
          fullWidth
          component={RenderCheckbox}
          label={formatMessage({ id: 'search.results.form.configuration.result.enable.filters.dataset' })}
          disabled={!currentFormValues.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATASET].enabled}
        />
        <Field
          name={`${currentNamespace}.facets.initiallyEnabled`}
          fullWidth
          component={RenderCheckbox}
          label={formatMessage({ id: 'search.results.form.configuration.result.enable.filters.initially' })}
          disabled={!(currentFormValues.facets.enabledFor[DamDomain.ENTITY_TYPES_ENUM.DATA]
            || currentFormValues.facets.enabledFor[DamDomain.ENTITY_TYPES_ENUM.DATASET])}
        />
        <div style={content.tableFieldSpacer}>
          <AttributesListConfigurationComponent
            selectableAttributes={availableAttributes}
            attributesFilter={DamDomain.AttributeModelController.isSearchableAttribute}
            attributesList={currentFormValues.facets.list}
            attributesListFieldName={`${currentNamespace}.facets.list`}
            hintMessageKey="search.results.form.configuration.result.no.filter"
            changeField={changeField}
            allowLabel
            allowRendererSelection={false}
          />
        </div>
      </FieldsGroup>
    )
  }
}
export default FiltersConfigurationComponent
