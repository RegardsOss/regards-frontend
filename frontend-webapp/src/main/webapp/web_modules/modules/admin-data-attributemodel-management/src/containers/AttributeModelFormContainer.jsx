/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { map, find } from 'lodash'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { AttributeModel, Fragment } from '@regardsoss/model'
import AttributeModelActions from '../model/AttributeModelActions'
import AttributeModelFormComponent from '../components/AttributeModelFormComponent'
import AttributeModelSelectors from '../model/AttributeModelSelectors'
import AttributeModelTypeSelectors from '../model/AttributeModelTypeSelectors'
import AttributeModelTypeActions from '../model/AttributeModelTypeActions'
import AttributeModelRestrictionActions from '../model/AttributeModelRestrictionActions'
import AttributeModelRestrictionSelectors from '../model/AttributeModelRestrictionSelectors'
import FragmentActions from '../model/FragmentActions'
import FragmentSelectors from '../model/FragmentSelectors'

export class AttributeModelFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      attrModel_id: React.PropTypes.string,
      fragment_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    attrModel: AttributeModel,
    isAttributeModelFetching: React.PropTypes.bool,
    attrModelTypeList: React.PropTypes.arrayOf(React.PropTypes.string),
    isAttributeModelRestrictionFetching: React.PropTypes.bool,
    attrModelRestrictionList: React.PropTypes.arrayOf(React.PropTypes.string),
    isAttributeModelTypeFetching: React.PropTypes.bool,
    fragmentList: React.PropTypes.objectOf(Fragment),
    isFragmentFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    createAttrModel: React.PropTypes.func,
    fetchAttrModel: React.PropTypes.func,
    updateAttrModel: React.PropTypes.func,
    fetchAttributeModelTypeList: React.PropTypes.func,
    flushAttributeModelRestriction: React.PropTypes.func,
    fetchFragmentList: React.PropTypes.func,
    fetchAttributeModelRestrictionList: React.PropTypes.func,
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
          defaultFragmentId={this.props.params.fragment_id}
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
      defaultFragmentId={this.props.params.fragment_id}
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
      if (values.restriction.INTEGER_RANGE && values.restriction.INTEGER_RANGE.active) {
        restriction = {
          type: 'INTEGER_RANGE',
        }
        if (values.restriction.INTEGER_RANGE.isMinInclusive) {
          restriction.minInclusive = values.restriction.INTEGER_RANGE.min
        } else {
          restriction.minExclusive = values.restriction.INTEGER_RANGE.min
        }
        if (values.restriction.INTEGER_RANGE.isMaxInclusive) {
          restriction.maxInclusive = values.restriction.INTEGER_RANGE.max
        } else {
          restriction.maxExclusive = values.restriction.INTEGER_RANGE.max
        }
      }
      // Handle float range
      if (values.restriction.FLOAT_RANGE && values.restriction.FLOAT_RANGE.active) {
        restriction = {
          type: 'FLOAT_RANGE',
        }
        if (values.restriction.FLOAT_RANGE.isMinInclusive) {
          restriction.minInclusive = values.restriction.FLOAT_RANGE.min
        } else {
          restriction.minExclusive = values.restriction.FLOAT_RANGE.min
        }
        if (values.restriction.FLOAT_RANGE.isMaxInclusive) {
          restriction.maxInclusive = values.restriction.FLOAT_RANGE.max
        } else {
          restriction.maxExclusive = values.restriction.FLOAT_RANGE.max
        }
      }
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
    if (values.fragment !== 1) {
      return find(this.props.fragmentList, fragment => (fragment.id === values.fragment))
    }
    return {}
  }

  handleUpdateAttributeModelRestriction = (type) => {
    this.props.fetchAttributeModelRestrictionList(type)
  }

  handleUpdate = (values) => {
    const restriction = this.getRestriction(values)
    const previousAttrModel = this.props.attrModel.content
    const updatedAttrModel = Object.assign({}, previousAttrModel, {
      name: values.name,
      description: values.description,
      type: values.type,
      alterable: values.alterable,
      optional: values.optional,
      queryable: values.queryable,
      facetable: values.facetable,
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
    console.log('Fragment', fragment)
    const updatedAttrModel = {
      fragment,
      name: values.name,
      description: values.description,
      type: values.type,
      alterable: values.alterable,
      optional: values.optional,
      queryable: values.queryable,
      facetable: values.facetable,
    }
    // Check if restriction is defined
    if (restriction.type) {
      updatedAttrModel.restriction = restriction
    }
    // Check if restriction is defined
    if (fragment) {
      updatedAttrModel.restriction = restriction
    }
    Promise.resolve(this.props.createAttrModel(updatedAttrModel))
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
      <I18nProvider messageDir="modules/admin-data-attributemodel-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  attrModel: ownProps.params.attrModel_id ? AttributeModelSelectors.getById(state, ownProps.params.attrModel_id) : null,
  isAttributeModelFetching: AttributeModelSelectors.isFetching(state),

  attrModelTypeList: AttributeModelTypeSelectors.getArray(state),
  isAttributeModelTypeFetching: AttributeModelTypeSelectors.isFetching(state),

  attrModelRestrictionList: AttributeModelRestrictionSelectors.getArray(state),
  isAttributeModelRestrictionFetching: AttributeModelRestrictionSelectors.isFetching(state),

  fragmentList: FragmentSelectors.getList(state),
  isFragmentFetching: FragmentSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  createAttrModel: values => dispatch(AttributeModelActions.createEntity(values)),
  updateAttrModel: (id, values) => dispatch(AttributeModelActions.updateEntity(id, values)),
  fetchAttrModel: id => dispatch(AttributeModelActions.fetchEntity(id)),

  fetchAttributeModelTypeList: () => dispatch(AttributeModelTypeActions.fetchEntityList()),

  fetchAttributeModelRestrictionList: type => dispatch(AttributeModelRestrictionActions.getList(type)),
  flushAttributeModelRestriction: () => dispatch(AttributeModelRestrictionActions.flush()),

  fetchFragmentList: type => dispatch(FragmentActions.fetchEntityList(type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributeModelFormContainer)
