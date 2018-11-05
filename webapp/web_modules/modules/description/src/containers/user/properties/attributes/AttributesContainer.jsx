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
import compose from 'lodash/fp/compose'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isUndefined from 'lodash/isUndefined'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { DamDomain } from '@regardsoss/domain'
import { CatalogShapes, DataManagementShapes } from '@regardsoss/shape'
import { withValueRenderContext } from '@regardsoss/components'
import { getTypeRender } from '@regardsoss/attributes-common'
import { DescriptionConfiguration } from '../../../../shapes/ModuleConfiguration'
import { modelAttributesActions, modelAttributesSelectors } from '../../../../clients/ModelAttributesClient'
import AttributesComponent from '../../../../components/user/properties/attributes/AttributesComponent'

// compute thumbnail path
const THUMBNAIL_ATTRIBUTE_MODEL = DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.thumbnail)
const THUMBNAIL_PATH_IN_ENTITY = `content.${THUMBNAIL_ATTRIBUTE_MODEL.content.jsonPath}`

/**
 * Attributes container: resolves attributes for current entity model and map them onto the configured attributes list
 * for entity type.  Finally, provides resolved attributes with value to child component
 * @author Raphaël Mechali
 */
export class AttributesContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      loading: modelAttributesSelectors.isFetching(state),
      modelAttributes: modelAttributesSelectors.hasError(state) ? {} : modelAttributesSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps = dispatch => ({
    fetchEntityModelAttributes: modelName => dispatch(modelAttributesActions.fetchEntityList({ modelName })),
  })

  static propTypes = {
    accessToken: PropTypes.string,
    projectName: PropTypes.string,
    // configuration for current entity type
    typeConfiguration: DescriptionConfiguration.isRequired,
    // entity displayed
    entity: CatalogShapes.Entity, // used only in onPropertiesChanged
    // from mapStateToProps
    loading: PropTypes.bool.isRequired, // is currently loading
    // eslint-disable-next-line react/no-unused-prop-types
    modelAttributes: DataManagementShapes.ModelAttributeList,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    fetchEntityModelAttributes: PropTypes.func.isRequired,
  }

  /**
   * Filters or convert a single group row: when some attributes can be retrieved,
   *  converts the element into runtime displayable attributes row. Filters the row otherwise
   * @param {*} entity entity
   * @param {[*]} attributes attributes, expected to be AttributeModel with content array (as they are consumed by AttributeModelController)
   * @param {*} element group row, from module configuration
   * @param {number} index group row index (used to build key)
   * @return {*} A displayable attribute row as expected by AttributesComponent
   */
  static filterOrConvertElement(entity, attributes, { label, attributes: confAttributes }, index) {
    // A - retrieve all attributes from configuration
    const convertedAttributes = confAttributes.reduce((acc, attribute) => {
      // let attribute
      const model = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(attribute.name, attributes)
      if (model) {
        const { content: { type, jsonPath, unit } } = model
        // the attribute model could be retrieved in current model attributes: resolve its render for current entity
        return [...acc, {
          key: jsonPath,
          Renderer: getTypeRender(type),
          renderValue: DamDomain.AttributeModelController.getEntityAttributeValue(entity, jsonPath),
          renderUnit: unit, // unit if any
        }]
      }
      // filter that attribute as it is not available for model
      return acc
    }, [])
    return convertedAttributes.length ? {
      key: `element.${index}`,
      label,
      attributes: convertedAttributes,
    } : null
  }

  /**
   * Converts and filter group rows: when attributes could be retrieve, provided elements resolved for runtime. Filter them otherwise
   * @param {*} entity entity
   * @param {[*]} attributes attributes, expected to be AttributeModel with content array (as they are consumed by AttributeModelController)
   * @param {*} elements group rows, from module configuration
   * @return [*] filtered group elements resolved for runtime
   */
  static filterAndConvertElements(entity, attributes, elements) {
    return elements.reduce((acc, element, index) => {
      const convertedElement = AttributesContainer.filterOrConvertElement(entity, attributes, element, index)
      return convertedElement
        ? [...acc, convertedElement] // some attributes in that group row could be retrieved, retain it
        : acc // no attribute in that group row could be retrieve, remove it
    }, [])
  }

  /**
    * Extracts available attributes groups from configuration and model attributes then provide runtime group shapes their current value and render
    * @param {Entity} entity entity that will shown
    * @param {[*]} attributes attributes, expected to be AttributeModel with content array (as they are consumed by AttributeModelController)
    * @param {DescriptionConfiguration} configuration configuration for entity type
    * @return [*] filtered groups array containing resolved attributes and thumbnail configuration for
    * child component
    */
  static filterAndConvertGroups(entity, attributes, configuration) {
    // for each group: convert and filter attributes. If at least one can be retrieved, keep the group, remove it otherwise
    return configuration.groups.reduce((acc, { showTitle, title, elements }, index) => {
      // 1 - retain attributes that can be found in model attributes list
      const convertedElements = AttributesContainer.filterAndConvertElements(entity, attributes, elements)
      if (convertedElements.length) { // that group has available attributes for current model, show it
        return [...acc, {
          key: `group.${index}`,
          showTitle,
          title,
          elements: convertedElements,
        }]
      }
      return acc // this group has no available attribute for current model, hide it
    }, [])
  }

  static DEFAULT_STATE = {
    attributeGroups: [], // currently fetched attributes
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesChanged = ({
    entity: oldEntity,
    modelAttributes: oldModelAttributes,
    typeConfiguration: oldTypeConfiguration,
  }, {
    entity: newEntity,
    modelAttributes: newModelAttributes,
    typeConfiguration: newTypeConfiguration,
    fetchEntityModelAttributes,
  }) => {
    const oldState = this.state
    const newState = { ...(oldState || AttributesContainer.DEFAULT_STATE) }

    // 1 - detect entity model change to fetch attributes
    const oldModelName = get(oldEntity, 'content.model')
    const newModelName = get(newEntity, 'content.model')
    if (oldModelName !== newModelName && !isUndefined(newModelName)) {
      fetchEntityModelAttributes(newModelName)
    }

    // 2 - detect model attributes change to resolve attributes
    if (!isEqual(oldModelAttributes, newModelAttributes)
      || !isEqual(oldEntity, newEntity)
      || !isEqual(oldTypeConfiguration, newTypeConfiguration)) {
      // A - prepare searchable attributes pool as expected by the attribute model controller
      // From Model attribute like { content: { attribute: { *attr }}}
      // To attribute model like {content: attr }
      const attributeModels = values(newModelAttributes).map(
        ({ content: { attribute } }) => ({ content: attribute }))
      // B - convert groups
      newState.attributeGroups = newEntity
        ? AttributesContainer.filterAndConvertGroups(newEntity, attributeModels, newTypeConfiguration) : []
    }

    // 3 - set state if any change is detected
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  render() {
    const {
      accessToken, projectName, entity, loading, typeConfiguration,
    } = this.props
    const { attributeGroups } = this.state

    let thumbnailURL = null
    if (typeConfiguration.showThumbnail) {
      thumbnailURL = DamDomain.DataFileController.getFileURI(get(entity, THUMBNAIL_PATH_IN_ENTITY, null), accessToken, projectName)
    }

    return (
      <AttributesComponent
        loading={loading}
        attributeGroups={attributeGroups}
        thumbnailURL={thumbnailURL}
      />
    )
  }
}


// provide render context for sub components (that will render the objects attribute values)
export default compose(
  connect(AttributesContainer.mapStateToProps, AttributesContainer.mapDispatchToProps),
  withValueRenderContext,
)(AttributesContainer)
