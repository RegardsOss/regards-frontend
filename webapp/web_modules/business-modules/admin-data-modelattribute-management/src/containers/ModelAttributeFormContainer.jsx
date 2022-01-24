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
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import forEach from 'lodash/forEach'
import partition from 'lodash/partition'
import some from 'lodash/some'
import find from 'lodash/find'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DataManagementShapes } from '@regardsoss/shape'
import { DamDomain } from '@regardsoss/domain'
import { attributeModelActions, attributeModelSelectors } from '../clients/AttributeModelClient'
import ModelAttributeFormComponent from '../components/ModelAttributeFormComponent'
import { modelAttributesSelectors, modelAttributesActions } from '../clients/ModelAttributesClient'
import { modelSelectors, modelActions } from '../clients/ModelClient'
import { modelAttributesFragmentActions } from '../clients/ModelAttributesFragmentClient'
import { modelAttributeComputationTypesActions } from '../clients/ModelAttributeComputationTypesClient'
import messages from '../i18n'

export class ModelAttributeFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      modelName: PropTypes.string,
    }),
    // from mapStateToProps
    model: DataManagementShapes.Model,
    attributeModelList: DataManagementShapes.AttributeModelList,
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    // from mapDispatchToProps
    createModelAttribute: PropTypes.func.isRequired,
    fetchAttributeModelList: PropTypes.func.isRequired,
    fetchModelAttributeList: PropTypes.func.isRequired,
    deleteModelAttribute: PropTypes.func.isRequired,
    fetchModel: PropTypes.func.isRequired,
    bindFragment: PropTypes.func.isRequired,
    unbindFragment: PropTypes.func.isRequired,
    fetchModelAttributeComputationTypesList: PropTypes.func.isRequired,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchAttributeModelList(),
      this.props.fetchModelAttributeList(this.props.params.modelName),
      this.props.fetchModel(this.props.params.modelName),
      this.props.fetchModelAttributeComputationTypesList(),
    ]).then(() => {
      this.setState({
        isLoading: false,
      })
    })
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/models/model/list`
  }

  getFormComponent = () => {
    const { attributeModelList, model, modelAttributeList } = this.props
    return (<ModelAttributeFormComponent
      onCreateFragment={this.handleCreateFragment}
      onDeleteFragment={this.handleDeleteFragment}
      onCreateAttributeModel={this.handleCreateAttributeModel}
      onDeleteAttributeModel={this.handleDeleteAttributeModel}
      backUrl={this.getBackUrl()}
      currentModel={model}
      distributedAttrModels={this.distributeAttrModel(attributeModelList, model, modelAttributeList)}
    />)
  }

  handleCreateFragment = (fragment) => {
    Promise.resolve(this.props.bindFragment(fragment, [this.props.model.content.name]))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.props.fetchModelAttributeList(this.props.params.modelName)
        }
      })
  }

  handleDeleteFragment = (fragment) => {
    Promise.resolve(this.props.unbindFragment(fragment.id, [this.props.model.content.name]))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.props.fetchModelAttributeList(this.props.params.modelName)
        }
      })
  }

  handleCreateAttributeModel = (attributeModel) => {
    this.props.createModelAttribute({
      attribute: attributeModel.content,
      model: this.props.model.content,
    }, this.props.model.content.name)
  }

  handleDeleteAttributeModel = (attributeModel) => {
    const modelAttributeToDelete = find(this.props.modelAttributeList, (modelAttribute) => (modelAttribute.content.attribute.id === attributeModel.content.id))
    this.props.deleteModelAttribute(modelAttributeToDelete.content.id, this.props.model.content.name)
  }

  isNotInFragment = (attribute) => (
    attribute.content.fragment.name !== DamDomain.DEFAULT_FRAGMENT
  )

  /**
   * Regroup together attributes that are on the same fragment, and store in another key remaining attributes
   * @param attributeList
   * @returns {{fragments: {}, attrs: Array}}
   */
  extractFragmentFromAttributeList = (attributeList) => {
    const result = {
      fragments: {},
      attrs: [],
    }
    const partitionAttributeHavingFragment = partition(attributeList, (attribute) => this.isNotInFragment(attribute))
    // Store attributeModel that are on the default fragment
    result.attrs = partitionAttributeHavingFragment[1]

    // Store fragment and corresponding attributeModel
    forEach(partitionAttributeHavingFragment[0], (attribute) => {
      // Add the fragment if not existing
      if (!result.fragments[attribute.content.fragment.id]) {
        result.fragments[attribute.content.fragment.id] = []
      }
      result.fragments[attribute.content.fragment.id].push(attribute)
    })
    return result
  }

  /**
   * Distribute attribute model list into 4 categories: remaining attribute inside fragment, remaining attribute not in a fragment
   * and the same thing for associated attributes to the current model
   * @param attributeModelList
   * @param fragmentList
   * @param model
   * @param modelAttributeList
   */
  distributeAttrModel = (attributeModelList, model, modelAttributeList) => {
    const result = {
      ATTR_REMAINING: {
        fragments: {},
        attrs: [],
      },
      ATTR_ASSOCIATED: {
        fragments: {},
        attrs: [],
      },
    }
    // Extract all attributes that are associated to the current model
    const partitionAttributeModel = partition(attributeModelList, (attributeModel) => some(modelAttributeList, (modelAttribute) => modelAttribute.content.attribute.id === attributeModel.content.id))
    result.ATTR_ASSOCIATED = this.extractFragmentFromAttributeList(partitionAttributeModel[0])
    result.ATTR_REMAINING = this.extractFragmentFromAttributeList(partitionAttributeModel[1])
    return result
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getFormComponent}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  attributeModelList: attributeModelSelectors.getList(state),
  modelAttributeList: modelAttributesSelectors.getList(state),
  model: modelSelectors.getById(state, ownProps.params.modelName),
})

const mapDispatchToProps = (dispatch) => ({
  fetchAttributeModelList: () => dispatch(attributeModelActions.fetchEntityList()),
  fetchModelAttributeList: (modelName) => dispatch(modelAttributesActions.fetchEntityList({ modelName })),
  createModelAttribute: (modelAttribute, modelName) => dispatch(modelAttributesActions.createEntity(modelAttribute, { modelName })),
  deleteModelAttribute: (id, modelName) => dispatch(modelAttributesActions.deleteEntity(id, { modelName })),
  fetchModel: (modelName) => dispatch(modelActions.fetchEntity(modelName)),

  bindFragment: (fragment, modelName) => dispatch(modelAttributesFragmentActions.createEntities(fragment, { modelName })),
  unbindFragment: (fragmentId, modelName) => dispatch(modelAttributesFragmentActions.deleteEntity(fragmentId, { modelName })),
  fetchModelAttributeComputationTypesList: () => dispatch(modelAttributeComputationTypesActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelAttributeFormContainer)
