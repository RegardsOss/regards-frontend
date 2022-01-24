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
import { DataManagementShapes } from '@regardsoss/shape'
import { FieldsGroup, FieldArray } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { PluginMeta } from '../../../../shapes/form/PluginMeta'
import CriteriaGroupsFieldArrayComponent from './CriteriaGroupsFieldArrayComponent'
import { CriteriaFormHelper } from './CriteriaFormHelpers'

/**
 * Search configuration main component
 * @author Raphaël Mechali
 */
class SearchConfigurationComponent extends React.Component {
  static propTypes = {
    fetchingMetadata: PropTypes.bool.isRequired,
    pluginsMetadata: PropTypes.arrayOf(PluginMeta).isRequired,
    availableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    currentNamespace: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Validate groups field
   * @param {[*]} value edited groups field value, as an array of ModuleConfiguration.CriteriaGroup
   */
  validateGroups = (value) => {
    const { availableAttributes, pluginsMetadata } = this.props
    if (CriteriaFormHelper.areGroupsInError(value, pluginsMetadata, availableAttributes)) {
      return 'error.marker'
    }
    return undefined // marks no error in redux form
  }

  render() {
    const {
      currentNamespace, fetchingMetadata, pluginsMetadata, availableAttributes,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { content } } } = this.context
    return (
      <FieldsGroup spanFullWidth title={formatMessage({ id: 'search.results.form.configuration.search.pane.title' })}>
        <div style={content.tableFieldSpacer}>
          <FieldArray
            name={`${currentNamespace}.criteriaGroups`}
            component={CriteriaGroupsFieldArrayComponent}
            fetchingMetadata={fetchingMetadata}
            pluginsMetadata={pluginsMetadata}
            availableAttributes={availableAttributes}
            validate={this.validateGroups}
          />
        </div>
      </FieldsGroup>
    )
  }
}
export default SearchConfigurationComponent
