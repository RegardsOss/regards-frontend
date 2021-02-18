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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import map from 'lodash/map'
import isNil from 'lodash/isNil'
import find from 'lodash/find'
import { DataManagementShapes } from '@regardsoss/shape'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { attributeModelActions, attributeModelSelectors } from '../clients/AttributeModelClient'
import { attributeModelTypeActions, attributeModelTypeSelectors } from '../clients/AttributeModelTypeClient'
import { attributeModelRestrictionActions, attributeModelRestrictionSelectors } from '../clients/AttributeModelRestrictionClient'
import { fragmentActions, fragmentSelectors } from '../clients/FragmentClient'
import AttributeModelFormComponent from '../components/AttributeModelFormComponent'
import DEFAULT_FRAGMENT_NAME from '../DefaultFragmentName'
import messages from '../i18n'

export class AttributeModelFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      attrModel_id: PropTypes.string,
      fragment_name: PropTypes.string,
    }),
    // from mapStateToProps
    attrModel: DataManagementShapes.AttributeModel,
    isAttributeModelFetching: PropTypes.bool,
    attrModelTypeList: PropTypes.arrayOf(PropTypes.string),
    isAttributeModelRestrictionFetching: PropTypes.bool,
    attrModelRestrictionList: PropTypes.arrayOf(PropTypes.string),
    isAttributeModelTypeFetching: PropTypes.bool,
    fragmentList: DataManagementShapes.FragmentList,
    isFragmentFetching: PropTypes.bool,
    // from mapDispatchToProps
    createAttrModel: PropTypes.func,
    fetchAttrModel: PropTypes.func,
    updateAttrModel: PropTypes.func,
    fetchAttributeModelTypeList: PropTypes.func,
    flushAttributeModelRestriction: PropTypes.func,
    fetchFragmentList: PropTypes.func,
    fetchAttributeModelRestrictionList: PropTypes.func,
  }

  state = {
    isEditing: this.props.params.attrModel_id !== undefined,
    isLoading: true,
  }

  componentDidMount() {
    this.props.fetchAttributeModelTypeList()
    this.props.fetchFragmentList()
    if (this.state.isEditing) {
      this.props.fetchAttrModel(this.props.params.attrModel_id)
      // If the store already contains that attrModel, then retrieve the corresponding modelRestrictionList
      if (this.props.attrModel) {
        this.props.fetchAttributeModelRestrictionList(this.props.attrModel.content.type)
      }
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // if the store did not contained the entity, it will fetch it async
    // then when we retrieve the entity we need to fetch the corresponding entity restriction list
    if (this.state.isEditing && nextProps.attrModelRestrictionList.length === 0 && !this.props.attrModel && nextProps.attrModel) {
      this.props.fetchAttributeModelRestrictionList(nextProps.attrModel.content.type)
    }
    if (!nextProps.isAttributeModelFetching && !nextProps.isAttributeModelRestrictionFetching && !nextProps.isAttributeModelTypeFetching && !nextProps.isFragmentFetching) {
      this.setState({
        isLoading: false,
      })
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/models/attribute/model/list`
  }

  getFormComponent = () => {
    const { attrModelTypeList, attrModelRestrictionList, fragmentList } = this.props
    if (this.state.isEditing) {
      const { attrModel } = this.props
      if (this.state.isLoading) {
        return (<FormLoadingComponent />)
      }
      console.error('attrModelRestrictionList', attrModelRestrictionList)
      if (attrModel) {
        return (<AttributeModelFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          currentAttrModel={attrModel}
          attrModelTypeList={attrModelTypeList}
          attrModelRestrictionList={attrModelRestrictionList}
          fragmentList={fragmentList}
          handleUpdateAttributeModelRestriction={this.handleUpdateAttributeModelRestriction}
          defaultFragmentName={this.props.params.fragment_name}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<AttributeModelFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
      attrModelTypeList={attrModelTypeList}
      attrModelRestrictionList={attrModelRestrictionList}
      fragmentList={fragmentList}
      handleUpdateAttributeModelRestriction={this.handleUpdateAttributeModelRestriction}
      flushAttributeModelRestriction={this.props.flushAttributeModelRestriction}
      defaultFragmentName={this.props.params.fragment_name}
    />)
  }

  /**
   * Extract values from the form result
   * @param values
   * @returns {{}} return data we send to the API
   */
  getRestriction = (values) => {
    let restriction = {}
    if (values.restriction) {
      // Handle integer range
      const restrictions = ['INTEGER_RANGE', 'DOUBLE_RANGE', 'LONG_RANGE']
      restrictions.forEach((value) => {
        if (values.restriction[value] && values.restriction[value].active) {
          restriction = {
            type: value,
            min: parseInt(values.restriction[value].min, 10),
            max: parseInt(values.restriction[value].max, 10),
            minExcluded: !values.restriction[value].isMinInclusive,
            maxExcluded: !values.restriction[value].isMaxInclusive,
          }
        }
      })
      // Handle enumeration
      if (values.restriction.ENUMERATION && values.restriction.ENUMERATION.active) {
        const acceptableValues = map(values.restriction.ENUMERATION.inputs, (val) => val.length > 0 ? val : undefined)
        restriction = {
          type: 'ENUMERATION',
          acceptableValues,
        }
      }
      // Handle pattern
      if (values.restriction.PATTERN && values.restriction.PATTERN.active) {
        restriction = {
          type: 'PATTERN',
          pattern: values.restriction.PATTERN.pattern,
        }
      }
      if (values.restriction.JSON_SCHEMA && values.restriction.JSON_SCHEMA.active) {
        restriction = {
          type: 'JSON_SCHEMA',
          jsonSchema: values.restriction.JSON_SCHEMA.jsonSchema,
        }
      }
    }
    return restriction
  }

  getFragment = (values) => {
    if (values.fragment !== DEFAULT_FRAGMENT_NAME) {
      const attrFragment = find(this.props.fragmentList, (fragment) => (fragment.content.name === values.fragment))
      return attrFragment.content || null
    }
    return null
  }

  handleUpdateAttributeModelRestriction = (type) => {
    this.props.fetchAttributeModelRestrictionList(type)
  }

  handleUpdate = (values) => {
    const restriction = this.getRestriction(values)
    const previousAttrModel = this.props.attrModel.content
    const updatedAttrModel = {
      ...previousAttrModel,
      label: values.label,
      description: values.description,
      type: values.type,
      precision: values.precision ? parseInt(values.precision, 10) : null,
      alterable: values.alterable,
      optional: values.optional,
      unit: values.unit,
      restriction,
    }
    // Delete the object if it does not exists
    if (!restriction.type) {
      delete updatedAttrModel.restriction
    }
    Promise.resolve(this.props.updateAttrModel(this.props.attrModel.content.id, updatedAttrModel))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  handleCreate = (values) => {
    const restriction = this.getRestriction(values)
    const fragment = this.getFragment(values)
    const newAttrModel = {
      fragment,
      name: values.name,
      label: values.label,
      description: values.description,
      type: values.type,
      precision: values.precision ? parseInt(values.precision, 10) : null,
      unit: values.unit,
      alterable: values.alterable,
      optional: values.optional,
    }
    // Check if restriction is defined
    if (restriction.type) {
      newAttrModel.restriction = restriction
    }
    Promise.resolve(this.props.createAttrModel(newAttrModel))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  attrModel: ownProps.params.attrModel_id ? attributeModelSelectors.getById(state, ownProps.params.attrModel_id) : null,
  isAttributeModelFetching: attributeModelSelectors.isFetching(state),

  attrModelTypeList: attributeModelTypeSelectors.getArray(state),
  isAttributeModelTypeFetching: attributeModelTypeSelectors.isFetching(state),

  attrModelRestrictionList: attributeModelRestrictionSelectors.getArray(state),
  isAttributeModelRestrictionFetching: attributeModelRestrictionSelectors.isFetching(state),

  fragmentList: fragmentSelectors.getListWithoutNoneFragment(state),
  isFragmentFetching: fragmentSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  createAttrModel: (values) => dispatch(attributeModelActions.createEntity(values)),
  updateAttrModel: (id, values) => dispatch(attributeModelActions.updateEntity(id, values)),
  fetchAttrModel: (id) => dispatch(attributeModelActions.fetchEntity(id)),

  fetchAttributeModelTypeList: () => dispatch(attributeModelTypeActions.fetchEntityList()),

  fetchAttributeModelRestrictionList: (type) => dispatch(attributeModelRestrictionActions.getList(type)),
  flushAttributeModelRestriction: () => dispatch(attributeModelRestrictionActions.flush()),

  fetchFragmentList: (type) => dispatch(fragmentActions.fetchEntityList(type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributeModelFormContainer)
