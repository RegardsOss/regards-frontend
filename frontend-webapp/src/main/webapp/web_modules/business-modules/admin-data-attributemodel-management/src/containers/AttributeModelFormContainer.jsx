/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import map from 'lodash/map'
import find from 'lodash/find'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { AttributeModel, Fragment } from '@regardsoss/model'
import { attributeModelActions, attributeModelSelectors } from '../client/AttributeModelClient'
import { attributeModelTypeActions, attributeModelTypeSelectors } from '../client/AttributeModelTypeClient'
import { attributeModelRestrictionActions, attributeModelRestrictionSelectors } from '../client/AttributeModelRestrictionClient'
import { fragmentActions, fragmentSelectors } from '../client/FragmentClient'
import AttributeModelFormComponent from '../components/AttributeModelFormComponent'
import DEFAULT_FRAGMENT_NAME from '../DefaultFragmentName'

export class AttributeModelFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      attrModel_id: PropTypes.string,
      fragment_name: PropTypes.string,
    }),
    // from mapStateToProps
    attrModel: AttributeModel,
    isAttributeModelFetching: PropTypes.bool,
    attrModelTypeList: PropTypes.arrayOf(PropTypes.string),
    isAttributeModelRestrictionFetching: PropTypes.bool,
    attrModelRestrictionList: PropTypes.arrayOf(PropTypes.string),
    isAttributeModelTypeFetching: PropTypes.bool,
    fragmentList: PropTypes.objectOf(Fragment),
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

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.params.attrModel_id !== undefined,
    }
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
    }
  }

  componentWillReceiveProps(nextProps) {
    // if the store did not contained the entity, it will fetch it async
    // then when we retrieve the entity we need to fetch the corresponding entity restriction list
    if (this.state.isEditing && nextProps.attrModelRestrictionList.length === 0 && !this.props.attrModel && nextProps.attrModel) {
      this.props.fetchAttributeModelRestrictionList(nextProps.attrModel.content.type)
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/attribute/model/list`
  }

  getFormComponent = () => {
    const { attrModelTypeList, attrModelRestrictionList, fragmentList } = this.props
    if (this.state.isEditing) {
      const { attrModel, isAttributeModelFetching, isAttributeModelRestrictionFetching, isAttributeModelTypeFetching, isFragmentFetching } = this.props
      if (isAttributeModelFetching || isAttributeModelRestrictionFetching || isAttributeModelTypeFetching || isFragmentFetching) {
        return (<FormLoadingComponent />)
      }
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
        const acceptableValues = map(values.restriction.ENUMERATION.inputs, val => val.length > 0 ? val : undefined)
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
    }
    return restriction
  }

  getFragment = (values) => {
    if (values.fragment !== DEFAULT_FRAGMENT_NAME) {
      const attrFragment = find(this.props.fragmentList, fragment => (fragment.content.name === values.fragment))
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
    const updatedAttrModel = Object.assign({}, previousAttrModel, {
      label: values.label,
      description: values.description,
      type: values.type,
      alterable: values.alterable,
      optional: values.optional,
      restriction,
    })
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
      <I18nProvider messageDir="business-modules/admin-data-attributemodel-management/src/i18n">
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

const mapDispatchToProps = dispatch => ({
  createAttrModel: values => dispatch(attributeModelActions.createEntity(values)),
  updateAttrModel: (id, values) => dispatch(attributeModelActions.updateEntity(id, values)),
  fetchAttrModel: id => dispatch(attributeModelActions.fetchEntity(id)),

  fetchAttributeModelTypeList: () => dispatch(attributeModelTypeActions.fetchEntityList()),

  fetchAttributeModelRestrictionList: type => dispatch(attributeModelRestrictionActions.getList(type)),
  flushAttributeModelRestriction: () => dispatch(attributeModelRestrictionActions.flush()),

  fetchFragmentList: type => dispatch(fragmentActions.fetchEntityList(type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributeModelFormContainer)
