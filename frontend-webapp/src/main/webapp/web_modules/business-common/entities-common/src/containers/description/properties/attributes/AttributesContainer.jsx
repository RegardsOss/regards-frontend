/**
* LICENSE_PLACEHOLDER
**/
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isUndefined from 'lodash/isUndefined'
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import { DamDomain } from '@regardsoss/domain'
import { CatalogShapes, DataManagementShapes } from '@regardsoss/shape'
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
import { StringComparison } from '@regardsoss/form-utils'
import { getTypeRender } from '@regardsoss/attributes-common'
import AttributesComponent from '../../../../components/description/properties/attributes/AttributesComponent'

/**
* Attributes container: provides resolved attributes to corresponding component
*/
export class AttributesContainer extends React.Component {

  static mapStateToProps = (state, { fetchModelAttributesSelectors }) => ({
    loading: fetchModelAttributesSelectors.isFetching(state),
    fetchedModelAttributes: fetchModelAttributesSelectors.hasError(state) ? {} : fetchModelAttributesSelectors.getList(state),
  })

  static mapDispatchToProps = (dispatch, { fetchModelAttributesActions, levelActions }) => ({
    dispatchFetchModelAttributes: modelId => dispatch(fetchModelAttributesActions.fetchModelAttributes(modelId)),
  })

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogShapes.Entity,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchModelAttributesActions: PropTypes.instanceOf(DataManagementClient.ModelAttributesActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchModelAttributesSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    // from mapStateToProps
    loading: PropTypes.bool.isRequired, // is currently loading
    // eslint-disable-next-line react/no-unused-prop-types
    fetchedModelAttributes: PropTypes.objectOf(DataManagementShapes.ModelAttribute),
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFetchModelAttributes: PropTypes.func.isRequired,
  }

  static DEFAULT_STATE = {
    attributes: [], // currently fetched attributes
  }

  componentWillMount = () => this.onPropertiesChanges({}, this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanges(this.props, nextProps)

  /**
   * On properties changed
   * @param oldProps old properties
   * @param newProps new properties
   */
  onPropertiesChanges = ({
    entity: oldEntity,
    fetchedModelAttributes: oldModelAttributes,
  }, {
    entity: newEntity,
      fetchedModelAttributes: newModelAttributes,
      dispatchFetchModelAttributes,
  }) => {
    const oldState = this.state
    const newState = oldState || AttributesContainer.DEFAULT_STATE

    // 1 - detect entity model change to fetch attributes
    const oldModelId = get(oldEntity, 'content.model.id')
    const newModelId = get(newEntity, 'content.model.id')
    if (oldModelId !== newModelId && !isUndefined(newModelId)) {
      dispatchFetchModelAttributes(newModelId)
    }

    // 2 - detect model attributes change to resolve attributes
    if (!isEqual(oldModelAttributes, newModelAttributes) || !isEqual(oldEntity, newEntity)) {
      newState.attributes = newEntity && newModelAttributes ? this.resolveEntityAttributes(newEntity, newModelAttributes) : []
    }

    // 3 - set state if any change is detected
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
  * Resolves found model attributes in
  */
  resolveEntityAttributes = (nextEntity, newModelAttributes) => {
    // 1 - resolve standard attributes
    const standardAttributes = DamDomain.AttributeModelController.standardAttributes
    const descriptionStandardAttributes = DamDomain.AttributeModelController.descriptionStandardAttributes.map((attrKey, index) => {
      // retrieve attribute
      const { id, label, type, entityPathName } = standardAttributes[attrKey]
      // retrieve value
      const value = DamDomain.AttributeModelController.getEntityAttributeValue(nextEntity, entityPathName)
      // resolve attribute
      return { id, label, Renderer: getTypeRender(type), renderValue: value }
    })
    // 2 - resolve dynamic attributes
    const dynamicAttributes = map(newModelAttributes, ({ content: { attribute: attributeModel } }) => {
      // resolve attribute value in entity (push attribute in content, as it is not normalized )
      const accessPath = DamDomain.AttributeModelController.getAttributeAccessPath({ content: attributeModel })
      const renderValue = DamDomain.AttributeModelController.getEntityAttributeValue(nextEntity, accessPath)
      return {
        id: attributeModel.id,
        label: attributeModel.label,
        Renderer: getTypeRender(attributeModel.type),
        renderValue,
      }
    })
    // 3 - make table and sort
    return [...descriptionStandardAttributes, ...dynamicAttributes].sort((attr1, attr2) => StringComparison.compare(attr1.label, attr2.label))
  }

  render() {
    const { loading } = this.props
    const { attributes } = this.state
    return (
      <AttributesComponent
        loading={loading}
        attributes={attributes}
      />
    )
  }
}
export default connect(
  AttributesContainer.mapStateToProps,
  AttributesContainer.mapDispatchToProps)(AttributesContainer)
