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
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import { DamDomain } from '@regardsoss/domain'
import { CatalogShapes, DataManagementShapes } from '@regardsoss/shape'
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
import { StringComparison } from '@regardsoss/form-utils'
import { withValueRenderContext } from '@regardsoss/components'
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
    const newState = { ...(oldState || AttributesContainer.DEFAULT_STATE) }

    // 1 - detect entity model change to fetch attributes
    const oldModelName = get(oldEntity, 'content.model.name')
    const newModelName = get(newEntity, 'content.model.name')
    if (oldModelName !== newModelName && !isUndefined(newModelName)) {
      dispatchFetchModelAttributes(newModelName)
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
    const descriptionStandardAttributes = DamDomain.AttributeModelController.descriptionStandardAttributes.map(
      ({
        id, label, type, entityPathName,
      }) => {
        // retrieve value
        const value = DamDomain.AttributeModelController.getEntityAttributeValue(nextEntity, entityPathName)
        // resolve attribute
        return {
          id, label, Renderer: getTypeRender(type), renderValue: value,
        }
      })
    // 2 - resolve dynamic attributes
    const dynamicAttributes = map(newModelAttributes, ({ content: { attribute: attributeModel } }) => {
      // resolve attribute value in entity (push attribute in content, as it is not normalized )
      const accessPath = DamDomain.AttributeModelController.getAttributeAccessPath({ content: attributeModel })
      const renderValue = DamDomain.AttributeModelController.getEntityAttributeValue(nextEntity, accessPath)
      const resolvedAtribute = {
        id: attributeModel.id,
        label: attributeModel.label,
        Renderer: getTypeRender(attributeModel.type),
        renderValue,
      }
      // Any dynamic attribute can have a unit specified. If one is present set the unit into the resolved attribute
      if (attributeModel.unit) {
        resolvedAtribute.renderUnit = attributeModel.unit
      }
      return resolvedAtribute
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


// provide render context for sub components (that will render the objects attribute values)
export default compose(
  connect(AttributesContainer.mapStateToProps, AttributesContainer.mapDispatchToProps),
  withValueRenderContext,
)(AttributesContainer)

