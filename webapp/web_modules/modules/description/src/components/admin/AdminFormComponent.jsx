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
import { Tabs, Tab } from 'material-ui/Tabs'
import { UIDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { Field, RenderCheckbox } from '@regardsoss/form-utils'
import { ModuleConfiguration } from '../../shapes/ModuleConfiguration'
import DescriptionConfigurationFormComponent from './DescriptionConfigurationFormComponent'

/**
 * Admin main form component (it delegates to sub form parts for each type)
 * @author Raphaël Mechali
 */
class AdminFormComponent extends React.Component {
  static propTypes = {
    currentNamespace: PropTypes.string.isRequired,
    currentFormValues: ModuleConfiguration.isRequired,
    changeField: PropTypes.func.isRequired,
    isCreating: PropTypes.bool.isRequired,

    collectionAttributeModels: DataManagementShapes.AttributeModelList.isRequired,
    dataAttributeModels: DataManagementShapes.AttributeModelList.isRequired,
    datasetAttributeModels: DataManagementShapes.AttributeModelList.isRequired,
    documentAttributeModels: DataManagementShapes.AttributeModelList.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Entity types ordered as they should be presented to user */
  static CONFIGURATION_ENTITY_TYPES = [
    UIDomain.PSEUDO_TYPES_ENUM.DATA,
    UIDomain.PSEUDO_TYPES_ENUM.DATASET,
    UIDomain.PSEUDO_TYPES_ENUM.COLLECTION,
    UIDomain.PSEUDO_TYPES_ENUM.DOCUMENT,
  ]

  /**
   * Lifecycle method: component will mount. Used here to initialize this sub form part values
   */
  UNSAFE_componentWillMount() {
    const {
      isCreating, changeField, currentNamespace,
    } = this.props
    if (isCreating) {
      // initialize root form value for entity type
      changeField(`${currentNamespace}.allowSearching`, true)
    }
  }

  /**
   * Returns available attribute models for entity type as parameter
   * @param {string} entityType entity type from ENTITY_TYPES_ENUM
   * @return {*} available attributes for entity type
   */
  getAvailableAttributes = (entityType) => {
    const {
      collectionAttributeModels, dataAttributeModels,
      datasetAttributeModels, documentAttributeModels,
    } = this.props
    switch (entityType) {
      case UIDomain.PSEUDO_TYPES_ENUM.DATA:
        return dataAttributeModels
      case UIDomain.PSEUDO_TYPES_ENUM.DOCUMENT:
        return documentAttributeModels
      case UIDomain.PSEUDO_TYPES_ENUM.DATASET:
        return datasetAttributeModels
      case UIDomain.PSEUDO_TYPES_ENUM.COLLECTION:
        return collectionAttributeModels
      default:
        throw new Error('Unknown entity type', entityType)
    }
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      isCreating, changeField, currentFormValues, currentNamespace,
    } = this.props
    const { moduleTheme: { admin: { topSeparator } } } = this.context
    return (
      <div>
        {/* main configuration */}
        <Field
          name={`${currentNamespace}.allowSearching`}
          label={formatMessage({ id: 'module.description.configuration.allow.searching' })}
          component={RenderCheckbox}
          fullWidth
        />
        <div style={topSeparator} />
        <Tabs>
          { // map each entity type to a description configuration form
            AdminFormComponent.CONFIGURATION_ENTITY_TYPES.map((entityType) => (
              <Tab key={entityType} label={formatMessage({ id: `module.description.configuration.type.${entityType}` })}>
                <DescriptionConfigurationFormComponent
                  entityType={entityType}
                  currentTypeValues={currentFormValues[entityType]}
                  isCreating={isCreating}
                  changeField={changeField}
                  currentNamespace={currentNamespace}
                  availableAttributes={this.getAvailableAttributes(entityType)}
                />
              </Tab>))
          }
        </Tabs>
      </div>
    )
  }
}
export default AdminFormComponent
