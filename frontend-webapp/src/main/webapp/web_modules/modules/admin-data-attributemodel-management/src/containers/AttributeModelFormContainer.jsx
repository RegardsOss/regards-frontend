/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import AttributeModelActions from '../model/AttributeModelActions'
import AttributeModelFormComponent from '../components/AttributeModelFormComponent'
import AttributeModelSelectors from '../model/AttributeModelSelectors'
import AttributeModelTypeSelectors from '../model/AttributeModelTypeSelectors'
import { AttributeModel, AttributeModelType } from '@regardsoss/model'
import AttributeModelTypeActions from '../model/AttributeModelTypeActions'
import AttributeModelRestrictionActions from '../model/AttributeModelRestrictionActions'
import AttributeModelRestrictionSelectors from '../model/AttributeModelRestrictionSelectors'


export class AttributeModelFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      attrModel_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    attrModel: AttributeModel,
    isAttributeModelFetching: React.PropTypes.bool,
    attrModelTypeList: React.PropTypes.arrayOf(React.PropTypes.string),
    isAttributeModelRestrictionFetching: React.PropTypes.bool,
    attrModelRestrictionList: React.PropTypes.arrayOf(React.PropTypes.string),
    isAttributeModelTypeFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    createAttrModel: React.PropTypes.func,
    fetchAttrModel: React.PropTypes.func,
    updateAttrModel: React.PropTypes.func,
    fetchAttributeModelTypeList: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.params.attrModel_id !== undefined,
    }
  }

  componentDidMount() {
    this.props.fetchAttributeModelTypeList()
    if (this.state.isEditing) {
      this.props.fetchAttrModel(this.props.params.attrModel_id)
    }
  }

  componentWillReceiveProps(nextProps) {
    // when we have the entity we need to fetch the corresponding entity restriction list
    if (this.state.isEditing && nextProps.attrModelRestrictionList.length === 0 && !this.props.attrModel && nextProps.attrModel) {
      this.props.fetchAttributeModelRestrictionList(nextProps.attrModel.content.type)
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/attribute/model/list`
  }

  getFormComponent = () => {
    const { attrModelTypeList, attrModelRestrictionList } = this.props
    if (this.state.isEditing) {
      const { attrModel, isAttributeModelFetching, isAttributeModelRestrictionFetching, isAttributeModelTypeFetching } = this.props
      if (isAttributeModelFetching || isAttributeModelRestrictionFetching || isAttributeModelTypeFetching) {
        return (<FormLoadingComponent />)
      }
      if (attrModel) {
        return (<AttributeModelFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          currentAttrModel={attrModel}
          attrModelTypeList={attrModelTypeList}
          attrModelRestrictionList={attrModelRestrictionList}
          handleUpdateAttributeModelRestriction={this.handleUpdateAttributeModelRestriction}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<AttributeModelFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
      attrModelTypeList={attrModelTypeList}
      attrModelRestrictionList={attrModelRestrictionList}
      handleUpdateAttributeModelRestriction={this.handleUpdateAttributeModelRestriction}
    />)
  }
  handleUpdate = (values) => {
    const restriction = this.getRestriction(values)
    const previousAttrModel = this.props.attrModel.content
    previousAttrModel.restriction = {}
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
    Promise.resolve(this.props.updateAttrModel(this.props.attrModel.content.id, updatedAttrModel))
    .then(() => {
      const url = this.getBackUrl()
      browserHistory.push(url)
    })
  }
  handleUpdateAttributeModelRestriction = (type) => {
    this.props.fetchAttributeModelRestrictionList(type)
  }

  /**
   * Extract values from the form and prepare the action we send to the API
   * @param values
   * @returns {{}}
   */
  getRestriction = (values) => {
    let restriction = {}
    if (values.restriction.INTEGER_RANGE.active) {
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
    return restriction
  }

  handleCreate = (values) => {
    console.log(values)
    const restriction = this.getRestriction(values)
    Promise.resolve(this.props.createAttrModel({
      name: values.name,
      description: values.description,
      type: values.type,
      alterable: values.alterable,
      optional: values.optional,
      queryable: values.queryable,
      facetable: values.facetable,
      restriction,
    }))
    .then(() => {
      const url = this.getBackUrl()
      browserHistory.push(url)
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
  attrModelTypeList: AttributeModelTypeSelectors.getList(state),
  isAttributeModelTypeFetching: AttributeModelTypeSelectors.isFetching(state),
  attrModelRestrictionList: AttributeModelRestrictionSelectors.getList(state),
  isAttributeModelRestrictionFetching: AttributeModelTypeSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  createAttrModel: values => dispatch(AttributeModelActions.createEntity(values)),
  updateAttrModel: (id, values) => dispatch(AttributeModelActions.updateEntity(id, values)),
  fetchAttrModel: id => dispatch(AttributeModelActions.fetchEntity(id)),
  fetchAttributeModelTypeList: () => dispatch(AttributeModelTypeActions.fetchEntityList()),
  fetchAttributeModelRestrictionList: type => dispatch(AttributeModelRestrictionActions.getList(type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributeModelFormContainer)
