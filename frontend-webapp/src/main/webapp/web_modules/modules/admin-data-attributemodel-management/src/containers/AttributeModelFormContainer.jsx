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
import { fetchAttributeModelTypeList } from '../model/AttributeModelTypeActions'
export class AttributeModelFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      attrModel_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    attrModel: AttributeModel,
    isFetching: React.PropTypes.bool,
    attrModelTypeList: React.PropTypes.arrayOf(AttributeModelType),
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

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/attribute/model/list`
  }

  getFormComponent = () => {
    const { attrModelTypeList } = this.props
    if (this.state.isEditing) {
      const { attrModel, isFetching } = this.props
      if (isFetching) {
        return (<FormLoadingComponent />)
      }
      if (attrModel) {
        return (<AttributeModelFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          currentAttrModel={attrModel}
          attrModelTypeList={attrModelTypeList}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<AttributeModelFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
      attrModelTypeList={attrModelTypeList}
    />)
  }
  handleUpdate = (values) => {
    const updatedAttrModel = Object.assign({}, this.props.attrModel.content, {
      description: values.description,
    })
    Promise.resolve(this.props.updateModel(this.props.attrModel.content.id, updatedAttrModel))
    .then(() => {
      const url = this.getBackUrl()
      browserHistory.push(url)
    })
  }

  handleCreate = (values) => {
    Promise.resolve(this.props.createModel({
      name: values.name,
      description: values.description,
      type: values.type,
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
  isFetching: AttributeModelSelectors.isFetching(state),
  attrModelTypeList: AttributeModelTypeSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  createAttrModel: values => dispatch(AttributeModelActions.createEntity(values)),
  updateAttrModel: (id, values) => dispatch(AttributeModelActions.updateEntity(id, values)),
  fetchAttrModel: id => dispatch(AttributeModelActions.fetchEntity(id)),
  fetchAttributeModelTypeList: () => dispatch(fetchAttributeModelTypeList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributeModelFormContainer)
