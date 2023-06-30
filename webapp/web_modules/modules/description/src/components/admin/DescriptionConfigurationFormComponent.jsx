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
import { UIDomain, DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import {
  FormPresentation, FormRow, FieldsGroup, Field, FieldArray, RenderCheckbox,
} from '@regardsoss/form-utils'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import { DescriptionConfiguration } from '../../shapes/ModuleConfiguration'
import GroupsFieldComponent from './GroupsFieldComponent'

/**
 * Description configuration form component
 * @author Raphaël Mechali
 */
class DescriptionConfigurationFormComponent extends React.Component {
  static propTypes = {
    entityType: PropTypes.oneOf(UIDomain.PSEUDO_TYPES).isRequired,
    currentTypeValues: DescriptionConfiguration,
    isCreating: PropTypes.bool.isRequired,
    changeField: PropTypes.func.isRequired,
    currentNamespace: PropTypes.string.isRequired,
    availableAttributes: DataManagementShapes.AttributeModelList.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Predicate that filters only URL type attributes (removes pseudo attributes too)
   * @param {*} attribute attributes, matching DataManagementShapes.AttributeModel shape
   * @return {boolean} true if attribute type is URL, false otherwise
   */
  static filterURLAttributes(attribute) {
    return attribute.content.type === DamDomain.MODEL_ATTR_TYPES.URL
  }

  /**
   * Lifecycle method: component will mount. Used here to initialize this sub form part values
   */
  UNSAFE_componentWillMount() {
    const {
      isCreating, entityType, changeField, currentNamespace,
    } = this.props
    if (isCreating) {
      // initialize root form value for entity type
      changeField(`${currentNamespace}.${entityType}`, {
        // default configuration for description
        showDescription: true,
        showTags: true,
        showCoupling: true,
        showLinkedDocuments: true,
        showLinkedEntities: true,
        showOtherVersions: false,
        showThumbnail: false,
        showQuicklooks: true,
        groups: [],
        attributeToDescriptionFiles: [],
      })
    }
  }

  /**
   * Validates edited groups
   * @return {string} error if any, undefined otherwise
   */
  validateGroups = (groups) => groups.find((g) => g.showTitle && (!g.title.en || !g.title.fr))
    ? 'error.marker' // unused, only explaining redux there is an error here
    : null

  render() {
    const {
      entityType, availableAttributes,
      currentNamespace, currentTypeValues, changeField,
    } = this.props
    const { intl: { formatMessage } } = this.context
    if (!currentTypeValues) {
      return null // wait for form complete initialization
    }
    return (
      <FormPresentation>
        <FormRow>
          <FieldsGroup
            title={formatMessage({ id: 'module.description.configuration.general' })}
            spanFullWidth
          >
            {/* Allow description */}
            <Field
              name={`${currentNamespace}.${entityType}.showDescription`}
              label={formatMessage({ id: 'module.description.configuration.show.description' })}
              component={RenderCheckbox}
              fullWidth
            />
            {/* Hide empty attribute values */}
            <Field
              name={`${currentNamespace}.${entityType}.hideEmptyAttributes`}
              label={formatMessage({ id: 'module.description.configuration.hide.empty.attributes' })}
              component={RenderCheckbox}
              fullWidth
            />
            {/* Show tags field */}
            <Field
              name={`${currentNamespace}.${entityType}.showTags`}
              label={formatMessage({ id: 'module.description.configuration.show.tags' })}
              component={RenderCheckbox}
              fullWidth
            />
            {/* Show coupling field */}
            <Field
              name={`${currentNamespace}.${entityType}.showCoupling`}
              label={formatMessage({ id: 'module.description.configuration.show.coupling' })}
              component={RenderCheckbox}
              fullWidth
            />
            {/* Show linked documents field */}
            <Field
              name={`${currentNamespace}.${entityType}.showLinkedDocuments`}
              label={formatMessage({ id: 'module.description.configuration.show.linked.documents' })}
              component={RenderCheckbox}
              fullWidth
            />
            {/* Show linked entities field */}
            <Field
              name={`${currentNamespace}.${entityType}.showLinkedEntities`}
              label={formatMessage({ id: 'module.description.configuration.show.linked.entities' })}
              component={RenderCheckbox}
              fullWidth
            />
            {/* Show other versions (only for data currently) */}
            <Field
              name={`${currentNamespace}.${entityType}.showOtherVersions`}
              label={formatMessage({ id: 'module.description.configuration.show.other.versions' })}
              component={RenderCheckbox}
              disabled={entityType !== DamDomain.ENTITY_TYPES_ENUM.DATA}
              fullWidth
            />
            {/* Show thumbnail field */}
            <Field
              name={`${currentNamespace}.${entityType}.showThumbnail`}
              label={formatMessage({ id: 'module.description.configuration.show.thumbnail' })}
              component={RenderCheckbox}
              fullWidth
            />
            {/* Show quicklooks section field */}
            <Field
              name={`${currentNamespace}.${entityType}.showQuicklooks`}
              label={formatMessage({ id: 'module.description.configuration.show.quicklooks' })}
              component={RenderCheckbox}
              fullWidth
            />
          </FieldsGroup>
        </FormRow>
        {/* List of attribute URLs to show as description files */}
        <FormRow>
          <FieldsGroup
            title={formatMessage({ id: 'module.description.configuration.description.files.title' })}
            spanFullWidth
          >
            <AttributesListConfigurationComponent
              selectableAttributes={availableAttributes}
              attributesFilter={DescriptionConfigurationFormComponent.filterURLAttributes}
              attributesList={currentTypeValues.attributeToDescriptionFiles}
              attributesListFieldName={`${currentNamespace}.${entityType}.attributeToDescriptionFiles`}
              hintMessageKey="module.description.configuration.description.files.hint"
              changeField={changeField}
            />
          </FieldsGroup>
        </FormRow>
        {/* Description groups array field */}
        <FieldArray
          name={`${currentNamespace}.${entityType}.groups`}
          component={GroupsFieldComponent}
          availableAttributes={availableAttributes}
          validate={this.validateGroups}
        />
      </FormPresentation>
    )
  }
}
export default DescriptionConfigurationFormComponent
